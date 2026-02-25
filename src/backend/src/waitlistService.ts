import { db } from "./database.js";
import { emailService } from "./emailService.js";
import { z } from "zod";

export interface WaitlistEntry {
  id: string;
  language: string;
  email: string;
  created_at: Date;
  ip_address?: string;
  user_agent?: string;
  confirmed: boolean;
  confirmation_token?: string;
}

export const EmailSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

export class WaitlistService {
  private static instance: WaitlistService;

  public static getInstance(): WaitlistService {
    if (!WaitlistService.instance) {
      WaitlistService.instance = new WaitlistService();
    }
    return WaitlistService.instance;
  }

  public async addEmailToWaitlist(
    email: string,
    language: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<{ success: boolean; message: string; data?: WaitlistEntry }> {
    try {
      // Validate email
      const validation = EmailSchema.safeParse({ email });
      if (!validation.success) {
        return {
          success: false,
          message: validation.error.issues[0].message,
        };
      }

      // Check if email already exists
      const existingEntry = await this.checkEmailExists(email);
      if (existingEntry) {
        return {
          success: false,
          message: "This email is already registered in our waitlist.",
        };
      }

      // Create new entry with Prisma
      const confirmationToken = this.generateConfirmationToken();
      
      const createdEntry = await db.getClient().waitlistEmail.create({
        data: {
          email,
          language: language || "en",
          ipAddress,
          userAgent,
          confirmed: false,
          confirmationToken,
        },
      });

      const entry: WaitlistEntry = {
        id: createdEntry.id,
        email: createdEntry.email,
        language: createdEntry.language,
        created_at: createdEntry.createdAt,
        ip_address: createdEntry.ipAddress ?? undefined,
        user_agent: createdEntry.userAgent ?? undefined,
        confirmed: createdEntry.confirmed,
        confirmation_token: createdEntry.confirmationToken ?? undefined,
      };

      // Send welcome email
      try {
        await emailService.sendWelcomeEmail(
          email,
          confirmationToken,
          language || "en"
        );
        console.log(
          `Welcome email sent to ${email} in language: ${language || "en"}`
        );
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
        // Don't fail the registration if email fails
      }

      return {
        success: true,
        message:
          "Successfully added to waitlist! Check your email for a welcome message.",
        data: entry,
      };
    } catch (error) {
      console.error("Error adding email to waitlist:", error);
      return {
        success: false,
        message:
          "An error occurred while adding your email to the waitlist. Please try again.",
      };
    }
  }

  private async checkEmailExists(email: string): Promise<boolean> {
    try {
      const entry = await db.getClient().waitlistEmail.findUnique({
        where: { email },
      });
      return entry !== null;
    } catch (error) {
      console.error("Error checking email existence:", error);
      throw error;
    }
  }

  private generateConfirmationToken(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  public async getWaitlistStats(): Promise<{
    total: number;
    confirmed: number;
  }> {
    try {
      const [total, confirmed] = await Promise.all([
        db.getClient().waitlistEmail.count(),
        db.getClient().waitlistEmail.count({
          where: { confirmed: true },
        }),
      ]);

      return { total, confirmed };
    } catch (error) {
      console.error("Error getting waitlist stats:", error);
      return { total: 0, confirmed: 0 };
    }
  }

  public async getAllEmails(limit: number = 100): Promise<WaitlistEntry[]> {
    try {
      const entries = await db.getClient().waitlistEmail.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
      });

      return entries.map((entry): WaitlistEntry => ({
        id: entry.id,
        email: entry.email,
        created_at: entry.createdAt,
        ip_address: entry.ipAddress ?? undefined,
        user_agent: entry.userAgent ?? undefined,
        confirmed: entry.confirmed,
        confirmation_token: entry.confirmationToken ?? undefined,
        language: entry.language,
      }));
    } catch (error) {
      console.error("Error getting all emails:", error);
      throw error;
    }
  }

  /**
   * Unsubscribe an email from the waitlist (sets confirmed=false and unsubscribed=true)
   */
  public async unsubscribeEmail(
    email: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Check if email exists
      const entry = await db.getClient().waitlistEmail.findUnique({
        where: { email },
      });
      
      if (!entry) {
        return { success: false, message: "Email not found in waitlist." };
      }

      // Update entry to unsubscribe
      await db.getClient().waitlistEmail.update({
        where: { email },
        data: {
          unsubscribed: true,
          confirmed: false,
        },
      });

      return {
        success: true,
        message: "You have been unsubscribed from the waitlist.",
      };
    } catch (error) {
      console.error("Error unsubscribing email:", error);
      return {
        success: false,
        message: "An error occurred while unsubscribing. Please try again.",
      };
    }
  }
}

export const waitlistService = WaitlistService.getInstance();
