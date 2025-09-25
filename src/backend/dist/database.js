import { Client, auth } from 'cassandra-driver';
import dotenv from 'dotenv';
dotenv.config();
export class DatabaseConnection {
    static instance;
    client;
    constructor() {
        this.client = new Client({
            contactPoints: [process.env.CASSANDRA_HOST || '127.0.0.1'],
            localDataCenter: 'datacenter1',
            keyspace: process.env.CASSANDRA_KEYSPACE || 'inkom_waitlist',
            authProvider: process.env.CASSANDRA_USERNAME ?
                new auth.PlainTextAuthProvider(process.env.CASSANDRA_USERNAME, process.env.CASSANDRA_PASSWORD || '') : undefined
        });
    }
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
    async connect() {
        try {
            await this.client.connect();
            console.log('Connected to Cassandra successfully');
            await this.createKeyspaceAndTables();
        }
        catch (error) {
            console.error('Error connecting to Cassandra:', error);
            throw error;
        }
    }
    async createKeyspaceAndTables() {
        const keyspaceName = process.env.CASSANDRA_KEYSPACE || 'inkom_waitlist';
        // Create keyspace if it doesn't exist
        const createKeyspaceQuery = `
      CREATE KEYSPACE IF NOT EXISTS ${keyspaceName}
      WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}
    `;
        try {
            await this.client.execute(createKeyspaceQuery);
            console.log(`Keyspace ${keyspaceName} created or already exists`);
            // Use the keyspace
            await this.client.execute(`USE ${keyspaceName}`);
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
            await this.client.execute(createTableQuery);
            console.log('Waitlist table created or already exists');
            // Create index on email for uniqueness checking
            const createIndexQuery = `
        CREATE INDEX IF NOT EXISTS ON waitlist_emails (email)
      `;
            await this.client.execute(createIndexQuery);
            console.log('Email index created or already exists');
        }
        catch (error) {
            console.error('Error creating keyspace and tables:', error);
            throw error;
        }
    }
    getClient() {
        return this.client;
    }
    async disconnect() {
        await this.client.shutdown();
        console.log('Disconnected from Cassandra');
    }
}
export const db = DatabaseConnection.getInstance();
