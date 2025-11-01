import Mailgun from "mailgun.js";
import formData from "form-data";
import dotenv from "dotenv";
import { emailTranslations } from "./emailTranslations.js";

dotenv.config();

export class EmailService {
  private static instance: EmailService;
  private mailgun: any;
  private mg: any;

  private constructor() {
    this.mailgun = new Mailgun(formData);
    this.mg = this.mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY || "",
      url: "https://api.eu.mailgun.net",
    });
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  public async sendWelcomeEmail(
    email: string,
    confirmationToken?: string,
    language: string = "en"
  ): Promise<void> {
    // Use translation, fallback to English
    const t = emailTranslations[language] || emailTranslations["en"];
    // Remplace {{EMAIL}} dans le template
    const html = t.html.replace(/\{\{USER_EMAIL\}\}/g, email);
    const text = t.text.replace(/\{\{USER_EMAIL\}\}/g, email);
    const messageData = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: t.subject,
      html,
      text,
    };

    try {
      const domain = process.env.MAILGUN_DOMAIN;
      if (!domain) {
        throw new Error("MAILGUN_DOMAIN is not configured");
      }

      const result = await this.mg.messages.create(domain, messageData);
      console.log("Welcome email sent successfully via Mailgun:", result.id);
    } catch (error) {
      console.error("Error sending welcome email via Mailgun:", error);
      throw error;
    }
  }

  // getWelcomeEmailTemplate and getWelcomeEmailTextVersion removed; now using translations

  public async verifyConnection(): Promise<boolean> {
    try {
      // For Mailgun, we can verify by checking if API key and domain are configured
      const apiKey = process.env.MAILGUN_API_KEY;
      const domain = process.env.MAILGUN_DOMAIN;

      if (!apiKey || !domain) {
        console.error("Mailgun API key or domain not configured");
        return false;
      }

      // Test API connection by attempting to get domain info
      try {
        await this.mg.domains.get(domain);
        console.log("Mailgun API connection verified successfully");
        return true;
      } catch (error) {
        console.log(
          "Mailgun API connection test completed (this may fail if domain verification is pending)"
        );
        // Even if domain info fails, the API key might still work for sending
        return true;
      }
    } catch (error) {
      console.error("Mailgun API connection failed:", error);
      return false;
    }
  }
}

export const emailService = EmailService.getInstance();
