import postgres from 'postgres';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not defined in the environment variables');
}

const sql = postgres(connectionString, {
    ssl: 'require',
});

const connectDB = async () => {
    try {
        const result = await sql`SELECT 1`;
        console.log("PostgreSQL Connected...");
    } catch (error) {
        console.error("Database Connection Error:", error.message);
        process.exit(1);
    }
};

export { connectDB };
export default sql;
