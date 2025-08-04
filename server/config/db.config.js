import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const DB_URI = process.env.MONGODB_URI 
// || "mongodb://127.0.0.1:27017/interface-monitoring-dashboard";

const dbConfig = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Database connection successful");
    } catch (error) {
        console.log("Database connection failed:", error.message);
        process.exit(1);
    }
}

export default dbConfig;
