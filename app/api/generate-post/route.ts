import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const client = new OpenAI({
  baseURL: "https://api.studio.nebius.ai/v1/",
  apiKey: process.env.NEBIUS_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { platform, topic, tone, specialInstruction } = await req.json()

    const systemPrompt = `You are an expert social media content creator. Your task is to create compelling content for various social media platforms. Format your response using HTML tags for proper structure (h1, h2, p, ul, li, etc.).`

    const userPrompt = `Create a single social media post for ${platform} about "${topic}" with a ${tone} tone. ${specialInstruction ? `Special instruction: ${specialInstruction}` : ''} Use appropriate HTML tags for formatting, including headings, paragraphs, and lists.`

    const completion = await client.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct-fast",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.6,
      max_tokens: 512,
      top_p: 0.9
    })

    const generatedContent = completion.choices[0].message.content
    const post = generatedContent?.trim() || ''

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Error generating post:', error)
    return NextResponse.json({ error: 'Failed to generate post' }, { status: 500 })
  }
}