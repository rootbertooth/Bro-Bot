/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BOT_NAME?: string;
  readonly VITE_BOT_TAGLINE?: string;
  readonly VITE_BOT_MODEL?: string;
  readonly VITE_BOT_LANGUAGE?: string;
  readonly VITE_BOT_TAB1_LABEL?: string;
  readonly VITE_BOT_TAB1_CHARACTER?: string;
  readonly VITE_BOT_TAB1_TONE?: string;
  readonly VITE_BOT_TAB1_TOPIC?: string;
  readonly VITE_BOT_TAB1_DEPTH?: string;
  readonly VITE_BOT_TAB1_HUMOR?: string;
  readonly VITE_BOT_TAB1_CONTEXT?: string;
  readonly VITE_BOT_TAB1_LIMITS?: string;
  readonly VITE_BOT_TAB1_GREETING?: string;
  readonly VITE_BOT_TAB2_LABEL?: string;
  readonly VITE_BOT_TAB2_CHARACTER?: string;
  readonly VITE_BOT_TAB2_TONE?: string;
  readonly VITE_BOT_TAB2_TOPIC?: string;
  readonly VITE_BOT_TAB2_DEPTH?: string;
  readonly VITE_BOT_TAB2_HUMOR?: string;
  readonly VITE_BOT_TAB2_CONTEXT?: string;
  readonly VITE_BOT_TAB2_LIMITS?: string;
  readonly VITE_BOT_TAB2_GREETING?: string;
  readonly VITE_BOT_TAB3_LABEL?: string;
  readonly VITE_BOT_TAB3_CHARACTER?: string;
  readonly VITE_BOT_TAB3_TONE?: string;
  readonly VITE_BOT_TAB3_TOPIC?: string;
  readonly VITE_BOT_TAB3_DEPTH?: string;
  readonly VITE_BOT_TAB3_HUMOR?: string;
  readonly VITE_BOT_TAB3_CONTEXT?: string;
  readonly VITE_BOT_TAB3_LIMITS?: string;
  readonly VITE_BOT_TAB3_GREETING?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}