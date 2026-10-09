import { useMemo } from 'react'
import { Image } from './image'

export class ImageService {
  baseURL: string = 'http://localhost:8080/images'

  async buscar(query: string = '', extension?: string): Promise<Image[]> {
    const params = new URLSearchParams()

    if (query) params.set('query', query)
    if (extension) params.set('extension', extension)

    const url = `${this.baseURL}${params.toString() ? `?${params.toString()}` : ''}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Falha ao buscar imagens: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.map((image: any) => ({
      ...image,
      tags: Array.isArray(image.tags) ? image.tags : typeof image.tags === 'string' ? image.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean) : [],
    }))
  }

  async enviar(file: File, name: string, tags: string[]): Promise<void> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', name)

    const normalizedTags = tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean)
    normalizedTags.forEach((tag) => formData.append('tags', tag))

    const response = await fetch(this.baseURL, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(
        `Falha ao enviar imagem: ${response.status} ${response.statusText}`,
      )
    }
  }

  async deletar(id?: string): Promise<void> {
    if (!id) {
      throw new Error('Não foi possível identificar a imagem para remover.')
    }

    const response = await fetch(`${this.baseURL}/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error(`Falha ao apagar imagem: ${response.status} ${response.statusText}`)
    }
  }
}

export const useImageService = () => useMemo(() => new ImageService(), [])