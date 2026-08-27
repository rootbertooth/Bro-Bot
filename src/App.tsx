import { BroBotChat } from "@/components/BroBotChat";
import { botIdentity, personas } from "@/lib/bot-config";

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-96 bg-[var(--gradient-aura)] blur-3xl" />

      <div className="relative mx-auto w-full max-w-3xl px-5 py-14 sm:py-20">
        <header className="mb-10 text-center">
          <span className="inline-flex items-center rounded-full border border-border/70 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Chat embebido
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            {botIdentity.name}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-muted-foreground">
            {botIdentity.tagline}. Cambia de pestaña para hablar con una personalidad
            distinta: cada una se define en el archivo <code>.env</code>.
          </p>
        </header>

        <BroBotChat />

        <section className="mt-8 grid gap-3 sm:grid-cols-3">
          {personas.map((persona) => (
            <article
              key={persona.id}
              className="rounded-2xl border border-border/60 bg-card/60 p-4"
            >
              <h3 className="text-sm font-semibold">{persona.label}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {persona.character}. Tono {persona.tone}.
              </p>
            </article>
          ))}
        </section>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Configura carácter, tono, tema, profundidad, humor, contexto y límites en{" "}
          <code>.env</code> — el historial se guarda en este navegador.
        </p>
      </div>
    </main>
  );
}

export default App;