export default function CreateChallengePage() {
    return (
        <main className="mx-auto max-w-3xl px-6 py-10">
            <h1 className="text-3xl font-bold">
            Crear reto personalizado
            </h1>
    
            <p className="mt-2 text-gray-600">
            Define las reglas de tu reto y compártelo con otros usuarios.
            </p>
    
            <form className="mt-8 space-y-6">
            <div>
                <label className="mb-2 block font-medium">
                Nombre del reto
                </label>
    
                <input
                type="text"
                placeholder="Ej: Leer 3 libros"
                className="w-full rounded-xl border p-3"
                />
            </div>
    
            <div>
                <label className="mb-2 block font-medium">
                Descripción
                </label>
    
                <textarea
                rows={4}
                className="w-full rounded-xl border p-3"
                />
            </div>
    
            <div>
                <label className="mb-2 block font-medium">
                Duración (días)
                </label>
    
                <input
                type="number"
                className="w-full rounded-xl border p-3"
                />
            </div>
    
            <div>
                <label className="mb-2 block font-medium">
                Entrada (USDT)
                </label>
    
                <input
                type="number"
                className="w-full rounded-xl border p-3"
                />
            </div>
    
            <div>
                <label className="mb-2 block font-medium">
                Método de resolución
                </label>
    
                <select className="w-full rounded-xl border p-3">
                <option>Votación de participantes</option>
                <option>Decisión del creador</option>
                <option>Árbitro designado</option>
                </select>
            </div>
    
            <button
                type="submit"
                className="w-full rounded-xl bg-black py-3 text-white"
            >
                Crear reto
            </button>
            </form>
        </main>
        );
    }