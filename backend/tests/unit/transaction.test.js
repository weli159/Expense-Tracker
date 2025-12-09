import request from "supertest";
import app from "../src/app.js"; 
import mongoose from "mongoose";
import { connectToDb } from "../../db/db.js";
import User from "../../models/UserSchema.js";

let userId;
let token;

beforeAll(async () => {
    await connectToDb();
    // 1. Create a dummy user for testing
    const userRes = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: `test${Date.now()}@example.com`,
        password: "password123"
    });
    userId = userRes.body.user._id;
    // If you implemented JWT, you might need to extract the token here
});

afterAll(async () => {
    await User.deleteMany({ email: /@example.com/ }); // Clean up
    await mongoose.connection.close();
});

describe("Transaction API", () => {
    let transactionId;

    // Test 1: Add Transaction
    it("POST /addTransaction - should create a new transaction", async () => {
        const res = await request(app).post("/api/v1/addTransaction").send({
            title: "Test Expense",
            amount: 100,
            category: "Food",
            description: "Lunch",
            date: new Date(),
            transactionType: "expense",
            userId: userId
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    });

    // Test 2: Get Transactions
    it("POST /getTransactions - should retrieve transactions", async () => {
        const res = await request(app).post("/api/v1/getTransactions").send({
            userId: userId,
            frequency: "7", // Default filter
            type: "all"
        });

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.transactions)).toBe(true);
        expect(res.body.transactions.length).toBeGreaterThan(0);
        
        // Save ID for delete test
        transactionId = res.body.transactions[0]._id;
    });

    // Test 3: Delete Transaction
    it("POST /deleteTransaction - should delete the transaction", async () => {
        const res = await request(app).post(`/api/v1/deleteTransaction/${transactionId}`).send({
            userId: userId
        });

        expect(res.statusCode).toEqual(200);
    });
    // Test 4: Filter Logic (Student C's Feature)
    it("should return EMPTY array if date is outside range", async () => {
        // 1. Add an old transaction (30 days ago)
        await request(app).post("/api/v1/addTransaction").send({
            title: "Old Expense",
            amount: 50,
            category: "Food",
            description: "Old",
            date: new Date(new Date().setDate(new Date().getDate() - 30)), // 30 days ago
            transactionType: "expense",
            userId: userId
        });

        // 2. Request only "Last 7 Days"
        const res = await request(app).post("/api/v1/getTransactions").send({
            userId: userId,
            frequency: "7", // Should exclude the 30-day old transaction
            type: "all"
        });

        // 3. Verify the old transaction is NOT in the list
        const oldTransaction = res.body.transactions.find(t => t.title === "Old Expense");
        expect(oldTransaction).toBeUndefined();
    });
});
