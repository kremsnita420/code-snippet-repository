import CodeSnippet from "@models/code-snippet";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, snippet, tag, title, description } = await request.json();

    try {
        await connectToDB();
        const newCodeSnippet = new CodeSnippet({ title, description, creator: userId, snippet, tag });

        await newCodeSnippet.save();
        return new Response(JSON.stringify(newCodeSnippet), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new code snippet", { status: 500 });
    }
}
