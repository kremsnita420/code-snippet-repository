import CodeSnippet from "@models/code-snippet";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const codeSnippets = await CodeSnippet.find({}).populate('creator')

        return new Response(JSON.stringify(codeSnippets), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all code snippets", { status: 500 })
    }
} 