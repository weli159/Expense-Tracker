import mongoose from "mongoose";

export const connectToDb = async () => {
    try {
        mongoose.set('strictQuery', false);
        const db = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB: ${db.connection.name}`);
    } catch (error) {
        console.log(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
}