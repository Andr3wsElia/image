import Link from 'next/link'
import { HeroObject3D } from './HeroObject3D'

interface PrimeiroComponenteProps {
    mensagem?: string
}

const recursos = [
    { titulo: '// BUSCA TÁTICA', texto: 'Indexação instantânea de arquivos com alta precisão por string.' },
    { titulo: '// FILTRAGEM RIGOROSA', texto: 'Separação cirúrgica por formatos (JPG, PNG, GIF, JPEG).' },
    { titulo: '// TELEMETRIA DE REDE', texto: 'Monitoramento contínuo de metadados, tamanhos e datas.' },
]

export const PrimeiroComponente = ({ mensagem }: PrimeiroComponenteProps) => {
    return (
        <div className="flex flex-col gap-16 py-10 relative">
            {/* Grid Principal dividido em 2 Caixas perfeitamente simétricas */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                
                {/* CAIXA 1: Bloco de Texto Tático */}
                <div className="relative flex flex-col justify-center gap-6 p-8 sm:p-12 rounded-none bg-gradient-to-b from-zinc-950 via-zinc-900/90 to-black border border-white/15 backdrop-blur-2xl shadow-2xl overflow-hidden min-h-[400px] lg:min-h-[450px]">
                    {/* Cantos Estilo HUD */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/50 m-3 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/50 m-3 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/50 m-3 pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/50 m-3 pointer-events-none"></div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none border border-white/20 bg-white/5 text-[10px] font-mono text-zinc-300 tracking-wider w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        SYSTEM ACTIVE // v2.6.0
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-[1.05]">
                        Suas imagens, simples de achar.
                    </h1>

                    <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed max-w-xl">
                        {mensagem ?? 'Ecossistema avançado de gerenciamento visual. Alta performance, indexação por banco de dados e interface totalmente voltada para produtividade extrema.'}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                        <Link
                            href="/galeria"
                            className="px-8 py-4 bg-white text-zinc-950 font-bold text-xs uppercase tracking-widest rounded-none transition-all duration-300 hover:bg-zinc-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95"
                        >
                            Abrir Galeria
                        </Link>
                    </div>
                </div>

                {/* CAIXA 2: Bloco do Objeto 3D (Mesmo tamanho exato) */}
                <div>
                    <HeroObject3D />
                </div>
            </section>

            {/* Seção Inferior: Recursos de Telemetria */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {recursos.map(({ titulo, texto }) => (
                    <div 
                        key={titulo} 
                        className="p-6 rounded-none bg-zinc-950/60 border border-white/15 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-zinc-900/80 group"
                    >
                        <h2 className="font-mono text-xs font-bold text-zinc-300 tracking-widest">{titulo}</h2>
                        <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">{texto}</p>
                    </div>
                ))}
            </section>
        </div>
    )
}