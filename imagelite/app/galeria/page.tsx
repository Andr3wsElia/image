'use client'
import { Template, ImageCard } from '../components'
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
    'border border-white/15 bg-zinc-900/80 backdrop-blur-md text-zinc-100 placeholder-zinc-500 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-300'

  return (
    <Template>
      <section className="py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white">Galeria</h1>
            <p className="mt-2 text-zinc-400 font-light">Busque por nome ou filtre por formato de arquivo no banco de dados.</p>
          </div>
          
          {/* Botão Adicionar Imagem totalmente reestilizado com alto contraste */}
          <button className="hidden sm:flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white border border-white/20 hover:border-white text-sm font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-xl active:scale-95 cursor-pointer">
            <span className="text-emerald-400 font-bold">+</span> Adicionar imagem
          </button>
        </div>

        {/* Barra de Filtros e Busca com Botão Buscar GRANDE */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchImages()}
            className={`${campo} flex-1`}
            placeholder="Pesquisar imagens por nome..."
          />

          <select
            value={extension}
            onChange={(e) => setExtension(e.target.value)}
            className={`${campo} cursor-pointer`}
          >
            <option value="" className="bg-zinc-950 text-zinc-400">Todos os formatos</option>
            <option value="JPG" className="bg-zinc-950 text-white">JPG</option>
            <option value="PNG" className="bg-zinc-950 text-white">PNG</option>
            <option value="JPEG" className="bg-zinc-950 text-white">JPEG</option>
            <option value="GIF" className="bg-zinc-950 text-white">GIF</option>
          </select>

          {/* Botão Buscar Grande e Impactante */}
          <button
            onClick={searchImages}
            disabled={loading}
            className="bg-white hover:bg-zinc-200 text-zinc-950 text-sm font-bold uppercase tracking-wider py-3.5 px-10 rounded-xl transition-all duration-300 active:scale-95 shadow-[0_0_25px_rgba(255,255,255,0.2)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-zinc-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Buscando...
              </>
            ) : (
              'Buscar'
            )}
          </button>

          {/* Botão Mobile para Adicionar */}
          <button className="sm:hidden w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white border border-white/20 text-sm font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 active:scale-95">
            + Adicionar imagem
          </button>
        </div>
      </section>

      <section className="pb-20">
        {loading ? (
          /* Animação de Loading centralizada na área dos resultados */
          <div className="py-24 text-center border border-dashed border-white/10 rounded-2xl bg-zinc-900/20 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            <p className="text-zinc-400 font-light">Carregando imagens...</p>
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map(renderImageCard)}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-white/10 rounded-2xl bg-zinc-900/20 backdrop-blur-sm">
            <p className="text-zinc-400 font-light">
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