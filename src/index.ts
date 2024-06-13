import { Client } from "pg";

const client = new Client({
  connectionString:
    "postgresql://kingjai156:amABlXbI7hw6@ep-billowing-wind-a53wrbl6.us-east-2.aws.neon.tech/test?sslmode=require",
});

async function createUsersTable() {
  await client.connect();
  const result = await client.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )`);

  console.log(result);
}

// POST
async function insertDataIntoUser() {
  await client.connect();

  const values = ["nivaash", "nivaash@gmail.com", "test@123"];
  const query =
    "INSERT INTO users (username,email,password) VALUES ($1,$2,$3);";
  const result = await client.query(query, values);

  console.log(result);
}
// createUsersTable();

insertDataIntoUser();

// GET
async function getDetailsByEmail() {
  const value = ["kingjai156@gmail.com"];
  const query = `SELECT * FROM users WHERE email = $1;`;

  const result = await client.query(query, value);

  try {
    if (result.rows.length > 0) {
      console.log(result.rows[0].username);
      return result.rows[0].username;
    } else {
      console.log("No user found with the given email");
      return null;
    }
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
}
getDetailsByEmail();
