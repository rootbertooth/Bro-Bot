import express from "express";
import { createServer as createViteServer } from "vite";
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { readFileSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === "production";

function loadEnvFile() {
  try {
    const raw = readFileSync(resolve(ROOT, ".env"), "utf-8");
    const map: Record<string, string> = {};
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim();
      map[key] = val;
    }
    return map;
  } catch {
    return {};
  }
}

const envFile = loadEnvFile();

function env(key: string, fallback = ""): string {
  return process.env[key] || envFile[key] || fallback;
}

const app = express();
app.use(express.json({ limit: "1mb" }));

app.post("/api/chat", async (req, res) => {
  try {
    const { messages, body } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "No messages provided" });
      return;
    }

    const persona = body?.persona ?? {};
    const botName = body?.botName ?? "Bro&Bot";
    const language = body?.language ?? "es";
    const modelId = body?.model ?? env("VITE_BOT_MODEL", "google/gemini-3.7-flash");

    const apiKey = env("BROBOT_API_KEY") || env("OPENAI_API_KEY");
    const baseURL = env("BROBOT_API_BASE_URL", "https://api.openai.com/v1");

    if (!apiKey) {
      res.status(500).json({
        error: "API key not configured. Set BROBOT_API_KEY or OPENAI_API_KEY in .env",
      });
      return;
    }

    const isAnthropic = baseURL.includes("anthropic");
    const provider = isAnthropic
      ? createAnthropic({ apiKey, baseURL })
      : createOpenAI({ apiKey, baseURL });

    const systemPrompt = [
      `Eres ${botName}. Habla en ${language}.`,
      persona.character ? `Carácter: ${persona.character}.` : "",
      persona.tone ? `Tono: ${persona.tone}.` : "",
      persona.topic ? `Tema principal: ${persona.topic}.` : "",
      persona.depth ? `Profundidad: ${persona.depth}.` : "",
      persona.humor ? `Nivel de humor: ${persona.humor}.` : "",
      persona.context ? `Contexto: ${persona.context}.` : "",
      persona.limits ? `Límites: ${persona.limits}.` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const result = streamText({
      model: provider(modelId),
      system: systemPrompt,
      messages: messages.map((m: any) => {
        let content = m.content;
        if (!content && Array.isArray(m.parts)) {
          content = m.parts
            .filter((p: any) => p.type === "text")
            .map((p: any) => p.text)
            .join("");
        }
        return {
          role: m.role as "user" | "assistant" | "system",
          content: content ?? "",
        };
      }),
    });

    result.pipeUIMessageStreamToResponse(res);
  } catch (err: any) {
    console.error("[/api/chat] Error:", err?.message ?? err);
    if (!res.headersSent) {
      res.status(500).json({ error: err?.message ?? "Internal server error" });
    } else {
      res.end();
    }
  }
});

async function start() {
  if (isProd) {
    app.use(express.static(resolve(ROOT, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(resolve(ROOT, "dist", "index.html"));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`\n  Bro&Bot server running at http://localhost:${PORT}\n`);
  });
}

start();
