import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { RotateCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import logo from "@/assets/brobot-logo.png";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import { botIdentity, personas, type BotPersona } from "@/lib/bot-config";

const storageKey = (id: string) => `brobot:messages:${id}`;

function loadMessages(id: string): UIMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storageKey(id));
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? (parsed as UIMessage[]) : [];
  } catch {
    return [];
  }
}

function ChatPanel({ persona }: { persona: BotPersona }) {
  const [initialMessages] = useState<UIMessage[]>(() => loadMessages(persona.id));
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: {
          persona: {
            label: persona.label,
            character: persona.character,
            tone: persona.tone,
            topic: persona.topic,
            depth: persona.depth,
            humor: persona.humor,
            context: persona.context,
            limits: persona.limits,
          },
          botName: botIdentity.name,
          language: botIdentity.language,
          model: botIdentity.model,
        },
      }),
    [persona],
  );

  const { messages, sendMessage, status, setMessages, error } = useChat({
    id: persona.id,
    messages: initialMessages,
    transport,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(storageKey(persona.id), JSON.stringify(messages));
  }, [messages, persona.id]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const focusInput = useCallback(() => textareaRef.current?.focus(), []);

  useEffect(() => {
    focusInput();
  }, [focusInput, persona.id, status]);

  const busy = status === "submitted" || status === "streaming";

  return (
    <div className="flex h-[clamp(28rem,68vh,40rem)] flex-col">
      <div className="flex items-center justify-between border-b border-border/60 px-5 py-3">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Modo {persona.label} · profundidad {persona.depth} · humor {persona.humor}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setMessages([]);
            window.localStorage.removeItem(storageKey(persona.id));
            focusInput();
          }}
        >
          <RotateCcw className="mr-1.5 size-3.5" />
          Reiniciar
        </Button>
      </div>

      <Conversation className="flex-1">
        <ConversationContent ref={scrollRef} className="gap-5 px-5 py-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <img
                src={logo}
                alt={`Avatar de ${botIdentity.name}`}
                width={72}
                height={72}
                loading="lazy"
                className="size-16 drop-shadow-[0_0_28px_var(--brand-glow)]"
              />
              <p className="max-w-sm text-sm text-muted-foreground">{persona.greeting}</p>
            </div>
          )}

          {messages.map((message) => {
            const text = message.parts
              .map((part) => (part.type === "text" ? part.text : ""))
              .join("");
            return (
              <Message key={message.id} from={message.role}>
                <MessageContent
                  className={
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent p-0 text-foreground"
                  }
                >
                  {message.role === "assistant" ? (
                    <MessageResponse>{text}</MessageResponse>
                  ) : (
                    text
                  )}
                </MessageContent>
              </Message>
            );
          })}

          {status === "submitted" && (
            <Shimmer className="text-sm">Bro&Bot está pensando...</Shimmer>
          )}

          {error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              No se pudo completar la respuesta. Inténtalo de nuevo.
            </p>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-border/60 p-4">
        <PromptInput
          onSubmit={(message) => {
            const text = message.text?.trim();
            if (!text || busy) return;
            void sendMessage({ text });
            focusInput();
          }}
        >
          <PromptInputTextarea
            ref={textareaRef}
            autoFocus
            placeholder="Escribe tu mensaje..."
          />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} disabled={busy} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}

export function BroBotChat() {
  const [activeId, setActiveId] = useState(personas[0]!.id);
  const active = personas.find((p) => p.id === activeId) ?? personas[0]!;

  return (
    <section className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[var(--shadow-panel)] backdrop-blur">
      <header className="flex flex-wrap items-center gap-4 border-b border-border/60 bg-[var(--gradient-brand)] px-5 py-4">
        <img
          src={logo}
          alt={`Logo de ${botIdentity.name}`}
          width={44}
          height={44}
          className="size-11 rounded-xl"
        />
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold leading-tight">{botIdentity.name}</h2>
          <p className="truncate text-xs text-muted-foreground">{botIdentity.tagline}</p>
        </div>
        <span className="rounded-full border border-border/70 px-3 py-1 text-[11px] text-muted-foreground">
          {botIdentity.model}
        </span>
      </header>

      <nav className="flex gap-1 border-b border-border/60 px-3 pt-3">
        {personas.map((persona) => {
          const isActive = persona.id === active.id;
          return (
            <button
              key={persona.id}
              type="button"
              onClick={() => setActiveId(persona.id)}
              className={`rounded-t-xl px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-card text-foreground shadow-[inset_0_-2px_0_0_var(--brand)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {persona.label}
            </button>
          );
        })}
      </nav>

      <ChatPanel key={active.id} persona={active} />
    </section>
  );
}
