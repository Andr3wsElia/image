import React from 'react'

interface ImageCardProps {
 imageId?: string
 imageUrl?: string
 imageName?: string
 imageSize?: string
 uploadDate?: string
 extension?: string
 tags?: string[]
 onDelete?: (id?: string) => void
}

export const ImageCard: React.FC<ImageCardProps> = ({
 imageId,
 imageUrl,
 imageName,
 imageSize,
 uploadDate,
 extension,
 tags = [],
 onDelete,
}) => {
 function downloadImage() {
   if (!imageUrl) return

   try {
     const link = document.createElement('a')
     link.href = imageUrl
     link.rel = 'noopener'
     link.target = '_blank'

     const isLocalOrSameOrigin = imageUrl.startsWith(window.location.origin) || imageUrl.startsWith('blob:') || imageUrl.startsWith('data:')

     if (isLocalOrSameOrigin) {
       link.download = imageName || 'download-image'
     }

     document.body.appendChild(link)
     link.click()
     document.body.removeChild(link)
   } catch (error) {
     console.error('Erro ao iniciar o download da imagem:', error)
     window.open(imageUrl, '_blank')
   }
 }

 function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
   event.stopPropagation()

   const confirmed = window.confirm(`Deseja excluir a imagem "${imageName || 'selecionada'}"?`)
   if (!confirmed) return

   onDelete?.(imageId)
 }

 return (
   <div
     className="group relative overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5"
     style={{ background: 'var(--panel)', borderColor: 'var(--border)', boxShadow: '0 16px 40px rgba(0,0,0,0.06)' }}
   >
     <div onClick={downloadImage} className="cursor-pointer">
       <div className="relative h-56 w-full overflow-hidden" style={{ background: 'var(--bg)' }}>
         <img
           src={imageUrl}
           className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
           alt={imageName || 'Thumbnail'}
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

         {extension && (
           <span
             className="absolute top-3 right-3 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
             style={{ background: 'rgba(0,0,0,0.6)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.12)' }}
           >
             {extension}
           </span>
         )}

         {onDelete && (
           <button
             type="button"
             onClick={handleDelete}
             className="absolute left-3 top-3 rounded-full border px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-opacity hover:opacity-100"
             style={{ background: 'rgba(0,0,0,0.7)', color: '#fff', borderColor: 'rgba(255,255,255,0.12)', opacity: 0.8 }}
             aria-label="Apagar imagem"
           >
             Delete
           </button>
         )}
       </div>

       <div className="flex flex-col gap-3 p-5">
         <h1 className="truncate text-base font-semibold tracking-tight" style={{ color: 'var(--text)' }}>
           {imageName || 'Sem título'}
         </h1>

         {tags.length > 0 && (
           <div className="flex flex-wrap gap-2">
             {tags.map((tag) => (
               <span
                 key={tag}
                 className="rounded-full border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em]"
                 style={{ background: 'var(--panel-soft)', borderColor: 'var(--border)', color: 'var(--muted)' }}
               >
                 {tag}
               </span>
             ))}
           </div>
         )}

         <div className="flex items-center justify-between text-xs" style={{ color: 'var(--muted)' }}>
           <span>{uploadDate || 'Data desconhecida'}</span>
           <span className="rounded border px-2 py-0.5 font-mono" style={{ background: 'var(--panel-soft)', borderColor: 'var(--border)', color: 'var(--text)' }}>
             {formatBytes(Number(imageSize))}
           </span>
         </div>
       </div>
     </div>
   </div>
 )
}

function formatBytes(bytes: number = 0, decimals: number = 2): string {
 if (bytes === 0) return '0 Bytes'

 const k = 1024
 const dm = decimals < 0 ? 0 : decimals
 const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
 const absBytes = Math.abs(bytes)

 const i = Math.min(Math.floor(Math.log(absBytes) / Math.log(k)), sizes.length - 1)
 const formattedValue = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))

 return `${formattedValue} ${sizes[i]}`
}