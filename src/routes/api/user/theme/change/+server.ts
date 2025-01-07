import User from "$lib/database/modals/user.js"
import App from "$lib/database/modals/app.js";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async({ request }) => {
    try {
        const userId = " req.user._id";
        const { theme } = await request.json();
  
        const user = await User.findOne({
            _id: userId
        });
  
        if (theme.trim() !== "Dark".toLowerCase() || theme.trim() !== "White".toLowerCase()) {
            return json({
                message: "Please select Dark or White theme"
            }, { status: 400 });
        }
  
        if (!user) {
            return json({
                message: "Account does not exist"
            }, { status: 404 });
        }
  
        await App.updateOne({
            user: user._id
        }, {
            $set: {
                theme: theme
            }
        });
  
        return json({
            message: `Your app theme was changed to ${theme}`
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return json({
            message: "Internal server error"
        }, { status: 500 });
    }
}
  