import CodeSnippet from '@models/code-snippet';
import { connectToDB } from "@utils/database";

export const PATCH = async (request, { params }) => {
    const { likes, whoLiked } = await request.json();

    try {
        await connectToDB();

        // Find the existing code snippet by ID
        const existingCodeSnippet = await CodeSnippet.findByIdAndUpdate(params.id);

        if (!existingCodeSnippet) {
            return new Response("Code snippet not found", { status: 404 });
        }

        // Update the code snippet with new data
        existingCodeSnippet.likes = likes;
        existingCodeSnippet.whoLiked = whoLiked;

        await existingCodeSnippet.save();

        return new Response("Successfully updated the code snippet", { status: 200 });
    } catch (error) {
        return new Response("Error Updating code snippet", { status: 500 });
    }
};