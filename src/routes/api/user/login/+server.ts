import App from "$lib/database/modals/app.js";
import User from "$lib/database/modals/user.js";
import { json, type RequestHandler } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Config } from "../../../../../config.js";

export const POST: RequestHandler = async({ request }) => {
    try {
        const { username, password } = await request.json();
  
        if (!username || !password) {
            return json({
                message: "Please fill all the details"
            }, { status: 400 });
        }

        if (password.length < 8) {
            return json({
                message: "Password should contain 8 letters"
            }, { status: 400 });
        }
  
        const user = await User.findOne({
            username: username
        });
  
        if (!user) {
            return json({
                message: "Account does not exist"
            }, { status: 404 });
        }
  
        const decodedPassword = await bcrypt.compare(password, user.password);
  
        if (!decodedPassword) {
            return json({
                message: "Provided password was wrong"
            }, { status: 401 });
        }
  
        const token = jwt.sign(user, Config.JWT_SECRET);
  
        return json({
            message: "You logged in successfully",
            token: token
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return json({
            message: "Internal server error"
        }, { status: 500 });
    }
}
