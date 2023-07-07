import CodeSnippet from "@models/code-snippet";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const codeSnippets = await CodeSnippet.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(codeSnippets), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch code snippets created by user", { status: 500 })
    }
} 