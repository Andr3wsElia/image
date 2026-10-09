'use client'
import React from 'react'

interface CubeLoaderProps {
  size?: 'sm' | 'md' | 'lg'
}

export const CubeLoader: React.FC<CubeLoaderProps> = ({ size = 'md' }) => {
  const sizeClass = size === 'sm' ? 'cube-loader--sm' : size === 'lg' ? 'cube-loader--lg' : ''

  return (
    <div className={`cube-loader ${sizeClass}`} aria-label="Carregando" role="status">
      <div className="cube-loader__stage">
        <div className="cube-face cube-front" />
        <div className="cube-face cube-back" />
        <div className="cube-face cube-right" />
        <div className="cube-face cube-left" />
        <div className="cube-face cube-top" />
        <div className="cube-face cube-bottom" />
      </div>
    </div>
  )
}

export const GalleryLoader: React.FC = () => {
  return (
    <div className="gallery-loader" aria-label="Carregando imagens" role="status">
      <div className="gallery-loader__cube">
        <span className="gallery-loader__face gallery-loader__face--front" />
        <span className="gallery-loader__face gallery-loader__face--back" />
        <span className="gallery-loader__face gallery-loader__face--right" />
        <span className="gallery-loader__face gallery-loader__face--left" />
        <span className="gallery-loader__face gallery-loader__face--top" />
        <span className="gallery-loader__face gallery-loader__face--bottom" />
      </div>
    </div>
  )
}

export const HeroObject3D: React.FC = () => {
  return (
    <div className="hero-scene group">
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 m-3 z-20 pointer-events-none" style={{ borderColor: 'var(--border)' }} />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 m-3 z-20 pointer-events-none" style={{ borderColor: 'var(--border)' }} />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 m-3 z-20 pointer-events-none" style={{ borderColor: 'var(--border)' }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 m-3 z-20 pointer-events-none" style={{ borderColor: 'var(--border)' }} />

      <div className="absolute inset-0 bg-hud-grid opacity-25" />

      <div className="absolute w-[280px] h-[280px] rounded-full border animate-[spin_20s_linear_infinite]" style={{ borderColor: 'var(--border)' }} />
      <div className="absolute w-[200px] h-[200px] rounded-full border border-dashed animate-[spin_15s_linear_infinite_reverse]" style={{ borderColor: 'var(--border)' }} />

      <div className="hero-cube z-10" style={{ width: '220px', height: '220px' }}>
        <div className="hero-cube__stage group-hover:scale-110 transition-transform duration-700" style={{ width: '220px', height: '220px' }}>
          <div className="cube-face cube-front" />
          <div className="cube-face cube-back" />
          <div className="cube-face cube-right" />
          <div className="cube-face cube-left" />
          <div className="cube-face cube-top" />
          <div className="cube-face cube-bottom" />
        </div>
      </div>

      <div className="absolute top-4 left-4 px-2.5 py-1 rounded-lg border text-[10px] font-mono backdrop-blur-md z-20" style={{ background: 'var(--panel)', borderColor: 'var(--border)', color: 'var(--text)' }}>
        RENDER: 3D_CORE
      </div>
      <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-lg border text-[10px] font-mono backdrop-blur-md z-20" style={{ background: 'var(--panel)', borderColor: 'var(--border)', color: 'var(--text)' }}>
        FPS: 60 // STABLE
      </div>
    </div>
  )
}