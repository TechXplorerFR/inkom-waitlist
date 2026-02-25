import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import dotenv from 'dotenv';
import { db } from './database.js';
import { emailService } from './emailService.js';
import { waitlistService } from './waitlistService.js';

dotenv.config();

const app = new Hono();

// CORS middleware
app.use('/*', cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:4173', // Vite preview mode
    'http://localhost:3000', // Development
    'http://127.0.0.1:5173',
    'http://127.0.0.1:4173',
    'http://127.0.0.1:3000',
    'https://inkom.ai', // Production
    'https://www.inkom.ai' // Production www
  ],
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Health check endpoint
app.get("/", (c) => {
  return c.json({ 
    status: "ok", 
    message: "Inkom Waitlist API",
    timestamp: new Date().toISOString()
  });
});

// Waitlist registration endpoint
app.post("/api/register", async (c) => {
  try {
    const body = await c.req.json();
    const { email, language } = body;

    if (!email) {
      return c.json({ 
        success: false, 
        message: "Email is required" 
      }, 400);
    }

    // Get client info
    const ipAddress = c.req.header('x-forwarded-for') || 
                      c.req.header('x-real-ip') || 
                      'unknown';
    const userAgent = c.req.header('user-agent') || 'unknown';

    const result = await waitlistService.addEmailToWaitlist(
      email.trim().toLowerCase(), 
      language || 'en',
      ipAddress, 
      userAgent
    );

    const statusCode = result.success ? 200 : 400;
    return c.json(result, statusCode);

  } catch (error) {
    console.error('Registration endpoint error:', error);
    return c.json({ 
      success: false, 
      message: "Internal server error. Please try again later." 
    }, 500);
  }
});

// Get waitlist statistics (optional admin endpoint)
app.get("/api/stats", async (c) => {
  try {
    const stats = await waitlistService.getWaitlistStats();
    return c.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Stats endpoint error:', error);
    return c.json({ 
      success: false, 
      message: "Failed to get statistics" 
    }, 500);
  }
});

// Email service health check
app.get("/api/health/email", async (c) => {
  try {
    const isHealthy = await emailService.verifyConnection();
    return c.json({
      success: isHealthy,
      service: 'email',
      status: isHealthy ? 'healthy' : 'unhealthy'
    });
  } catch (error) {
    return c.json({
      success: false,
      service: 'email',
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Unsubscribe endpoint
app.get("/unsubscribe", async (c) => {
  const email = c.req.query("email");
  if (!email) {
    return c.html(`<html><body><h2>Erreur</h2><p>Aucune adresse e-mail fournie.</p></body></html>`, 400);
  }
  const result = await waitlistService.unsubscribeEmail(email.trim().toLowerCase());
  if (result.success) {
    return c.html(`<html><body style='font-family:Segoe UI,Arial,sans-serif;background:#f8f9ff;color:#333;'><div style='max-width:600px;margin:40px auto;background:#fff;padding:32px;border-radius:16px;box-shadow:0 4px 24px rgba(67,97,238,0.08);'><h2>Désinscription réussie</h2><p>Votre adresse <b>${email}</b> a bien été désinscrite de la liste d'attente Inkom.</p><p>Vous ne recevrez plus d'emails concernant le produit.</p></div></body></html>`);
  } else {
    return c.html(`<html><body><h2>Erreur</h2><p>${result.message}</p></body></html>`, 400);
  }
});

// Initialize database connection
async function initializeApp() {
  try {
    console.log('Initializing database connection...');
    await db.connect();
    
    console.log('Verifying email service...');
    await emailService.verifyConnection();
    
    console.log('Application initialized successfully');
  } catch (error) {
    console.error('Failed to initialize application:', error);
    console.log('The app will continue running, but some features may not work properly.');
  }
}

const port = parseInt(process.env.PORT || '3000');

serve(
  {
    fetch: app.fetch,
    port: port,
  },
  async (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
    await initializeApp();
  }
);
