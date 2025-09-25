# Inkom Waitlist - Backend Setup

## Prerequisites

### 1. Cassandra Database Setup

**Option A: Using Docker (Recommended for Development)**
```bash
# Pull and run Cassandra in Docker
docker run --name cassandra -p 9042:9042 -d cassandra:latest

# Wait for Cassandra to start (this may take a few minutes)
docker logs cassandra

# Optional: Connect to Cassandra CLI
docker exec -it cassandra cqlsh
```

**Option B: Local Installation**
- Download and install Apache Cassandra from https://cassandra.apache.org/
- Start Cassandra service
- Default connection: localhost:9042

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
   # Cassandra Configuration
   CASSANDRA_HOST=127.0.0.1
   CASSANDRA_PORT=9042
   CASSANDRA_KEYSPACE=inkom_waitlist
   
   # Email Configuration (Example with Gmail)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   FROM_EMAIL=noreply@inkom.ai
   FROM_NAME=Inkom Team
   ```

## Installation & Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. The server will be available at `http://localhost:3000`

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

The application automatically creates the following Cassandra keyspace and table:

```cql
CREATE KEYSPACE inkom_waitlist 
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

CREATE TABLE waitlist_emails (
  id UUID PRIMARY KEY,
  email TEXT,
  created_at TIMESTAMP,
  ip_address TEXT,
  user_agent TEXT,
  confirmed BOOLEAN DEFAULT false,
  confirmation_token TEXT
);

CREATE INDEX ON waitlist_emails (email);
```

## Email Template

The welcome email template is fully customizable in `src/emailService.ts`. The template includes:
- Welcome message
- Waitlist benefits
- Responsive HTML design
- Plain text fallback

## Troubleshooting

### Cassandra Connection Issues
- Ensure Cassandra is running: `docker ps` (if using Docker)
- Check logs: `docker logs cassandra`
- Verify port 9042 is accessible

### Email Service Issues
- Test email configuration: `GET /api/health/email`
- Check SMTP credentials and settings
- Verify Gmail app password if using Gmail

### CORS Issues
- Ensure frontend URL is correct in `FRONTEND_URL` environment variable
- Default is `http://localhost:5173` for Vite development server

## Production Considerations

1. **Database**: Use a managed Cassandra service or cluster setup
2. **Email**: Use a professional email service (SendGrid, AWS SES, etc.)
3. **Environment**: Set `NODE_ENV=production`
4. **Security**: Use strong authentication for Cassandra
5. **Monitoring**: Add logging and monitoring for email delivery
6. **Rate Limiting**: Consider adding rate limiting for registration endpoint
