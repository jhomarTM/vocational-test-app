'use client';

import SlideShow from '../components/SlideShow';
import slides from '../data/slides.json';

export default function VocationalTest() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#181C2A] to-[#232946] text-white relative overflow-hidden">
      {/* Círculos decorativos de ndo */}
      <div className="absolute left-[-200px] top-[-200px] w-[600px] h-[600px] bg-gradient-to-br from-[#3A3F5A] to-transparent rounded-full opacity-30 z-0" />
      <div className="absolute right-[-150px] bottom-[-150px] w-[400px] h-[400px] bg-gradient-to-tr from-[#FFB86B] to-transparent rounded-full opacity-20 z-0" />
      {/* Slide superior */}
      <div className="w-full max-w-6xl z-10">
        <SlideShow items={slides.carreras} />
      </div>
      {/* Sección central */}
      <section className="relative flex flex-col items-center justify-center py-12 z-10 w-full">
        {/* Cohete decorativo (puedes reemplazar el SVG por una imagen real en public/rocket.svg) */}
        <div className="absolute left-1/4 top-[-60px] md:left-24 md:top-[-40px] w-40 h-40 md:w-56 md:h-56 rotate-[-20deg] pointer-events-none select-none">
          {/* TODO: Reemplaza este SVG por tu imagen real en public/rocket.svg si la tienes */}
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="160" cy="180" rx="18" ry="8" fill="#FFB86B" opacity="0.7"/>
            <path d="M60 160 L100 40 Q110 20 130 40 L170 160 Z" fill="#B8C1EC" stroke="#232946" strokeWidth="4"/>
            <circle cx="120" cy="70" r="12" fill="#232946" stroke="#B8C1EC" strokeWidth="4"/>
            <rect x="110" y="120" width="20" height="40" rx="10" fill="#FFB86B" stroke="#232946" strokeWidth="4"/>
            <circle cx="120" cy="170" r="8" fill="#FFB86B" stroke="#232946" strokeWidth="3"/>
            <circle cx="120" cy="170" r="3" fill="#fff"/>
            <ellipse cx="120" cy="160" rx="6" ry="2" fill="#fff" opacity="0.5"/>
          </svg>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-lg">Diseña tu Futuro</h2>
        <p className="text-lg md:text-2xl font-medium text-[#B8C1EC] mb-6 drop-shadow">Responde, explora y encuentra tu vocación</p>
        <button className="bg-[#FF6F3C] hover:bg-[#FF9A3C] transition-colors text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg">Comienza a conocerte</button>
      </section>
      {/* Slide inferior */}
      <div className="w-full max-w-6xl z-10">
        <SlideShow items={slides.carreras} reverse />
      </div>
    </main>
  );
}

