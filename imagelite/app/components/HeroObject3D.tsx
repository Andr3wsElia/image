'use client'
import React from 'react'

export const HeroObject3D: React.FC = () => {
  return (
    <div className="relative w-full h-[400px] lg:h-[450px] flex items-center justify-center overflow-hidden rounded-none bg-gradient-to-b from-zinc-950 via-zinc-900/90 to-black border border-white/15 shadow-2xl group">
      {/* Cantos Estilo HUD */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/50 m-3 z-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/50 m-3 z-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/50 m-3 z-20 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/50 m-3 z-20 pointer-events-none"></div>

      {/* Background HUD Grid */}
      <div className="absolute inset-0 bg-hud-grid opacity-40" />

      {/* Anéis Orbitais de Telemetria (também sem arredondamento nas formas gerais, mantendo a geometria limpa) */}
      <div className="absolute w-[280px] h-[280px] rounded-none border border-white/10 animate-[spin_20s_linear_infinite]" />
      <div className="absolute w-[200px] h-[200px] rounded-none border border-dashed border-white/15 animate-[spin_15s_linear_infinite_reverse]" />

      {/* Cubo 3D Estilizado - Sem Nenhum Texto e Totalmente Reto */}
      <div className="relative w-32 h-32 z-10" style={{ perspective: '1000px' }}>
        <div className="w-full h-full relative animate-cube group-hover:scale-110 transition-transform duration-700" style={{ transformStyle: 'preserve-3d' }}>
          
          <div className="absolute inset-0 bg-black border border-white/40 shadow-[0_0_25px_rgba(255,255,255,0.15)] rounded-none" style={{ transform: 'translateZ(64px)' }} />
          <div className="absolute inset-0 bg-black border border-white/40 rounded-none" style={{ transform: 'rotateY(180deg) translateZ(64px)' }} />
          <div className="absolute inset-0 bg-black border border-white/40 rounded-none" style={{ transform: 'rotateY(-90deg) translateZ(64px)' }} />
          <div className="absolute inset-0 bg-black border border-white/40 rounded-none" style={{ transform: 'rotateY(90deg) translateZ(64px)' }} />
          <div className="absolute inset-0 bg-black border border-white/40 rounded-none" style={{ transform: 'rotateX(90deg) translateZ(64px)' }} />
          <div className="absolute inset-0 bg-black border border-white/40 rounded-none" style={{ transform: 'rotateX(-90deg) translateZ(64px)' }} />
        </div>
      </div>

      {/* Badges de Telemetria Flutuantes */}
      <div className="absolute top-4 left-4 px-2.5 py-1 rounded-none bg-black/85 border border-white/15 text-[10px] font-mono text-zinc-400 backdrop-blur-md z-20">
        RENDER: 3D_CORE
      </div>
      <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-none bg-black/85 border border-white/15 text-[10px] font-mono text-zinc-400 backdrop-blur-md z-20">
        FPS: 60 // STABLE
      </div>
    </div>
  )
}