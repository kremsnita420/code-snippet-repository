import CodeSnippet from "@models/code-snippet";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const snippet = await CodeSnippet.findById(params.id).populate("creator")
        if (!snippet) return new Response("Snippet Not Found", { status: 404 });

        return new Response(JSON.stringify(snippet), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { snippet, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing code snippet by ID
        const existingCodeSnippet = await CodeSnippet.findById(params.id);

        if (!existingCodeSnippet) {
            return new Response("Code snippet not found", { status: 404 });
        }

        // Update the code snippet with new data
        existingCodeSnippet.snippet = snippet;
        existingCodeSnippet.tag = tag;
        existingCodeSnippet.title = title;
        existingCodeSnippet.description = description;

        await existingCodeSnippet.save();

        return new Response("Successfully updated the code snippet", { status: 200 });
    } catch (error) {
        return new Response("Error Updating code snippet", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the code snippet by ID and remove it
        await CodeSnippet.findByIdAndRemove(params.id);

        return new Response("Code snippet deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting code snippet", { status: 500 });
    }
};
