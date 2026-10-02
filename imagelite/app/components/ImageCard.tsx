import React from 'react'

interface ImageCardProps {
  imageUrl?: string;
  imageName?: string;
  imageSize?: string;
  uploadDate?: string;
  extension?: string;
} 

export const ImageCard: React.FC<ImageCardProps> = ({ imageName, imageUrl, imageSize, uploadDate, extension }) => {
  function downloadImage() {
    if (imageUrl) window.open(imageUrl, '_blank');
  }

  return (
    <div 
      onClick={downloadImage} 
      className="group relative bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:border-white/30 hover:shadow-2xl hover:shadow-zinc-900/50 hover:-translate-y-1.5"
    >
        <div className="relative h-56 w-full overflow-hidden bg-zinc-950">
          <img 
            src={imageUrl} 
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
            alt={imageName || "Thumbnail"} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          
          {extension && (
            <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md text-white border border-white/10 rounded-full">
              {extension}
            </span>
          )}
        </div>

        <div className="p-5 flex flex-col gap-2">
            <h1 className="text-base font-semibold text-white tracking-tight truncate">
              {imageName || 'Sem título'}
            </h1>
            
            <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>{uploadDate || 'Data desconhecida'}</span>
                <span className="font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  {formatBytes(Number(imageSize))}
                </span>
            </div>
        </div>
    </div>
  )
}

function formatBytes(bytes: number = 0, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const absBytes = Math.abs(bytes);

    const i = Math.min(
        Math.floor(Math.log(absBytes) / Math.log(k)),
        sizes.length - 1
    );

    const formattedValue = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedValue} ${sizes[i]}`;
}