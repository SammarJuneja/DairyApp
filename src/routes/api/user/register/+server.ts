import User from "$lib/database/modals/user.js";
import { json, type RequestHandler } from "@sveltejs/kit";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Config } from "../../../../../config.js";

export const POST: RequestHandler =  async({ request }) => {
    try {
        const { username, email, password } = await request.json();
  
        if (!username || !email || !password) {
            return json({
                message: "Please fill all the details"
            }, { status: 400 });
        }
  
        const user = await User.findOne({
            email: email
        });
  
        if (user) {
            return json({
                message: "User with provided email already exists"
            }, { status: 403 });
        }
      
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
  
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        });
  
        await newUser.save();
  
        const token = jwt.sign(newUser._id, Config.JWT_SECRET);
  
        return json({
            message: "Your account was created successfully",
            token: token
        }, { status: 200 });
    } catch (error) {
        console.log(error);
            return json({
            message: "Internal server error"
        }, { status: 200 });
    }
}
  