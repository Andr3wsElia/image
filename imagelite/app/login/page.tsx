'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { Button, Input, Template } from '../components'

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

const loginCandidates = [
 `${apiBase}/login`,
 `${apiBase}/auth/login`,
 `${apiBase}/users/login`,
 `${apiBase}/api/login`,
 `${apiBase}/api/auth/login`,
 `${apiBase}/api/users/login`,
]

function extractToken(payload: unknown): string | null {
 if (!payload || typeof payload !== 'object') return null

 const candidate = payload as Record<string, unknown>

 if (typeof candidate.accessToken === 'string') return candidate.accessToken
 if (typeof candidate.token === 'string') return candidate.token
 if (typeof candidate.jwt === 'string') return candidate.jwt

 if (candidate.data && typeof candidate.data === 'object') {
   const nested = candidate.data as Record<string, unknown>
   if (typeof nested.accessToken === 'string') return nested.accessToken
   if (typeof nested.token === 'string') return nested.token
 }

 return null
}

export default function LoginPage() {
 const router = useRouter()
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState('')

 async function handleSubmit(event: FormEvent<HTMLFormElement>) {
   event.preventDefault()

   if (!email.trim() || !password.trim()) {
     setError('Informe seu e-mail e sua senha.')
     return
   }

   setLoading(true)
   setError('')

   let lastError: unknown = null

   try {
     for (const url of loginCandidates) {
       try {
         const response = await fetch(url, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             email: email.trim(),
             password,
           }),
         })

         if (!response.ok) {
           lastError = new Error(`${response.status} ${response.statusText}`)
           continue
         }

         const payload = await response.json()
         const token = extractToken(payload)

         if (!token) {
           throw new Error('Login realizado, mas nenhum token foi retornado.')
         }

         localStorage.setItem('image_token', token)
         router.push('/galeria')
         return
       } catch (attemptError) {
         lastError = attemptError
       }
     }

     throw lastError ?? new Error('Não foi possível fazer login.')
   } catch (submitError) {
     console.error(submitError)
     setError(
       submitError instanceof Error
         ? submitError.message
         : 'Não foi possível realizar o login.',
     )
   } finally {
     setLoading(false)
   }
 }

 return (
   <Template>
     <section className="mx-auto flex w-full max-w-5xl items-center justify-center py-10 sm:py-16">
       <div
         className="grid w-full overflow-hidden rounded-[28px] border shadow-[0_30px_80px_rgba(0,0,0,0.12)] md:grid-cols-[1.15fr_0.85fr]"
         style={{
           background: 'var(--panel)',
           borderColor: 'var(--border)',
         }}
       >
         <div
           className="hidden md:flex flex-col justify-between border-r p-8 lg:p-10"
           style={{
             borderColor: 'var(--border)',
             background: 'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.0))',
           }}
         >
           <div>
             <p className="text-[10px] font-bold uppercase tracking-[0.36em]" style={{ color: 'var(--muted)' }}>
               Acesso ao sistema
             </p>
             <h1 className="mt-4 text-4xl font-black tracking-tight" style={{ color: 'var(--text)' }}>
               Bem-vindo ao ImageLite.
             </h1>
           </div>

           <div className="mt-10 rounded-2xl border p-5" style={{ borderColor: 'var(--border)', background: 'var(--panel-soft)' }}>
             <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: 'var(--muted)' }}>
               Fluxo
             </p>
             <div className="mt-4 space-y-4 text-sm" style={{ color: 'var(--text)' }}>
               <div className="flex items-start gap-3">
                 <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold" style={{ borderColor: 'var(--border)' }}>1</span>
                 <p>Faça login com seu e-mail e senha cadastrados.</p>
               </div>
               <div className="flex items-start gap-3">
                 <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold" style={{ borderColor: 'var(--border)' }}>2</span>
                 <p>Seu token fica salvo no navegador para acesso ao painel.</p>
               </div>
               <div className="flex items-start gap-3">
                 <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold" style={{ borderColor: 'var(--border)' }}>3</span>
                 <p>Depois você pode navegar na galeria e enviar imagens.</p>
               </div>
             </div>
           </div>
         </div>

         <div className="p-6 sm:p-8 lg:p-10">
           <div className="mb-8 flex items-center justify-between gap-3">
             <div>
               <p className="text-[10px] font-bold uppercase tracking-[0.32em]" style={{ color: 'var(--muted)' }}>
                 Login
               </p>
               <h2 className="mt-3 text-3xl font-black tracking-tight" style={{ color: 'var(--text)' }}>
                 Entrar
               </h2>
             </div>

             <Link
               href="/"
               className="rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
               style={{ borderColor: 'var(--border)', color: 'var(--text)', background: 'var(--panel-soft)' }}
             >
               Início
             </Link>
           </div>

           <form onSubmit={handleSubmit} className="space-y-5">
             <Input
               label="E-mail"
               type="email"
               value={email}
               onChange={(event) => setEmail(event.target.value)}
               placeholder="seu@email.com"
               autoComplete="email"
             />

             <Input
               label="Senha"
               type="password"
               value={password}
               onChange={(event) => setPassword(event.target.value)}
               placeholder="••••••••"
               autoComplete="current-password"
             />

             <div className="flex items-center justify-between gap-3 pt-1 text-xs" style={{ color: 'var(--muted)' }}>
               <label className="inline-flex items-center gap-2">
                 <input type="checkbox" className="h-4 w-4 rounded border" style={{ accentColor: 'var(--text)' }} />
                 Lembrar-me
               </label>

               <Link href="/" className="font-semibold hover:opacity-80" style={{ color: 'var(--text)' }}>
                 Esqueci a senha
               </Link>
             </div>

             {error && (
               <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                 {error}
               </p>
             )}

             <Button type="submit" variant="primary" disabled={loading} className="w-full">
               {loading ? 'Entrando...' : 'Entrar'}
             </Button>
           </form>

           <div className="mt-6 text-center text-sm" style={{ color: 'var(--muted)' }}>
             Ainda não tem conta?{' '}
             <Link href="/" className="font-bold" style={{ color: 'var(--text)' }}>
               Voltar ao início
             </Link>
           </div>
         </div>
       </div>
     </section>
   </Template>
 )
}
