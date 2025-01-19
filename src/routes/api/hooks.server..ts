import jwt from "jsonwebtoken";
import { Config } from "../../../config.js";
import { connectDB } from "$lib/database/index.js";

const secretKey = Config.JWT_SECRET;

export async function handle({ event, resolve}: { event: any; resolve: any }) {
    await connectDB();

    const excludedPaths = ["/api/user/register", "/api/user/login"];

    if (excludedPaths.includes(event.url.pathname)) {
        return resolve(event);
    }

    const authHeader = event.request.headers.get("Authorization");

    if (authHeader) {
        const token = authHeader.split(" ")[0];

        if (token) {
            try {
                const decoded  = jwt.verify(token, secretKey);
                event.locals.userId = decoded;
            } catch (err) {
                return new Response("Invalid token", { status: 403 });
            }
        }
    }
    return resolve(event);
}
