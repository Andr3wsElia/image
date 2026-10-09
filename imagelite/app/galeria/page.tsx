'use client'
import { Template, ImageCard } from '../components'
import { GalleryLoader } from '../components/HeroObject3D'
import { useImageService } from '../resource/service'
import { Image } from '../resource/image'
import { useState } from 'react'

export default function Galeria() {
  const useService = useImageService()
  const [images, setImages] = useState<Image[]>([])
  const [query, setQuery] = useState<string>('')
  const [extension, setExtension] = useState<string>('')
  const [buscou, setBuscou] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false) // Novo estado para o loading

  async function searchImages() {
    try {
      setLoading(true)
      const result = await useService.buscar(query, extension)
      setImages(result)
      setBuscou(true)
    } catch (error) {
      console.error('Erro ao buscar imagens:', error)
    } finally {
      setLoading(false) // Desativa o loading independentemente de sucesso ou erro
    }
  }

  function renderImageCard(image: Image) {
    return (
      <ImageCard
        key={image.url}
        imageName={image.name}
        imageUrl={image.url}
        extension={image.extension}
        imageSize={image.size}
        uploadDate={image.uploadDate}
      />
    )
  }

  const campo =
    'border backdrop-blur-md rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all duration-300'

  return (
    <Template>
      <section className="py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight" style={{ color: 'var(--text)' }}>Galeria</h1>
            <p className="mt-2 font-light" style={{ color: 'var(--muted)' }}>Busque por nome ou filtre por formato de arquivo no banco de dados.</p>
          </div>
          
          <button className="hidden sm:flex items-center gap-2 border text-sm font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-xl active:scale-95 cursor-pointer" style={{ background: 'var(--panel)', borderColor: 'var(--border)', color: 'var(--text)' }}>
            <span className="font-bold" style={{ color: '#22c55e' }}>+</span> Adicionar imagem
          </button>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchImages()}
            className={`${campo} flex-1`}
            placeholder="Pesquisar imagens por nome..."
            style={{ background: 'var(--panel-soft)', borderColor: 'var(--border)', color: 'var(--text)', boxShadow: '0 0 0 1px rgba(0,0,0,0.02)' }}
          />

          <select
            value={extension}
            onChange={(e) => setExtension(e.target.value)}
            className={`${campo} cursor-pointer`}
            style={{ background: 'var(--panel-soft)', borderColor: 'var(--border)', color: 'var(--text)' }}
          >
            <option value="" style={{ background: 'var(--panel)', color: 'var(--muted)' }}>Todos os formatos</option>
            <option value="JPG" style={{ background: 'var(--panel)', color: 'var(--text)' }}>JPG</option>
            <option value="PNG" style={{ background: 'var(--panel)', color: 'var(--text)' }}>PNG</option>
            <option value="JPEG" style={{ background: 'var(--panel)', color: 'var(--text)' }}>JPEG</option>
            <option value="GIF" style={{ background: 'var(--panel)', color: 'var(--text)' }}>GIF</option>
          </select>

          <button
            onClick={searchImages}
            disabled={loading}
            className="text-sm font-bold uppercase tracking-wider py-3.5 px-10 rounded-xl transition-all duration-300 active:scale-95 shadow-[0_0_25px_rgba(255,255,255,0.2)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{ background: 'var(--button-bg)', color: 'var(--button-text)' }}
          >
            Buscar
          </button>

          <button className="sm:hidden w-full flex items-center justify-center gap-2 border text-sm font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 active:scale-95" style={{ background: 'var(--panel)', borderColor: 'var(--border)', color: 'var(--text)' }}>
            + Adicionar imagem
          </button>
        </div>
      </section>

      <section className="pb-20">
        {loading ? (
          <div className="min-h-[160px] py-8 text-center border rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center gap-1 shadow-[0_10px_30px_rgba(15,23,42,0.04)]" style={{ background: 'var(--panel)', borderColor: 'var(--border)' }}>
            <GalleryLoader />
            <p className="text-sm font-light" style={{ color: 'var(--muted)' }}>Carregando imagens...</p>
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map(renderImageCard)}
          </div>
        ) : (
          <div className="py-24 text-center border rounded-2xl backdrop-blur-sm" style={{ background: 'var(--panel)', borderColor: 'var(--border)' }}>
            <p className="font-light" style={{ color: 'var(--muted)' }}>
              {buscou
                ? 'Nenhuma imagem encontrada. Tente outro termo ou formato.'
                : 'Clique em Buscar para listar as suas imagens.'}
            </p>
          </div>
        )}
      </section>
    </Template>
  )
}