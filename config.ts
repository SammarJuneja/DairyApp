import { config } from "dotenv";
config();

export const Config: any = {
    PORT: process.env.PORT,
    MONGO: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET
};
