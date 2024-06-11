import { config } from 'dotenv';
import sql from 'mssql';

config();

const dbUser = process.env.DB_USER || '';
const dbPassword = process.env.DB_PASSWORD || '';
const dbServer = process.env.DB_SERVER || '';
const dbName = process.env.DB_NAME || '';

console.log('Database Configuration:', { dbUser, dbServer, dbName });

if (!dbUser || !dbPassword || !dbServer || !dbName) {
  throw new Error('Database configuration is missing. Please set DB_USER, DB_PASSWORD, DB_SERVER, and DB_NAME in your environment variables.');
}

const pool = new sql.ConnectionPool({
  user: dbUser,
  password: dbPassword,
  server: dbServer,
  database: dbName,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
});

pool.on('error', err => {
  console.error('SQL Pool Error:', err);
});

const connectPool = async () => {
  try {
    if (!pool.connected) {
      await pool.connect();
      console.log('Connected to MSSQL');
    }
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
};

export { pool, connectPool };