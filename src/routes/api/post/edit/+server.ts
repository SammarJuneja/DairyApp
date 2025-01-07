import Post from "$lib/database/modals/post.js";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async({ request }) => {
    try {
        const { body, title, postId } = await request.json();

        if (!body || !title) {
            return json({
                message: "Title or description was empty"
            }, { status: 400 });
        }

        if (!postId) {
            return json({
                message: "Please provide the postId"
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

        let TITLE = title || post.title;
        let BODY = body || post.body;

        await Post.updateOne({
            _id: postId
        }, {
            $set: {
                title: TITLE,
                body: BODY
            }
        });

        return json({
            message: "You successfully edited a post"
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return json({
            message: "Internal server error"
        }, { status: 500 });
    }
}
