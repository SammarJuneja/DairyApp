import Post from "$lib/database/modals/post.js"
import User from "$lib/database/modals/user.js";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async({ request }) =>  {
    try {
        const { body, title, user } = await request.json();

        if (!body || !title) {
            return json({ message: "Title or description was empty" }, { status: 400 });
        }

        const newPost = new Post({
            title: title,
            body: body,
            createdAt: Date.now(),
            user: user
        });

        newPost.save();

        await User.updateOne({
            _id: user._id
        }, {
            $push: {
                post: newPost
            }
        });

        return json({
            message: "You successfully wrote a post"
        }, { status: 200 });
        
    } catch (error) {
        console.log(error);
        return json({ message: "Internal server error" }, { status: 500 });
    }
}
