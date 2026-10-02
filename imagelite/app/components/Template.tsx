'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface TemplateProps {
    children: React.ReactNode
}

const links = [
    { href: '/', label: 'Início' },
    { href: '/galeria', label: 'Galeria' },
]

export const Template: React.FC<TemplateProps> = ({ children }: TemplateProps) => {
    return (
        <div className="min-h-screen flex flex-col text-zinc-100 selection:bg-white selection:text-black relative bg-hud-grid">
            {/* Camada HUD superior de rastreio/profissionais */}
            <div className="absolute inset-0 bg-radial-fade pointer-events-none z-0" />
            
            <Header />
            <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 relative z-10">
                {children}
            </main>
            <Footer />
        </div>
    )
}

const Header: React.FC = () => {
    const pathname = usePathname()
    const [aberto, setAberto] = useState(false)

    return (
        <header className="sticky top-0 z-50 bg-[#060608]/80 backdrop-blur-xl border-b border-white/10 relative z-20">
            {/* Linha HUD de status no topo */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 h-20">
                <Link
                    href="/"
                    className="text-xl font-black tracking-tighter text-white flex items-center gap-3 group"
                    onClick={() => setAberto(false)}
                >
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/40 transition-colors">
                        <span className="w-2 h-2 rounded-sm bg-white animate-pulse"></span>
                    </div>
                    <span className="tracking-widest text-sm uppercase">Image<span className="text-zinc-500 font-light">Lite</span></span>
                </Link>

                {/* HUD Central / Desktop Nav */}
                <nav className="hidden sm:flex items-center gap-8 bg-white/[0.02] border border-white/5 px-6 py-2 rounded-full backdrop-blur-md">
                    {links.map(({ href, label }) => (
                        <ItemMenu key={href} href={href} label={label} ativo={pathname === href} />
                    ))}
                </nav>

                {/* Status HUD Info à direita */}
                <div className="hidden md:flex items-center gap-3 text-[11px] font-mono text-zinc-500 border border-white/5 bg-white/[0.01] px-3 py-1.5 rounded-lg">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    SYS.V2.6 // SECURE
                </div>

                {/* Botão mobile */}
                <button
                    type="button"
                    className="sm:hidden p-2 text-zinc-400 hover:text-white transition-colors"
                    aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
                    onClick={() => setAberto(!aberto)}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        {aberto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 17h16" />}
                    </svg>
                </button>
            </div>

            {aberto && (
                <nav className="sm:hidden border-t border-white/10 bg-[#060608]/95 backdrop-blur-2xl px-6 py-6 flex flex-col gap-4">
                    {links.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setAberto(false)}
                            className={`text-lg transition-colors ${pathname === href ? 'font-bold text-white' : 'text-zinc-400 hover:text-white'}`}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    )
}

interface ItemMenuProps {
    href: string
    label: string
    ativo: boolean
}

const ItemMenu: React.FC<ItemMenuProps> = ({ href, label, ativo }: ItemMenuProps) => {
    return (
        <Link
            href={href}
            className={`relative py-1 text-xs uppercase tracking-wider transition-colors ${
                ativo ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
        >
            {label}
            {ativo && (
                <span className="absolute left-0 -bottom-2 h-[2px] w-full bg-white rounded-full" />
            )}
        </Link>
    )
}

const Footer: React.FC = () => {
    return (
        <footer className="border-t border-white/5 mt-20 py-8 text-center text-[10px] font-mono tracking-widest text-zinc-600 uppercase relative z-10">
            by Andrews — IFMT RONDONÓPOLIS 2026
            [ Built with the assistance of AI. ]
        </footer>
    )
}