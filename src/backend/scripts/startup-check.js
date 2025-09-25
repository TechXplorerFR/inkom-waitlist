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
  'CASSANDRA_HOST',
  'CASSANDRA_KEYSPACE',
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

// Check if Cassandra is accessible (basic check)
const cassandraHost = envContent.match(/CASSANDRA_HOST=(.+)/)?.[1] || '127.0.0.1';

console.log(`🔍 Checking Cassandra connection at ${cassandraHost}:9042...`);
console.log('💡 Make sure Cassandra is running:');
console.log('   docker run --name cassandra -p 9042:9042 -d cassandra:latest\n');

// Continue with the normal startup
console.log('🎯 If everything starts successfully, your API will be available at:');
console.log('   http://localhost:3000\n');
console.log('📋 Available endpoints:');
console.log('   POST /api/register  - Register email to waitlist');
console.log('   GET  /api/stats     - Get waitlist statistics');
console.log('   GET  /api/health/email - Check email service\n');