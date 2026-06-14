"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Send, Sparkles } from "lucide-react";
import { BrandMark } from "@/components/brand";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface Routing {
  route: string | null;
  profile: { goal?: string; interests?: string[]; surface?: string };
  ready: boolean;
}

const QUICK_PROMPTS = [
  "I want to join missions and build my reputation",
  "I'm setting up a programme for my organisation",
  "I want to build on top of X-Hunt's API",
  "I'm not sure yet — help me figure it out",
];

const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  content: "Hey! I'm Xeno, your X-Hunt guide. Are you here to join missions yourself, run a programme for your team or organisation, or build something with our API?",
};

export default function GetStartedPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [routing, setRouting] = useState<Routing | null>(null);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      const data: { message: string; routing: Routing | null } = await res.json();

      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
      if (data.routing) setRouting(data.routing);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connection failed");
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  function goToRoute() {
    if (routing?.route) router.push(routing.route);
  }

  const showQuickPrompts = messages.length === 1 && !loading;
  const readyToRoute = routing?.ready && routing.route;

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-2xl px-4 py-3 flex items-center justify-between">
          <BrandMark />
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="size-3" style={{ color: "var(--color-ai)" }} />
            Xeno AI onboarding
          </Badge>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-4 py-6 flex flex-col gap-4">

          {/* Intro headline — shown before user types */}
          {messages.length <= 1 && (
            <div className="text-center pt-6 pb-2">
              <h1 className="text-3xl font-semibold tracking-tight">
                Let&apos;s get you started
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Tell Xeno what you want to do — in your own words.
              </p>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {msg.role === "assistant" && (
                <div
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-white text-xs font-bold mt-0.5"
                  style={{ background: "var(--color-ai)" }}
                >
                  X
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-card border rounded-tl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex gap-3">
              <div
                className="flex size-8 shrink-0 items-center justify-center rounded-full text-white text-xs font-bold"
                style={{ background: "var(--color-ai)" }}
              >
                X
              </div>
              <div className="bg-card border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                <Loader2 className="size-4 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Thinking…</span>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center">
              <p className="text-sm text-destructive">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-xs text-muted-foreground underline mt-1"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Quick prompts */}
          {showQuickPrompts && (
            <div className="grid gap-2 sm:grid-cols-2 mt-2">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => send(prompt)}
                  className="text-left rounded-xl border bg-card px-4 py-3 text-sm hover:border-primary/40 hover:bg-card/80 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Routing CTA — shown when Xeno is ready to route */}
          {readyToRoute && !loading && (
            <Card
              className="border-2 mt-2"
              style={{ borderColor: "var(--color-ai)" }}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg text-white"
                    style={{ background: "var(--color-ai)" }}
                  >
                    <Sparkles className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold">Ready to go</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {routing.profile.goal ?? "Xeno has figured out the best place for you."}
                    </p>
                    {routing.profile.interests && routing.profile.interests.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {routing.profile.interests.map((interest) => (
                          <Badge key={interest} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  onClick={goToRoute}
                  className="w-full mt-4 gap-2"
                  style={{ background: "var(--color-ai)" }}
                >
                  Continue <ArrowRight className="size-4" />
                </Button>
              </CardContent>
            </Card>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar */}
      <div className="border-t bg-background/80 backdrop-blur-sm sticky bottom-0">
        <div className="mx-auto max-w-2xl px-4 py-3">
          <div className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tell Xeno what you want to do…"
              rows={1}
              disabled={loading}
              className="flex-1 resize-none rounded-xl border bg-card px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 max-h-32 overflow-y-auto"
              style={{ lineHeight: "1.5" }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
              }}
            />
            <Button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              size="icon"
              className="shrink-0 size-10 rounded-xl"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
            </Button>
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-2">
            Press Enter to send · Shift+Enter for a new line
          </p>
        </div>
      </div>
    </main>
  );
}
