import Link from 'next/link'

interface PrimeiroComponenteProps {
    mensagem?: string
}

const recursos = [
    { titulo: '// BUSCA TÁTICA', texto: 'Digite parte do nome e encontre a imagem na hora com indexação de alta velocidade.' },
    { titulo: '// FILTRAGEM RIGOROSA', texto: 'JPG, PNG, JPEG ou GIF: isole exatamente o formato desejado sem ruídos.' },
    { titulo: '// TELEMETRIA COMPLETA', texto: 'Acesse metadados avançados como peso real, extensão e registro temporal.' },
]

export const PrimeiroComponente = ({ mensagem }: PrimeiroComponenteProps) => {
    return (
        <div className="flex flex-col gap-24 py-16 relative">
            {/* Bloco HUD Central Envolvente exaltando o texto */}
            <section className="relative flex flex-col items-center text-center gap-8 py-20 px-6 sm:px-12 rounded-3xl bg-zinc-950/60 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/80 overflow-hidden">
                {/* Linhas de mira / HUD decorativas nos cantos */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/40 m-4"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/40 m-4"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/40 m-4"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/40 m-4"></div>

                {/* Brilho interno dinâmico */}
                <div className="absolute -top-24 w-96 h-96 bg-white/10 blur-[140px] rounded-full pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-[11px] font-mono text-zinc-300 tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    CORE ENGINE ACTIVE // READY
                </div>

                <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white max-w-3xl leading-[1.05]">
                    Suas imagens, simples de achar.
                </h1>

                <p className="text-base sm:text-lg text-zinc-400 max-w-xl font-light leading-relaxed">
                    {mensagem ?? 'Guarde, busque e organize seus ativos digitais em um ecossistema visual de alta performance.'}
                </p>

                <div className="flex items-center gap-4 pt-4">
                    <Link
                        href="/galeria"
                        className="px-9 py-4 bg-white text-zinc-950 font-bold text-sm uppercase tracking-wider rounded-xl transition-all duration-300 hover:bg-zinc-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95"
                    >
                        Abrir Galeria
                    </Link>
                </div>
            </section>

            {/* Cards de Recursos */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {recursos.map(({ titulo, texto }) => (
                    <div 
                        key={titulo} 
                        className="p-8 rounded-2xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-zinc-900/60 group"
                    >
                        <h2 className="font-mono text-xs font-bold text-zinc-300 tracking-widest">{titulo}</h2>
                        <p className="mt-4 text-sm text-zinc-400 leading-relaxed font-light">{texto}</p>
                    </div>
                ))}
            </section>
        </div>
    )
}