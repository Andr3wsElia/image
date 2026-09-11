'use client'

//import { Template } from '../components/Template';
//import { ImageCard } from '../components/Image';
import { Template, ImageCard,  } from '@/components';
import { ImageService, useImageService } from '@/resource/service';
import { Image } from '@/resource/image'; 
import { useState } from 'react';




export default function Galeria() {
  
  const useService = useImageService()
  const[images, setImages] = useState<Image[]>([])

  async function searchImages() {
    
    const result = await useService.buscar();
    setImages(result);
    console.table(result)
  }

  function renderImageCard(image: Image) {
    return (
      <ImageCard imageName = {image.name} 
                 imageUrl = {image.url}
                 imageSize = {image.size}
                 uploadDate = {image.uploadDate}
      />
    )
  }

  function renderImageCards() {
    return images.map(renderImageCard);
  }

  return (
   
      <Template>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={searchImages}>
          Mudar Imagem
        </button>

        <section className="grid grid-cols-3 gap-4  p-4">
          <ImageCard  imageName='{images[0]?.name}'/>
          
        </section>

        <section>
          {
            renderImageCards()
          }
        </section>
          
      </Template>
   
  )
}