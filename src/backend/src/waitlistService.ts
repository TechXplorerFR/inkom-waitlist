import { types } from 'cassandra-driver';
import { db } from './database.js';
import { emailService } from './emailService.js';
import { z } from 'zod';

export interface WaitlistEntry {
  id: string;
  email: string;
  created_at: Date;
  ip_address?: string;
  user_agent?: string;
  confirmed: boolean;
  confirmation_token?: string;
}

export const EmailSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required')
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
    ipAddress?: string, 
    userAgent?: string
  ): Promise<{ success: boolean; message: string; data?: WaitlistEntry }> {
    try {
      // Validate email
      const validation = EmailSchema.safeParse({ email });
      if (!validation.success) {
        return {
          success: false,
          message: validation.error.issues[0].message
        };
      }

      // Check if email already exists
      const existingEntry = await this.checkEmailExists(email);
      if (existingEntry) {
        return {
          success: false,
          message: 'This email is already registered in our waitlist.'
        };
      }

      // Create new entry
      const id = types.Uuid.random();
      const confirmationToken = this.generateConfirmationToken();
      const entry: WaitlistEntry = {
        id: id.toString(),
        email,
        created_at: new Date(),
        ip_address: ipAddress,
        user_agent: userAgent,
        confirmed: false,
        confirmation_token: confirmationToken
      };

      // Insert into database
      const insertQuery = `
        INSERT INTO waitlist_emails (
          id, email, created_at, ip_address, user_agent, confirmed, confirmation_token
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      await db.getClient().execute(insertQuery, [
        id,
        entry.email,
        entry.created_at,
        entry.ip_address,
        entry.user_agent,
        entry.confirmed,
        entry.confirmation_token
      ]);

      // Send welcome email
      try {
        await emailService.sendWelcomeEmail(email, confirmationToken);
        console.log(`Welcome email sent to ${email}`);
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Don't fail the registration if email fails
      }

      return {
        success: true,
        message: 'Successfully added to waitlist! Check your email for a welcome message.',
        data: entry
      };

    } catch (error) {
      console.error('Error adding email to waitlist:', error);
      return {
        success: false,
        message: 'An error occurred while adding your email to the waitlist. Please try again.'
      };
    }
  }

  private async checkEmailExists(email: string): Promise<boolean> {
    try {
      const query = 'SELECT email FROM waitlist_emails WHERE email = ? LIMIT 1';
      const result = await db.getClient().execute(query, [email]);
      return result.rows.length > 0;
    } catch (error) {
      console.error('Error checking email existence:', error);
      throw error;
    }
  }

  private generateConfirmationToken(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  public async getWaitlistStats(): Promise<{ total: number; confirmed: number }> {
    try {
      const totalQuery = 'SELECT COUNT(*) as total FROM waitlist_emails';
      const confirmedQuery = 'SELECT COUNT(*) as confirmed FROM waitlist_emails WHERE confirmed = true ALLOW FILTERING';
      
      const [totalResult, confirmedResult] = await Promise.all([
        db.getClient().execute(totalQuery),
        db.getClient().execute(confirmedQuery)
      ]);

      return {
        total: totalResult.rows[0].total.toNumber(),
        confirmed: confirmedResult.rows[0].confirmed.toNumber()
      };
    } catch (error) {
      console.error('Error getting waitlist stats:', error);
      return { total: 0, confirmed: 0 };
    }
  }

  public async getAllEmails(limit: number = 100): Promise<WaitlistEntry[]> {
    try {
      const query = 'SELECT * FROM waitlist_emails LIMIT ?';
      const result = await db.getClient().execute(query, [limit]);
      
      return result.rows.map(row => ({
        id: row.id.toString(),
        email: row.email,
        created_at: row.created_at,
        ip_address: row.ip_address,
        user_agent: row.user_agent,
        confirmed: row.confirmed,
        confirmation_token: row.confirmation_token
      }));
    } catch (error) {
      console.error('Error getting all emails:', error);
      throw error;
    }
  }
}

export const waitlistService = WaitlistService.getInstance();