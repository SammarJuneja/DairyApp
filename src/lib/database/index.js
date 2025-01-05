import mongoose from "mongoose";
import { Config } from "../../../config.js";

export function connectDB() {
    mongoose.connect(Config.MONGO_URI);
}
