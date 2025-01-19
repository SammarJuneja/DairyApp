import mongoose from "mongoose";
import { Config } from "../../../config.js";

export async function connectDB() {
    try {
        await mongoose.connect(Config.MONGO_URI);
        console.log("Connected to Database successfully");
    } catch (error) {
        console.error(`Error while connecting to Database ${error}`)
    }
}
