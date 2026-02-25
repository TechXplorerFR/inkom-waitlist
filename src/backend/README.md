# Inkom Waitlist - Backend Setup

## Prerequisites

### 1. PostgreSQL Database Setup

**Option A: Using Docker (Recommended for Development)**
```bash
# Pull and run PostgreSQL in Docker
docker run --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=inkom_waitlist -p 5432:5432 -d postgres:latest

# Check if PostgreSQL is running
docker logs postgres

# Optional: Connect to PostgreSQL CLI
docker exec -it postgres psql -U postgres -d inkom_waitlist
```

**Option B: Local Installation**
- Download and install PostgreSQL from https://www.postgresql.org/
- Create a database: `CREATE DATABASE inkom_waitlist;`
- Default connection: localhost:5432

### 2. Email Service Setup

You'll need an SMTP service for sending emails. Here are some options:

**Option A: Gmail (Free for testing)**
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: Google Account → Security → App passwords
3. Use your Gmail address and app password in the `.env` file

**Option B: Other providers**
- SendGrid, Mailgun, AWS SES, etc.
- Update SMTP settings in `.env` accordingly

## Configuration

1. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your settings:
   ```env
   # PostgreSQL Configuration
   DATABASE_URL=postgresql://postgres:password@localhost:5432/inkom_waitlist
   
   # Email Configuration (Mailgun)
   MAILGUN_API_KEY=your-mailgun-api-key
   MAILGUN_DOMAIN=mg.yourdomain.com
   FROM_EMAIL=noreply@inkom.ai
   FROM_NAME=Inkom Team
   
   # Application Configuration
   PORT=3000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

## Installation & Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up the database:
   ```bash
   npm run db:setup
   # Or manually:
   npx prisma generate
   npx prisma db push
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The server will be available at `http://localhost:3000`

## API Endpoints

### POST /api/register
Register an email to the waitlist.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Successfully added to waitlist! Check your email for a welcome message.",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "created_at": "2023-01-01T00:00:00.000Z",
    "confirmed": false
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "This email is already registered in our waitlist."
}
```

### GET /api/stats
Get waitlist statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 150,
    "confirmed": 120
  }
}
```

### GET /api/health/email
Check email service health.

**Response:**
```json
{
  "success": true,
  "service": "email",
  "status": "healthy"
}
```

## Database Schema

The application uses Prisma ORM with PostgreSQL. The schema is defined in `prisma/schema.prisma`:

```prisma
model WaitlistEmail {
  id                 String   @id @default(uuid())
  email              String   @unique
  language           String   @default("en")
  createdAt          DateTime @default(now()) @map("created_at")
  ipAddress          String?  @map("ip_address")
  userAgent          String?  @map("user_agent")
  confirmed          Boolean  @default(false)
  confirmationToken  String?  @map("confirmation_token")
  unsubscribed       Boolean  @default(false)

  @@index([email])
  @@map("waitlist_emails")
}
```

### Database Commands

```bash
# Generate Prisma Client (after schema changes)
npm run prisma:generate

# Push schema changes to database (development)
npm run db:push

# Create a migration (production)
npm run prisma:migrate

# Open Prisma Studio (database GUI)
npm run prisma:studio
```

## Email Template

The welcome email template is fully customizable in `src/emailService.ts`. The template includes:
- Welcome message
- Waitlist benefits
- Responsive HTML design
- Plain text fallback

## Troubleshooting

### PostgreSQL Connection Issues
- Ensure PostgreSQL is running: `docker ps` (if using Docker)
- Check logs: `docker logs postgres`
- Verify port 5432 is accessible
- Verify DATABASE_URL format is correct

### Email Service Issues
- Test email configuration: `GET /api/health/email`
- Check SMTP credentials and settings
- Verify Gmail app password if using Gmail

### CORS Issues
- Ensure frontend URL is correct in `FRONTEND_URL` environment variable
- Default is `http://localhost:5173` for Vite development server

## Production Considerations

1. **Database**: Use a managed PostgreSQL service (AWS RDS, Heroku Postgres, Supabase, etc.)
2. **Email**: Use a professional email service (Mailgun, SendGrid, AWS SES, etc.)
3. **Environment**: Set `NODE_ENV=production`
4. **Security**: Use strong passwords and SSL connections for PostgreSQL
5. **Migrations**: Use `npx prisma migrate deploy` for production deployments
6. **Monitoring**: Add logging and monitoring for email delivery
7. **Rate Limiting**: Consider adding rate limiting for registration endpoint
