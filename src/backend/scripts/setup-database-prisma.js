#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import dotenv from 'dotenv';

dotenv.config();

const execPromise = promisify(exec);

async function setupDatabase() {
  console.log('🚀 Setting up PostgreSQL database with Prisma...');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is not set!');
    console.log('📝 Please set DATABASE_URL in your .env file');
    console.log('   Example: DATABASE_URL="postgresql://user:password@localhost:5432/inkom_waitlist"');
    process.exit(1);
  }

  console.log('📝 Database URL configured');

  try {
    // Generate Prisma Client
    console.log('🔧 Generating Prisma Client...');
    await execPromise('npx prisma generate');
    console.log('✅ Prisma Client generated successfully');

    // Push schema to database (creates tables without migrations)
    console.log('🔧 Pushing schema to database...');
    await execPromise('npx prisma db push');
    console.log('✅ Database schema synchronized');

    console.log('\n✅ Database setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('   - Run "npm run dev" to start the development server');
    console.log('   - Run "npx prisma studio" to open Prisma Studio (database GUI)');
    console.log('   - Run "npx prisma migrate dev" to create a migration (for production)');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    console.log('\n💡 Troubleshooting:');
    console.log('   - Make sure PostgreSQL is running');
    console.log('   - Verify your DATABASE_URL is correct');
    console.log('   - Check that the database exists or the user has permission to create it');
    process.exit(1);
  }
}

// Run setup if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupDatabase().catch(console.error);
}

export { setupDatabase };
