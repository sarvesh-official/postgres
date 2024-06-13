"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgresql://kingjai156:amABlXbI7hw6@ep-billowing-wind-a53wrbl6.us-east-2.aws.neon.tech/test?sslmode=require",
});
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const result = yield client.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )`);
        console.log(result);
    });
}
// POST
function insertDataIntoUser() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const values = ["nivaash", "nivaash@gmail.com", "test@123"];
        const query = "INSERT INTO users (username,email,password) VALUES ($1,$2,$3);";
        const result = yield client.query(query, values);
        console.log(result);
    });
}
// createUsersTable();
insertDataIntoUser();
// GET
function getDetailsByEmail() {
    return __awaiter(this, void 0, void 0, function* () {
        const value = ["kingjai156@gmail.com"];
        const query = `SELECT * FROM users WHERE email = $1;`;
        const result = yield client.query(query, value);
        try {
            if (result.rows.length > 0) {
                console.log(result.rows[0].username);
                return result.rows[0].username;
            }
            else {
                console.log("No user found with the given email");
                return null;
            }
        }
        catch (err) {
            console.log(err);
        }
        //   finally {
        //     await client.end();
        //   }
    });
}
getDetailsByEmail();
