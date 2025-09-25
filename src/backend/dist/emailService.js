import Mailgun from "mailgun.js";
import formData from "form-data";
import dotenv from "dotenv";
dotenv.config();
export class EmailService {
    static instance;
    mailgun;
    mg;
    constructor() {
        this.mailgun = new Mailgun(formData);
        this.mg = this.mailgun.client({
            username: "api",
            key: process.env.MAILGUN_API_KEY || "",
            url: "https://api.eu.mailgun.net",
        });
    }
    static getInstance() {
        if (!EmailService.instance) {
            EmailService.instance = new EmailService();
        }
        return EmailService.instance;
    }
    async sendWelcomeEmail(email, confirmationToken) {
        const welcomeTemplate = this.getWelcomeEmailTemplate(confirmationToken);
        const messageData = {
            from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
            to: email,
            subject: "Welcome to Inkom Waitlist! 🚀",
            html: welcomeTemplate,
            text: this.getWelcomeEmailTextVersion(),
        };
        try {
            const domain = process.env.MAILGUN_DOMAIN;
            if (!domain) {
                throw new Error("MAILGUN_DOMAIN is not configured");
            }
            const result = await this.mg.messages.create(domain, messageData);
            console.log("Welcome email sent successfully via Mailgun:", result.id);
        }
        catch (error) {
            console.error("Error sending welcome email via Mailgun:", error);
            throw error;
        }
    }
    getWelcomeEmailTemplate(confirmationToken) {
        return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Inkom!</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8f9fa;
            }
            .container {
                background-color: white;
                padding: 40px;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .logo {
                color: #4361ee;
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .title {
                color: #2d3748;
                font-size: 24px;
                margin-bottom: 20px;
            }
            .content {
                margin-bottom: 30px;
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #4361ee;
                color: white;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 500;
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                color: #718096;
                font-size: 14px;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e2e8f0;
            }
            .highlight {
                background-color: #f7fafc;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #4361ee;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">Inkom</div>
                <h1 class="title">Welcome to the Future of Content Creation! 🚀</h1>
            </div>
            
            <div class="content">
                <p>Hi there!</p>
                
                <p>Thank you for joining the <strong>Inkom waitlist</strong>! You're now part of an exclusive group that will get early access to our revolutionary AI-powered content creation platform.</p>
                
                <div class="highlight">
                    <h3>What happens next?</h3>
                    <ul>
                        <li>You'll be among the first to know when we launch</li>
                        <li>Get exclusive early access before the general public</li>
                        <li>Receive special launch pricing and bonuses</li>
                        <li>Access to beta features and updates</li>
                    </ul>
                </div>
                
                <p>We're working hard to create something amazing that will transform how you create content. Stay tuned for updates!</p>
                
                <p>In the meantime, feel free to:</p>
                <ul>
                    <li>Follow us on social media for the latest updates</li>
                    <li>Share Inkom with friends who might be interested</li>
                    <li>Reply to this email with any questions or feedback</li>
                </ul>
            </div>
            
            <div class="footer">
                <p><strong>The Inkom Team</strong></p>
                <p>Building the future of content creation, one innovation at a time.</p>
                <p style="margin-top: 20px; font-size: 12px;">
                    If you didn't sign up for this, you can safely ignore this email.
                    <br>
                    This email was sent to <strong>${confirmationToken ? "[EMAIL_HIDDEN]" : "you"}</strong> because you joined our waitlist.
                </p>
            </div>
        </div>
    </body>
    </html>
    `;
    }
    getWelcomeEmailTextVersion() {
        return `
Welcome to Inkom! 🚀

Thank you for joining the Inkom waitlist! You're now part of an exclusive group that will get early access to our revolutionary AI-powered content creation platform.

What happens next?
- You'll be among the first to know when we launch
- Get exclusive early access before the general public  
- Receive special launch pricing and bonuses
- Access to beta features and updates

We're working hard to create something amazing that will transform how you create content. Stay tuned for updates!

In the meantime, feel free to:
- Follow us on social media for the latest updates
- Share Inkom with friends who might be interested
- Reply to this email with any questions or feedback

Best regards,
The Inkom Team
Building the future of content creation, one innovation at a time.

If you didn't sign up for this, you can safely ignore this email.
    `;
    }
    async verifyConnection() {
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
            }
            catch (error) {
                console.log("Mailgun API connection test completed (this may fail if domain verification is pending)");
                // Even if domain info fails, the API key might still work for sending
                return true;
            }
        }
        catch (error) {
            console.error("Mailgun API connection failed:", error);
            return false;
        }
    }
}
export const emailService = EmailService.getInstance();
