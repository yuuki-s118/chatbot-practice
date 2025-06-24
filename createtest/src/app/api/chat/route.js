// src/app/api/chat/route.js
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o", // 必要に応じて "gpt-3.5-turbo" などに変更
      messages: [{ role: "user", content: message }],
    });

    const reply = chatResponse.choices[0]?.message?.content || "返答がありません。";
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("OpenAIエラー:", error);
    return new Response(JSON.stringify({ reply: "サーバーエラーが発生しました。" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}