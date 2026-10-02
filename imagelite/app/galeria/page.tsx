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

  async function searchImages() {
    const result = await useService.buscar(query, extension)
    setImages(result)
    setBuscou(true)
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
            className="bg-white hover:bg-zinc-200 text-zinc-950 text-sm font-bold uppercase tracking-wider py-3.5 px-10 rounded-xl transition-all duration-300 active:scale-95 shadow-[0_0_25px_rgba(255,255,255,0.2)] cursor-pointer"
          >
            Buscar
          </button>

          {/* Botão Mobile para Adicionar */}
          <button className="sm:hidden w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white border border-white/20 text-sm font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 active:scale-95">
            + Adicionar imagem
          </button>
        </div>
      </section>

      <section className="pb-20">
        {images.length > 0 ? (
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