# Bro&Bot

Chatbot conversacional con IA embebido y configurable. Tres personalidades distintas, cada una definida desde un archivo `.env` sin tocar código.

## Caracteristicas

- **3 personalidades** — Colega (informal), Experto (técnico), Creativo (ideas)
- **Configurable sin código** — carácter, tono, tema, profundidad, humor, contexto y límites se definen en `.env`
- **Historial persistente** — los mensajes se guardan en `localStorage` del navegador
- **Streaming en tiempo real** — respuestas progresivas mientras la IA genera texto
- **Enter para enviar** — Shift+Enter para salto de línea
- **Auto-scroll** — el chat hace scroll suave al último mensaje
- **Docker ready** — un solo comando para desplegar en cualquier máquina
- **Multi-provider** — OpenAI, Google Gemini, Groq, Anthropic y cualquier compatible

## Requisitos

- [Node.js](https://nodejs.org) 18+ (recomendado: 24 LTS)
- npm 9+
- Una API key de AI (ver [Proveedores](#proveedores))

## Instalación rápida

```bash
git clone https://github.com/rootbertooth/Bro-Bot.git
cd Bro-Bot
cp .env.example .env
npm install
```

Edita `.env` con tu API key (ver [Proveedores](#proveedores)), luego:

```bash
npm run dev
```

Abre http://localhost:3000

## Proveedores

### OpenAI

1. Ve a [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Genera una API key
3. En `.env`:

```
OPENAI_API_KEY=sk-...
VITE_BOT_MODEL=gpt-4o
```

### Google Gemini (gratis)

1. Ve a [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Genera una API key
3. En `.env`:

```
BROBOT_API_KEY=tu-key
BROBOT_API_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai
```

### Groq (gratis, rápido)

1. Ve a [console.groq.com/keys](https://console.groq.com/keys)
2. Genera una API key
3. En `.env`:

```
BROBOT_API_KEY=gsk_...
BROBOT_API_BASE_URL=https://api.groq.com/openai/v1
VITE_BOT_MODEL=llama-3.3-70b-versatile
```

### Anthropic (Claude)

1. Ve a [console.anthropic.com](https://console.anthropic.com)
2. Genera una API key
3. En `.env`:

```
BROBOT_API_KEY=sk-ant-...
BROBOT_API_BASE_URL=https://api.anthropic.com/v1
VITE_BOT_MODEL=claude-sonnet-4-20250514
```

## Variables de entorno

| Variable | Descripción | Default |
|---|---|---|
| `BROBOT_API_KEY` | API key del proveedor | — |
| `OPENAI_API_KEY` | Alternativa para OpenAI | — |
| `BROBOT_API_BASE_URL` | URL del endpoint compatible | `https://api.openai.com/v1` |
| `VITE_BOT_MODEL` | ID del modelo | `google/gemini-3.7-flash` |
| `VITE_BOT_NAME` | Nombre del bot | `Bro&Bot` |
| `VITE_BOT_TAGLINE` | Lema del bot | `Tu colega con IA` |
| `VITE_BOT_LANGUAGE` | Idioma de respuesta | `es` |

### Configuración de personalidades

Cada pestaña (tab1, tab2, tab3) se configura con:

```
VITE_BOT_TAB1_LABEL=Colega
VITE_BOT_TAB1_CHARACTER=Amigo cercano y directo
VITE_BOT_TAB1_TONE=informal, cálido
VITE_BOT_TAB1_TOPIC=vida diaria, decisiones
VITE_BOT_TAB1_DEPTH=media
VITE_BOT_TAB1_HUMOR=alto
VITE_BOT_TAB1_CONTEXT=El usuario busca conversación relajada
VITE_BOT_TAB1_LIMITS=No dar diagnósticos médicos
VITE_BOT_TAB1_GREETING=¡Ey! Cuéntame qué se te pasa por la cabeza
```

## Comandos

```bash
npm run dev      # Desarrollo con hot-reload
npm run build    # Build de producción
npm start        # Servidor en producción
```

## Docker

### Con Docker Compose (recomendado)

```bash
set BROBOT_API_KEY=tu-key
docker compose up --build
```

### Con Docker manualmente

```bash
docker build -t botbro .
docker run -p 3000:3000 -e BROBOT_API_KEY=tu-key botbro
```

## Despliegue

### GitHub Codespaces

1. Abre el repo en GitHub
2. Click en **Code > Codespaces > Create codespace**
3. En la terminal:
   ```bash
   cp .env.example .env
   npm install
   npm run dev
   ```
4. Codespaces redirige el puerto automáticamente

### Cualquier servidor (VPS, droplet, etc.)

```bash
git clone https://github.com/rootbertooth/Bro-Bot.git
cd Bro-Bot
cp .env.example .env
# Editar .env con tu API key
npm install
npm run build
npm start
```

El servidor escucha en el puerto 3000 por defecto. Cambia con `PORT=8080 npm start`.

## Stack

- React 19 + TypeScript 7
- Vite 8 + Tailwind CSS 4
- Express 4 + Vercel AI SDK
- OpenAI SDK (compatible con Gemini, Groq, Anthropic)
- Lucide React
