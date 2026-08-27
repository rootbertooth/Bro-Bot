/**
 * Configuración de Bro&Bot leída desde el archivo .env
 * (todas las variables VITE_* son públicas y editables sin tocar el código).
 */

export type BotPersona = {
  id: string;
  label: string;
  character: string;
  tone: string;
  topic: string;
  depth: string;
  humor: string;
  context: string;
  limits: string;
  greeting: string;
};

const env = import.meta.env;

const pick = (value: unknown, fallback: string) =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;

export const botIdentity = {
  name: pick(env["VITE_BOT_NAME"], "Bro&Bot"),
  tagline: pick(env["VITE_BOT_TAGLINE"], "Tu colega con IA"),
  model: pick(env["VITE_BOT_MODEL"], "google/gemini-3.7-flash"),
  language: pick(env["VITE_BOT_LANGUAGE"], "es"),
};

export const personas: BotPersona[] = [
  {
    id: "tab1",
    label: pick(env["VITE_BOT_TAB1_LABEL"], "Colega"),
    character: pick(env["VITE_BOT_TAB1_CHARACTER"], "Amigo cercano y directo"),
    tone: pick(env["VITE_BOT_TAB1_TONE"], "informal y cálido"),
    topic: pick(env["VITE_BOT_TAB1_TOPIC"], "conversación general"),
    depth: pick(env["VITE_BOT_TAB1_DEPTH"], "media"),
    humor: pick(env["VITE_BOT_TAB1_HUMOR"], "medio"),
    context: pick(env["VITE_BOT_TAB1_CONTEXT"], ""),
    limits: pick(env["VITE_BOT_TAB1_LIMITS"], ""),
    greeting: pick(env["VITE_BOT_TAB1_GREETING"], "¡Ey! ¿De qué hablamos?"),
  },
  {
    id: "tab2",
    label: pick(env["VITE_BOT_TAB2_LABEL"], "Experto"),
    character: pick(env["VITE_BOT_TAB2_CHARACTER"], "Consultor técnico riguroso"),
    tone: pick(env["VITE_BOT_TAB2_TONE"], "profesional y claro"),
    topic: pick(env["VITE_BOT_TAB2_TOPIC"], "temas técnicos"),
    depth: pick(env["VITE_BOT_TAB2_DEPTH"], "alta"),
    humor: pick(env["VITE_BOT_TAB2_HUMOR"], "bajo"),
    context: pick(env["VITE_BOT_TAB2_CONTEXT"], ""),
    limits: pick(env["VITE_BOT_TAB2_LIMITS"], ""),
    greeting: pick(env["VITE_BOT_TAB2_GREETING"], "Hola, ¿cuál es el problema?"),
  },
  {
    id: "tab3",
    label: pick(env["VITE_BOT_TAB3_LABEL"], "Creativo"),
    character: pick(env["VITE_BOT_TAB3_CHARACTER"], "Compañero creativo"),
    tone: pick(env["VITE_BOT_TAB3_TONE"], "juguetón e inspirador"),
    topic: pick(env["VITE_BOT_TAB3_TOPIC"], "ideas y creatividad"),
    depth: pick(env["VITE_BOT_TAB3_DEPTH"], "media"),
    humor: pick(env["VITE_BOT_TAB3_HUMOR"], "medio"),
    context: pick(env["VITE_BOT_TAB3_CONTEXT"], ""),
    limits: pick(env["VITE_BOT_TAB3_LIMITS"], ""),
    greeting: pick(env["VITE_BOT_TAB3_GREETING"], "¿Sobre qué creamos hoy?"),
  },
];
