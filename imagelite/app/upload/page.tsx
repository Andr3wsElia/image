'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Input, Template } from '../components'
import { useImageService } from '../resource/service'

export default function UploadPage() {
  const router = useRouter()
  const imageService = useImageService()

  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState('')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!file) {
      setError('Selecione uma imagem antes de enviar.')
      return
    }

    if (!name.trim()) {
      setError('Informe o nome da imagem.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const parsedTags = tags
        .split(',')
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean)

      await imageService.enviar(file, name.trim(), parsedTags)
      router.push(`/galeria?search=${encodeURIComponent(name.trim())}`)
    } catch (submitError) {
      console.error(submitError)
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Não foi possível enviar a imagem.',
      )
    } finally {
      setLoading(false)
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] ?? null
    setFile(selectedFile)
  }

  return (
    <Template>
      <section className="mx-auto w-full max-w-3xl py-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em]" style={{ color: 'var(--muted)' }}>
              Upload
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight" style={{ color: 'var(--text)' }}>
              Nova imagem
            </h1>
          </div>

          <Link
            href="/galeria"
            className="rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] transition-all duration-300"
            style={{ borderColor: 'var(--border)', color: 'var(--text)', background: 'var(--panel)' }}
          >
            Voltar
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border p-6 sm:p-8"
          style={{ background: 'var(--panel)', borderColor: 'var(--border)', boxShadow: '0 20px 50px rgba(0,0,0,0.08)' }}
        >
          <div className="space-y-5">
            <Input
              label="Arquivo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file:mr-3 file:rounded-full file:border file:border-solid file:border-white/20 file:bg-transparent file:px-3 file:py-1.5 file:text-xs file:font-bold file:uppercase file:tracking-[0.2em]"
            />

            <Input
              label="Nome da imagem"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ex: paisagem-01"
            />

            <Input
              label="Tags"
              type="text"
              value={tags}
              onChange={(event) => setTags(event.target.value.toLowerCase())}
              placeholder="natureza, viagem, arquitetura"
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between gap-3 pt-2">
            <Link
              href="/galeria"
              className="inline-flex items-center justify-center rounded-xl border px-4 py-3 text-xs font-bold uppercase tracking-[0.18em]"
              style={{ borderColor: 'var(--border)', color: 'var(--text)', background: 'transparent' }}
            >
              Cancelar
            </Link>

            <Button type="submit" variant="primary" disabled={loading} className="min-w-[180px]">
              {loading ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </form>
      </section>
    </Template>
  )
}
