import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Inkom Waitlist Backend Startup Check\n');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found!');
  console.log('📝 Please copy .env.example to .env and configure your settings:');
  console.log('   cp .env.example .env\n');
  process.exit(1);
}

// Read .env file and check for required variables
const envContent = fs.readFileSync(envPath, 'utf8');
const requiredVars = [
  'DATABASE_URL',
  'MAILGUN_API_KEY',
  'MAILGUN_DOMAIN',
  'FROM_EMAIL'
];

const missingVars = [];
requiredVars.forEach(varName => {
  if (!envContent.includes(`${varName}=`) || envContent.includes(`${varName}=your-`)) {
    missingVars.push(varName);
  }
});

if (missingVars.length > 0) {
  console.log('❌ Missing or incomplete environment variables:');
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\n📝 Please update your .env file with the correct values.');
  console.log('📖 See README.md for setup instructions.\n');
  process.exit(1);
}

console.log('✅ Environment configuration looks good!');
console.log('📊 Starting server...\n');

// Check if PostgreSQL connection string is configured
const dbUrl = envContent.match(/DATABASE_URL=(.+)/)?.[1];
if (dbUrl && dbUrl.includes('postgresql://')) {
  console.log(`🔍 PostgreSQL connection configured`);
  console.log('💡 Make sure PostgreSQL is running:');
  console.log('   docker run --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=inkom_waitlist -p 5432:5432 -d postgres:latest');
  console.log('   OR ensure your local PostgreSQL service is running\n');
}

// Continue with the normal startup
console.log('🎯 If everything starts successfully, your API will be available at:');
console.log('   http://localhost:3000\n');
console.log('📋 Available endpoints:');
console.log('   POST /api/register  - Register email to waitlist');
console.log('   GET  /api/stats     - Get waitlist statistics');
console.log('   GET  /api/health/email - Check email service\n');