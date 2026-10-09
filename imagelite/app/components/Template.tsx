'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface TemplateProps {
    children: React.ReactNode
}

type ThemeMode = 'light' | 'dark'

const links = [
    { href: '/', label: 'Início' },
    { href: '/galeria', label: 'Galeria' },
]

export const Template: React.FC<TemplateProps> = ({ children }: TemplateProps) => {
    const [theme, setTheme] = useState<ThemeMode>('light')

    useEffect(() => {
        const saved = window.localStorage.getItem('image-theme') as ThemeMode | null
        if (saved === 'light' || saved === 'dark') {
            setTheme(saved)
            return
        }

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setTheme(prefersDark ? 'dark' : 'light')
    }, [])

    useEffect(() => {
        window.localStorage.setItem('image-theme', theme)
    }, [theme])

    const isDark = theme === 'dark'
    const shellStyle = {
        background: isDark ? '#050505' : '#f7f7f7',
        color: isDark ? '#f5f5f5' : '#050505',
        ['--bg' as any]: isDark ? '#050505' : '#f7f7f7',
        ['--panel' as any]: isDark ? '#0b0b0b' : '#ffffff',
        ['--panel-soft' as any]: isDark ? '#111111' : '#f1f1f1',
        ['--text' as any]: isDark ? '#f5f5f5' : '#050505',
        ['--muted' as any]: isDark ? '#b8b8b8' : '#4b4b4b',
        ['--border' as any]: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)',
        ['--grid' as any]: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)',
        ['--button-bg' as any]: isDark ? '#ffffff' : '#111111',
        ['--button-text' as any]: isDark ? '#050505' : '#ffffff',
        ['--button-hover' as any]: isDark ? '#e5e5e5' : '#2b2b2b',
        ['--cube-face' as any]: isDark ? 'linear-gradient(135deg, #ffffff, #d9d9d9)' : 'linear-gradient(135deg, #0b0b0b, #323232)',
        ['--cube-border' as any]: isDark ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.28)',
    } as React.CSSProperties

    return (
        <div
            className="theme-shell min-h-screen flex flex-col selection:bg-black selection:text-white relative"
            data-theme={theme}
            style={shellStyle}
        >
            <div className="absolute inset-0 pointer-events-none z-0" style={{
                background: isDark
                    ? 'radial-gradient(circle at center, rgba(255,255,255,0.02), rgba(5,5,5,0.8) 70%, #050505 100%)'
                    : 'radial-gradient(circle at center, rgba(0,0,0,0.02), rgba(247,247,247,0.82) 70%, #f7f7f7 100%)'
            }} />

            <Header theme={theme} onToggleTheme={() => setTheme(isDark ? 'light' : 'dark')} />
            <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 relative z-10">
                {children}
            </main>
            <Footer />
        </div>
    )
}

interface HeaderProps {
    theme: ThemeMode
    onToggleTheme: () => void
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
    const pathname = usePathname()
    const [aberto, setAberto] = useState(false)
    const isDark = theme === 'dark'

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl border-b relative z-20" style={{
            background: isDark ? 'rgba(6,6,6,0.8)' : 'rgba(255,255,255,0.78)',
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
        }}>
            <div className="h-[2px] w-full" style={{
                background: isDark ? 'linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)' : 'linear-gradient(to right, transparent, rgba(0,0,0,0.4), transparent)'
            }} />

            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 h-20">
                <Link
                    href="/"
                    className="text-xl font-black tracking-tighter flex items-center gap-3 group"
                    style={{ color: isDark ? '#ffffff' : '#050505' }}
                    onClick={() => setAberto(false)}
                >
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-lg border transition-colors" style={{
                        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                        borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'
                    }}>
                        <span className="w-2 h-2 rounded-sm animate-pulse" style={{ background: isDark ? '#ffffff' : '#050505' }}></span>
                    </div>
                    <span className="tracking-widest text-sm uppercase">Image<span style={{ color: isDark ? '#a0a0a0' : '#5a5a5a' }} className="font-light">Lite</span></span>
                </Link>

                <nav className="hidden sm:flex items-center gap-8 border px-6 py-2 rounded-full backdrop-blur-md" style={{
                    background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                    borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
                }}>
                    {links.map(({ href, label }) => (
                        <ItemMenu key={href} href={href} label={label} ativo={pathname === href} dark={isDark} />
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onToggleTheme}
                        className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] border rounded-full transition-all duration-300"
                        style={{
                            background: isDark ? '#ffffff' : '#050505',
                            color: isDark ? '#050505' : '#ffffff',
                            borderColor: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.1)',
                        }}
                        aria-label="Alternar entre modo claro e escuro"
                    >
                        <span>{isDark ? '☀' : '☾'}</span>
                        {isDark ? 'Claro' : 'Escuro'}
                    </button>

                    <div className="flex items-center gap-3 text-[11px] font-mono border px-3 py-1.5 rounded-lg" style={{
                        color: isDark ? '#a1a1a1' : '#4b4b4b',
                        borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                        background: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.02)'
                    }}>
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        SYS.V2.6 // SECURE
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:hidden">
                    <button
                        type="button"
                        onClick={onToggleTheme}
                        className="p-2 border rounded-full text-xs font-bold"
                        style={{
                            background: isDark ? '#ffffff' : '#050505',
                            color: isDark ? '#050505' : '#ffffff',
                            borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'
                        }}
                        aria-label="Alternar tema"
                    >
                        {isDark ? '☀' : '☾'}
                    </button>

                    <button
                        type="button"
                        className="p-2 transition-colors"
                        style={{ color: isDark ? '#f5f5f5' : '#050505' }}
                        aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
                        onClick={() => setAberto(!aberto)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            {aberto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 17h16" />}
                        </svg>
                    </button>
                </div>
            </div>

            {aberto && (
                <nav className="sm:hidden border-t px-6 py-6 flex flex-col gap-4" style={{
                    background: isDark ? 'rgba(6,6,6,0.96)' : 'rgba(255,255,255,0.92)',
                    borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
                }}>
                    {links.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setAberto(false)}
                            className="text-lg transition-colors"
                            style={{
                                color: pathname === href
                                    ? (isDark ? '#ffffff' : '#050505')
                                    : (isDark ? '#bdbdbd' : '#4b4b4b')
                            }}
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
    dark: boolean
}

const ItemMenu: React.FC<ItemMenuProps> = ({ href, label, ativo, dark }: ItemMenuProps) => {
    return (
        <Link
            href={href}
            className="relative py-1 text-xs uppercase tracking-wider transition-colors"
            style={{
                color: ativo
                    ? (dark ? '#ffffff' : '#050505')
                    : (dark ? '#a6a6a6' : '#4b4b4b')
            }}
        >
            {label}
            {ativo && (
                <span className="absolute left-0 -bottom-2 h-[2px] w-full rounded-full" style={{ background: dark ? '#ffffff' : '#050505' }} />
            )}
        </Link>
    )
}

const Footer: React.FC = () => {
    return (
        <footer className="border-t mt-20 py-8 text-center text-[10px] font-mono tracking-widest uppercase relative z-10" style={{
            borderColor: 'rgba(0,0,0,0.08)',
            color: '#6b6b6b'
        }}>
            by Andrews — IFMT RONDONÓPOLIS 2026
            [ Built with the assistance of AI. ]
        </footer>
    )
}