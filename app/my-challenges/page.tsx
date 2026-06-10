// src/app/my-challenges/page.tsx

const myChallenges = [
    {
        id: "steps-7-days",
        title: "10.000 pasos diarios",
        status: "active",
        progress: 57,
        entryAmount: 1,
        prizePool: 24,
        daysLeft: 3,
    },
    {
        id: "github-commits",
        title: "Commit diario",
        status: "completed",
        progress: 100,
        entryAmount: 1,
        prizePool: 18,
        daysLeft: 0,
    },
    {
        id: "pomodoro-study",
        title: "Estudio Pomodoro",
        status: "lost",
        progress: 40,
        entryAmount: 1,
        prizePool: 12,
        daysLeft: 0,
    },
    ];

    function getStatusLabel(status: string) {
    if (status === "active") return "Activo";
    if (status === "completed") return "Completado";
    if (status === "lost") return "Perdido";
    return "Desconocido";
    }

    function getStatusStyles(status: string) {
    if (status === "active") return "bg-blue-100 text-blue-700";
    if (status === "completed") return "bg-green-100 text-green-700";
    if (status === "lost") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
    }

    export default function MyChallengesPage() {
    return (
        <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
            <h1 className="text-3xl font-bold">Mis retos</h1>
            <p className="mt-2 text-gray-600">
            Revisa tus retos activos, completados y perdidos.
            </p>
        </div>

        <section className="grid gap-6 md:grid-cols-3">
            {myChallenges.map((challenge) => (
            <article
                key={challenge.id}
                className="rounded-2xl border bg-white p-5 shadow-sm"
            >
                <div className="mb-4 flex items-center justify-between">
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles(
                    challenge.status
                    )}`}
                >
                    {getStatusLabel(challenge.status)}
                </span>

                <span className="text-sm font-semibold">
                    {challenge.entryAmount} USDT
                </span>
                </div>

                <h3 className="text-lg font-bold">{challenge.title}</h3>

                <div className="mt-5">
                <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-600">Progreso</span>
                    <span className="font-semibold">{challenge.progress}%</span>
                </div>

                <div className="h-3 rounded-full bg-gray-100">
                    <div
                    className="h-3 rounded-full bg-black"
                    style={{ width: `${challenge.progress}%` }}
                    />
                </div>
                </div>

                <div className="mt-5 space-y-2 text-sm text-gray-700">
                <p>Pozo: {challenge.prizePool} USDT</p>
                <p>
                    {challenge.daysLeft > 0
                    ? `Faltan ${challenge.daysLeft} días`
                    : "Reto finalizado"}
                </p>
                </div>
            </article>
            ))}
        </section>
        </main>
    );
}