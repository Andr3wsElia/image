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
                <div className="relative flex flex-col justify-center gap-6 p-8 sm:p-12 rounded-none border backdrop-blur-2xl shadow-2xl overflow-hidden min-h-[400px] lg:min-h-[450px]" style={{ background: 'var(--panel)', borderColor: 'var(--border)', boxShadow: '0 25px 80px rgba(0,0,0,0.08)' }}>
                    {/* Cantos Estilo HUD */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/50 m-3 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/50 m-3 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/50 m-3 pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/50 m-3 pointer-events-none"></div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none border text-[10px] font-mono tracking-wider w-fit" style={{ borderColor: 'var(--border)', background: 'var(--panel-soft)', color: 'var(--text)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        SYSTEM ACTIVE // v2.6.0
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05]" style={{ color: 'var(--text)' }}>
                        Suas imagens, simples de achar.
                    </h1>

                    <p className="text-sm sm:text-base font-light leading-relaxed max-w-xl" style={{ color: 'var(--muted)' }}>
                        {mensagem ?? 'Ecossistema avançado de gerenciamento visual. Alta performance, indexação por banco de dados e interface totalmente voltada para produtividade extrema.'}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                        <Link
                            href="/galeria"
                            className="px-8 py-4 font-bold text-xs uppercase tracking-widest rounded-none transition-all duration-300 active:scale-95"
                            style={{ background: 'var(--text)', color: 'var(--bg)' }}
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
                        className="p-6 rounded-none border backdrop-blur-sm transition-all duration-300 group"
                        style={{ background: 'var(--panel)', borderColor: 'var(--border)' }}
                    >
                        <h2 className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text)' }}>{titulo}</h2>
                        <p className="mt-3 text-xs sm:text-sm leading-relaxed font-light" style={{ color: 'var(--muted)' }}>{texto}</p>
                    </div>
                ))}
            </section>
        </div>
    )
}