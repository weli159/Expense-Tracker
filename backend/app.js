import express from "express";
import cors from "cors";
import { connectToDb } from "./db/db.js";
import dotenv from "dotenv";
import transactionRoutes from "./routes/transactions.js"
// Load config
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Placeholder for Routes (Students B & D will uncomment these)
import userRoutes from "./routes/userRoute.js";
// import transactionRoutes from "./routes/transactions.js";
app.use("/api/auth", userRoutes);
app.use("/api/v1", transactionRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message
    });
});

// Start Server
const server = () => {
    connectToDb();
    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });
};

server();

export default app; // Export for testing