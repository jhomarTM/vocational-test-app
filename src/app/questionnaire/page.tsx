'use client';

import { useRouter } from 'next/navigation'

export default function Questionnaire() {
    const router = useRouter();

    const handleContinue = () => {
    router.push('/vocational-test');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Cuestionario del usuario</h2>
        <p className="mb-8">Aquí irán las 5 preguntas respecto del usuario :3</p>
        <button
          onClick={handleContinue}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 cursor-pointer"
        >
          Continuar
        </button>
      </div>
    </main>
  );
}
