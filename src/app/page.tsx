'use client';

import Slides from './components/Slides';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#181F2B] to-[#0B1120] text-white relative overflow-hidden">
      {/* Carrusel superior */}
      <div className="w-full mt-4">
        <Slides />
      </div>

      {/* Hero principal */}
      <div className="flex flex-row items-center justify-center w-full max-w-5xl mx-auto py-12 relative z-10">
        {/* Rocket a la izquierda */}
        <img
          src="/assets/img/hero/rocket.png"
          alt="Rocket"
          className="w-70 h-70 object-contain -mt-8 mr-4"
          style={{ zIndex: 2 }}
        />
        {/* Texto y botón centrados */}
        <div className="flex flex-col items-center justify-center flex-1 text-center">
          <h1 className="text-5xl font-bold mb-2 text-white">Diseña tu Futuro</h1>
          <h2 className="text-2xl font-semibold mb-6 text-gray-300">
            Responde, explora y encuentra tu vocación
          </h2>
          <button
            className="bg-[#F47B4B] hover:bg-[#e96a36] text-white font-bold py-3 px-8 rounded-xl text-lg shadow-lg transition cursor-pointer"
            onClick={() => router.push('/questionnaire')}
          >
            Comienza a conocerte
          </button>
        </div>
      </div>

      {/* Carrusel inferior */}
      <div className="w-full mt-4">
        <Slides reverse />
      </div>

      {/* Fondo decorativo opcional */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Puedes agregar aquí SVGs, imágenes de fondo, etc. */}
      </div>
    </main>
  );
}
