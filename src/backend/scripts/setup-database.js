#!/usr/bin/env node

import { Client, auth } from 'cassandra-driver';
import dotenv from 'dotenv';

dotenv.config();

async function setupDatabase() {
  const keyspaceName = process.env.CASSANDRA_KEYSPACE || 'inkom_waitlist';
  
  console.log('🚀 Setting up Cassandra database...');
  console.log(`📝 Keyspace: ${keyspaceName}`);
  console.log(`🌐 Host: ${process.env.CASSANDRA_HOST || '127.0.0.1'}`);
  
  // Connect without keyspace first
  const client = new Client({
    contactPoints: [process.env.CASSANDRA_HOST || '127.0.0.1'],
    localDataCenter: 'datacenter1',
    authProvider: process.env.CASSANDRA_USERNAME ? 
      new auth.PlainTextAuthProvider(
        process.env.CASSANDRA_USERNAME, 
        process.env.CASSANDRA_PASSWORD || ''
      ) : undefined
  });

  try {
    // Connect to Cassandra
    await client.connect();
    console.log('✅ Connected to Cassandra');

    // Create keyspace
    const createKeyspaceQuery = `
      CREATE KEYSPACE IF NOT EXISTS ${keyspaceName}
      WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}
    `;
    
    await client.execute(createKeyspaceQuery);
    console.log(`✅ Keyspace '${keyspaceName}' created or already exists`);

    // Use the keyspace
    await client.execute(`USE ${keyspaceName}`);
    console.log(`✅ Using keyspace '${keyspaceName}'`);

    // Create waitlist table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS waitlist_emails (
        id UUID PRIMARY KEY,
        email TEXT,
        created_at TIMESTAMP,
        ip_address TEXT,
        user_agent TEXT,
        confirmed BOOLEAN DEFAULT false,
        confirmation_token TEXT
      )
    `;

    await client.execute(createTableQuery);
    console.log('✅ Table "waitlist_emails" created or already exists');

    // Create index on email
    const createIndexQuery = `
      CREATE INDEX IF NOT EXISTS waitlist_emails_email_idx ON waitlist_emails (email)
    `;

    await client.execute(createIndexQuery);
    console.log('✅ Index on email column created or already exists');

    // Verify table structure
    const describeQuery = `DESCRIBE TABLE waitlist_emails`;
    const result = await client.execute(describeQuery);
    console.log('✅ Database setup completed successfully!');
    console.log('\n📋 Table structure:');
    console.log(result.rows[0].create_statement);

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  } finally {
    await client.shutdown();
    console.log('✅ Database connection closed');
  }
}

// Run setup if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupDatabase().catch(console.error);
}

export { setupDatabase };