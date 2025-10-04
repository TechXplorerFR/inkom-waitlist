import { Client, auth } from "cassandra-driver";
import dotenv from "dotenv";

dotenv.config();

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private client: Client;
  private keyspaceName: string;

  private constructor() {
    this.keyspaceName = process.env.CASSANDRA_KEYSPACE || "inkom_waitlist";

    this.client = new Client({
      contactPoints: [process.env.CASSANDRA_HOST || "127.0.0.1"],
      localDataCenter: "datacenter1",
      authProvider: process.env.CASSANDRA_USERNAME
        ? new auth.PlainTextAuthProvider(
            process.env.CASSANDRA_USERNAME,
            process.env.CASSANDRA_PASSWORD || ""
          )
        : undefined,
    });
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async connect(): Promise<void> {
    try {
      // First connect without keyspace
      await this.client.connect();
      console.log("Connected to Cassandra successfully");

      // Create keyspace and tables
      await this.createKeyspaceAndTables();

      // Shutdown the initial client and reconnect with keyspace
      await this.client.shutdown();

      // Reconnect with keyspace
      this.client = new Client({
        contactPoints: [process.env.CASSANDRA_HOST || "127.0.0.1"],
        localDataCenter: "datacenter1",
        keyspace: this.keyspaceName,
        authProvider: process.env.CASSANDRA_USERNAME
          ? new auth.PlainTextAuthProvider(
              process.env.CASSANDRA_USERNAME,
              process.env.CASSANDRA_PASSWORD || ""
            )
          : undefined,
      });

      await this.client.connect();
      console.log(`Connected to Cassandra with keyspace: ${this.keyspaceName}`);
    } catch (error) {
      console.error("Error connecting to Cassandra:", error);
      throw error;
    }
  }

  private async createKeyspaceAndTables(): Promise<void> {
    // Create keyspace if it doesn't exist
    const createKeyspaceQuery = `
      CREATE KEYSPACE IF NOT EXISTS ${this.keyspaceName}
      WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}
    `;

    try {
      await this.client.execute(createKeyspaceQuery);
      console.log(`Keyspace ${this.keyspaceName} created or already exists`);

      // Use the keyspace for subsequent operations
      await this.client.execute(`USE ${this.keyspaceName}`);

      // Create waitlist table
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS waitlist_emails (
          id UUID PRIMARY KEY,
          email TEXT,
          language TEXT,
          created_at TIMESTAMP,
          ip_address TEXT,
          user_agent TEXT,
          confirmed BOOLEAN,
          confirmation_token TEXT
        )
      `;

      await this.client.execute(createTableQuery);
      console.log("Waitlist table created or already exists");

      // Create index on email for uniqueness checking
      const createIndexQuery = `
        CREATE INDEX IF NOT EXISTS ON waitlist_emails (email)
      `;

      await this.client.execute(createIndexQuery);
      console.log("Email index created or already exists");
    } catch (error) {
      console.error("Error creating keyspace and tables:", error);
      throw error;
    }
  }

  public getClient(): Client {
    return this.client;
  }

  public async disconnect(): Promise<void> {
    await this.client.shutdown();
    console.log("Disconnected from Cassandra");
  }
}

export const db = DatabaseConnection.getInstance();
