// src/app/page.tsx

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <section className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-3 text-sm font-semibold text-green-600">
            Retos con dinero en MiniPay
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Pon dinero detrás de tus metas.
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Únete a retos verificables, cumple tus objetivos y gana parte del
            pozo. Si fallas, pierdes tu depósito.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/challenges"
              className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
            >
              Explorar retos
            </Link>

            <Link
              href="/create-challenge"
              className="rounded-xl border px-5 py-3 text-sm font-semibold"
            >
              Crear reto
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-gray-100 p-8">
          <h2 className="text-2xl font-bold">¿Cómo funciona?</h2>

          <div className="mt-6 space-y-4">
            <p>1. Elige o crea un reto.</p>
            <p>2. Deposita una entrada con MiniPay.</p>
            <p>3. Cumple el objetivo.</p>
            <p>4. Gana si completas el reto.</p>
          </div>
        </div>
      </section>
    </main>
  );
}