import sql from '../config/postgres.js';

// Function to create users table if it doesn't exist
const createUserTable = async () => {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                verify_otp TEXT DEFAULT '',
                verify_otp_expire_at BIGINT DEFAULT 0,
                is_account_verified BOOLEAN DEFAULT FALSE,
                reset_otp TEXT DEFAULT '',
                reset_otp_expire_at BIGINT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        console.log("Users table is ready.");
    } catch (error) {
        console.error("Error creating users table:", error.message);
    }
};

// Initialize the table
await createUserTable();

// Model helper functions (Optional but useful)
const User = {
    create: async ({ name, email, password }) => {
        return await sql`
            INSERT INTO users (name, email, password)
            VALUES (${name}, ${email}, ${password})
            RETURNING *
        `;
    },
    findByEmail: async (email) => {
        const users = await sql`
            SELECT * FROM users WHERE email = ${email}
        `;
        return users[0];
    },
    findById: async (id) => {
        const users = await sql`
            SELECT * FROM users WHERE id = ${id}
        `;
        return users[0];
    },

    updateById: async (id, data) => {
        return await sql`
            UPDATE users SET ${sql(data)} WHERE id = ${id}
            RETURNING *
        `;
    }
};

export default User;