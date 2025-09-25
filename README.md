# Inkom Waitlist

A complete waitlist registration system with email integration and Cassandra database storage.

## Features

- ✅ **Email Registration**: Users can register their email to join the waitlist
- ✅ **Cassandra Database**: Reliable storage with automatic duplicate prevention
- ✅ **Email Service**: Automated welcome emails with customizable templates
- ✅ **Frontend Integration**: React component with loading states and error handling
- ✅ **API Endpoints**: RESTful API with proper validation and error responses
- ✅ **CORS Support**: Cross-origin resource sharing for frontend-backend communication
- ✅ **Health Checks**: Monitor database and email service status

## Quick Start

### Prerequisites

1. **Node.js** (v18 or later)
2. **Cassandra Database** (see setup instructions below)
3. **SMTP Email Service** (Gmail, SendGrid, etc.)

### 1. Setup Cassandra Database

**Option A: Using Docker (Recommended)**
```bash
docker run --name cassandra -p 9042:9042 -d cassandra:latest
```

**Option B: Local Installation**
- Download from [Apache Cassandra](https://cassandra.apache.org/)
- Start the service on port 9042

### 2. Backend Setup

```bash
cd src/backend

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Edit .env with your settings (see configuration section)
# nano .env  # or use your preferred editor

# Start the backend server
npm run dev
```

### 3. Frontend Setup

```bash
cd src/frontend

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Start the development server
npm run dev
```

### 4. Test the Application

1. Open your browser to `http://localhost:5173`
2. Scroll to the waitlist section
3. Enter an email address and submit
4. Check your email for the welcome message

## Configuration

### Backend Configuration (.env)

```env
# Cassandra Database
CASSANDRA_HOST=127.0.0.1
CASSANDRA_PORT=9042
CASSANDRA_KEYSPACE=inkom_waitlist

# Email Service - Mailgun API
MAILGUN_API_KEY=key-your-mailgun-api-key
MAILGUN_DOMAIN=mg.yourdomain.com
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=Inkom Team

# Application
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### Frontend Configuration (.env)

```env
VITE_API_URL=http://localhost:3000
```

## API Documentation

### POST /api/register
Register an email to the waitlist.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Successfully added to waitlist! Check your email for a welcome message."
}
```

**Error Response (400):**
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

## Email Setup Guide

### Mailgun Setup (Recommended)
Mailgun provides reliable email delivery with good free tier (5,000 emails/month).

1. **Sign up for Mailgun**: Go to [mailgun.com](https://www.mailgun.com/)
2. **Get API credentials**: 
   - Navigate to Sending → Overview
   - Copy your API Key (starts with `key-...`)
   - Copy your Domain (sandbox domain for testing)
3. **Update `.env`**:
   ```env
   MAILGUN_API_KEY=key-your-api-key-here
   MAILGUN_DOMAIN=sandboxXXXXX.mailgun.org
   FROM_EMAIL=excited@sandboxXXXXX.mailgun.org
   FROM_NAME=Inkom Team
   ```

For detailed setup instructions, see [MAILGUN-SETUP.md](MAILGUN-SETUP.md)

### Alternative Email Services
- **Custom Domain**: Set up your own domain with Mailgun for production
- **Self-hosted**: Use Postfix on Debian server (see [DEBIAN-EMAIL-SETUP.md](DEBIAN-EMAIL-SETUP.md))

## Database Schema

The application automatically creates:

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

## Project Structure

```
├── src/
│   ├── backend/           # Node.js API server
│   │   ├── src/
│   │   │   ├── index.ts           # Main server file
│   │   │   ├── database.ts        # Cassandra connection
│   │   │   ├── emailService.ts    # Email handling
│   │   │   └── waitlistService.ts # Business logic
│   │   ├── scripts/
│   │   │   └── startup-check.js   # Environment validation
│   │   ├── .env.example           # Environment template
│   │   └── package.json
│   └── frontend/          # React application
│       ├── src/
│       │   ├── components/
│       │   │   └── CTA.tsx        # Waitlist registration form
│       │   └── ...
│       ├── .env.example           # Environment template
│       └── package.json
└── README.md
```

## Customization

### Email Template
Edit `src/backend/src/emailService.ts` to customize:
- Welcome message content
- HTML design and styling
- Plain text version
- Email subject line

### Frontend Form
Edit `src/frontend/src/components/CTA.tsx` to customize:
- Form design and layout
- Success/error messages
- Loading states
- Validation logic

### Database Schema
Modify `src/backend/src/database.ts` to:
- Add new fields to the table
- Change keyspace settings
- Add additional tables

## Troubleshooting

### Cassandra Issues
```bash
# Check if Cassandra is running
docker ps

# View Cassandra logs
docker logs cassandra

# Connect to Cassandra CLI
docker exec -it cassandra cqlsh
```

### Email Issues
```bash
# Test email service health
curl http://localhost:3000/api/health/email

# Check backend logs for email errors
npm run dev  # in backend directory
```

### CORS Issues
- Verify `FRONTEND_URL` in backend `.env`
- Check `VITE_API_URL` in frontend `.env`
- Ensure both servers are running on correct ports

## Production Deployment

### Database
- Use managed Cassandra (AWS Keyspaces, Azure Cosmos DB, etc.)
- Set up proper replication and backups
- Configure authentication and SSL

### Email Service
- Use professional email service (SendGrid, AWS SES, etc.)
- Set up proper DNS records (SPF, DKIM, DMARC)
- Monitor delivery rates and bounce handling

### Security
- Enable HTTPS for all endpoints
- Set up rate limiting for registration endpoint
- Use environment-specific configurations
- Enable Cassandra authentication

### Monitoring
- Add logging for all operations
- Monitor email delivery success rates
- Set up alerts for database connectivity
- Track waitlist growth metrics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
