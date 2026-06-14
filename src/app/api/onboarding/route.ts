import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are Xeno, the friendly onboarding guide for X-Hunt — a platform where people complete real-world missions, build their reputation, and earn rewards for genuine impact.

Your job is to have a short, warm conversation to understand what the user wants to do and help them get started. You should:

1. Learn what they want to accomplish (personal missions, run a programme for an org, or build with the API)
2. Understand their background and interests (skills, domains they care about: sustainability, health, community, learning, etc.)
3. Suggest the right path: consumer app (/home) for personal participation, workspace (/workspace) for organisations, or developer docs (/developers) for builders

Keep responses SHORT (2-4 sentences). Be warm and human, not corporate. Use plain language — no jargon.

After you've collected enough to route them (typically 2-3 exchanges), include a special JSON block at the END of your response, after your message text, in this exact format:
<ROUTING>
{"route": "/home" | "/workspace" | "/developers" | null, "profile": {"goal": "...", "interests": ["..."], "surface": "consumer" | "workspace" | "developer"}, "ready": true | false}
</ROUTING>

Only include the ROUTING block when you're confident about where to send them. Set ready: false until you have enough info. Set ready: true and include a route when you're ready to send them somewhere.

Examples of good responses:
- "Welcome! Are you here to join missions yourself, or are you setting up a programme for your team or organisation?"
- "Sounds like sustainability and community work are your thing — there are hundreds of missions in those areas waiting for you. What's your background — are you more hands-on or do you prefer research and reporting?"
- "Perfect. I'll get you set up as a participant. You'll be able to find and join missions, track your progress, and build your reputation. Let's go!"`;

export interface OnboardingMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 503 });
  }

  const client = new Anthropic();

  let body: { messages: OnboardingMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { messages } = body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'messages array required' }, { status: 400 });
  }

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const fullText = (response.content[0] as { type: string; text: string }).text;

    // Extract routing JSON if present
    const routingMatch = fullText.match(/<ROUTING>([\s\S]*?)<\/ROUTING>/);
    let routing: { route: string | null; profile: object; ready: boolean } | null = null;
    let messageText = fullText;

    if (routingMatch) {
      try {
        routing = JSON.parse(routingMatch[1].trim());
        messageText = fullText.replace(/<ROUTING>[\s\S]*?<\/ROUTING>/, '').trim();
      } catch {
        // Ignore parse errors — surface full text
      }
    }

    return NextResponse.json({ message: messageText, routing });
  } catch (err) {
    console.error('[onboarding]', err);
    return NextResponse.json({ error: 'Onboarding agent failed' }, { status: 500 });
  }
}
