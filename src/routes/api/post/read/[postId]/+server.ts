import Post from "$lib/database/modals/post.js"
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async({ params }) => {
    try {
        const { postId } = params;

        if (!postId) {
            return json({
                message: "Post id was not provided"
            }, { status: 400 });
        }

        const post = await Post.findOne({
            _id: postId
        });

        if (!post) {
            return json({
                message: "Post was not found"
            }, { status: 404 });
        }

        return json({ post }, { status: 200 });
    } catch (error) {
        console.log(error);
        return json({
            message: "Internal server error"
        }, { status: 500 });
    }
}
