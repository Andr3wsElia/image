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
     className="group relative backdrop-blur-md border rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1.5"
     style={{ background: 'var(--panel)', borderColor: 'var(--border)', boxShadow: '0 16px 40px rgba(0,0,0,0.06)' }}
    >
       <div className="relative h-56 w-full overflow-hidden" style={{ background: 'var(--bg)' }}>
          <img 
            src={imageUrl} 
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
            alt={imageName || "Thumbnail"} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
           
          {extension && (
            <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase backdrop-blur-md border rounded-full" style={{ background: 'rgba(0,0,0,0.6)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.12)' }}>
              {extension}
            </span>
          )}
        </div>

        <div className="p-5 flex flex-col gap-2">
            <h1 className="text-base font-semibold tracking-tight truncate" style={{ color: 'var(--text)' }}>
              {imageName || 'Sem título'}
            </h1>
             
            <div className="flex items-center justify-between text-xs" style={{ color: 'var(--muted)' }}>
                <span>{uploadDate || 'Data desconhecida'}</span>
                <span className="font-mono px-2 py-0.5 rounded border" style={{ background: 'var(--panel-soft)', borderColor: 'var(--border)', color: 'var(--text)' }}>
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