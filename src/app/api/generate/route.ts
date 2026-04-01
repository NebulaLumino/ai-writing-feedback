import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: "https://api.deepseek.com/v1" });

export async function POST(req: NextRequest) {
  try {
    const { writingType, sampleText, focusAreas } = await req.json();
    const prompt = `Provide detailed writing feedback:\nWriting Type: ${writingType || "Essay/Article"}\nSample Text: ${sampleText || "The text to be reviewed"}\nFeedback Focus: ${focusAreas || "Clarity, engagement, structure, grammar"}\n\nProvide: Overall assessment score (1-10) across dimensions, specific strengths, actionable improvement suggestions with examples, and a revised opening paragraph.`;
    const completion = await client.chat.completions.create({ model: "deepseek-chat", messages: [{ role: "user", content: prompt }], max_tokens: 2000, temperature: 0.5 });
    return NextResponse.json({ result: completion.choices[0]?.message?.content || "No output." });
  } catch (e) { return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
