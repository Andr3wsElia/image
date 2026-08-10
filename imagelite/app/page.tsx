import PrimeiroComponente from './components/PrimeiroComponente';

export default function Home() {
  return (
    // Mudamos flex-1 para min-h-screen para a tela ocupar 100% da altura do monitor
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* Corrigimos py-50 para py-20, que é uma classe válida do Tailwind */}
      <main className="flex w-full max-w-3xl flex-col items-center justify-center gap-8 py-20 px-16 bg-white dark:bg-zinc-900 shadow-md rounded-lg sm:items-start">
        <PrimeiroComponente />
        <h1 className="text-5xl font-bold text-black dark:text-white sm:text-2xl text-center sm:text-left">
          Busque comer cimento
        </h1>
      </main>
    </div>
  );
}