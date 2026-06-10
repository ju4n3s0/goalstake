// src/app/profile/page.tsx

const userStats = {
    username: "Juan",
    walletAddress: "0x8A4...91F2",
    reputation: 86,
    totalWon: 18.5,
    totalLost: 4,
    activeChallenges: 2,
    completedChallenges: 7,
    lostChallenges: 1,
    currentStreak: 5,
};

export default function ProfilePage() {
return (
    <main className="mx-auto max-w-6xl px-6 py-10">
    <section className="rounded-3xl border bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
            <p className="text-sm font-semibold text-green-600">
            Perfil GoalStake
            </p>

            <h1 className="mt-2 text-3xl font-bold">
            {userStats.username}
            </h1>

            <p className="mt-1 text-gray-500">
            Wallet: {userStats.walletAddress}
            </p>
        </div>

        <div className="rounded-2xl bg-black px-5 py-4 text-white">
            <p className="text-sm text-gray-300">Reputación</p>
            <p className="text-3xl font-bold">
            {userStats.reputation}/100
            </p>
        </div>
        </div>
    </section>

    <section className="mt-8 grid gap-6 md:grid-cols-4">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Ganado</p>
        <p className="mt-2 text-3xl font-bold text-green-600">
            {userStats.totalWon} USDT
        </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Perdido</p>
        <p className="mt-2 text-3xl font-bold text-red-600">
            {userStats.totalLost} USDT
        </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Racha actual</p>
        <p className="mt-2 text-3xl font-bold">
            {userStats.currentStreak} días
        </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Retos activos</p>
        <p className="mt-2 text-3xl font-bold">
            {userStats.activeChallenges}
        </p>
        </div>
    </section>

    <section className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-green-50 p-6">
        <p className="text-sm text-green-700">Retos completados</p>
        <p className="mt-2 text-4xl font-bold text-green-700">
            {userStats.completedChallenges}
        </p>
        </div>

        <div className="rounded-2xl bg-red-50 p-6">
        <p className="text-sm text-red-700">Retos perdidos</p>
        <p className="mt-2 text-4xl font-bold text-red-700">
            {userStats.lostChallenges}
        </p>
        </div>

        <div className="rounded-2xl bg-gray-100 p-6">
        <p className="text-sm text-gray-600">Tasa de éxito</p>
        <p className="mt-2 text-4xl font-bold">
            {Math.round(
            (userStats.completedChallenges /
                (userStats.completedChallenges + userStats.lostChallenges)) *
                100
            )}
            %
        </p>
        </div>
    </section>
    </main>
);
}