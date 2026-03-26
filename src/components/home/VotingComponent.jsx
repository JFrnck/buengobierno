import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

// Definimos los datos del partido único
const PARTY = { 
  name: 'PARTIDO DEL BUEN GOBIERNO', 
  color: '#000000', // Negro
  url: 'logo-sol-pbg.png' 
};

// Definimos los cargos a elegir
const CARGOS = [
  'Presidente',
  'Senador Nacional',
  'Senador Regional',
  'Diputado',
  'Parlamento Andino'
];

export default function StraightTicketVoting() {
  const [hasVoted, setHasVoted] = useState(false);
  
  // Referencias para animar múltiples elementos a la vez
  const boxesRef = useRef([]);
  const xMarksRef = useRef([]);

  const handleVote = () => {
    // Si ya votó, no repetimos la animación
    if (hasVoted) return;
    
    setHasVoted(true);

    const tl = gsap.timeline();

    // Animamos las 5 'X' apareciendo de golpe pero con un ligero retraso entre ellas (stagger)
    tl.fromTo(xMarksRef.current,
      { scale: 3, opacity: 0 },
      { 
        scale: 1, 
        opacity: 0.5, 
        duration: 1.5, 
        ease: 'back.out(1.5)', 
        stagger: 0.08 // Crea el efecto dominó
      }
    );

    // Hacemos que las 5 cajas reboten ligeramente al ser marcadas
    tl.to(boxesRef.current,
      { 
        scale: 1.05, 
        duration: 0.1, 
        yoyo: true, 
        repeat: 1, 
        stagger: 0.08 
      },
      "<" // Sincroniza el inicio de esta animación con la anterior
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5c800] p-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-6xl border border-gray-200">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight uppercase">
            Voto en Plancha
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Haz clic en cualquier casilla para votar por toda la lista del partido.
          </p>
        </div>

        {/* Contenedor principal de las opciones */}
        <div className="flex flex-wrap md:flex-nowrap items-start justify-center gap-6 md:gap-8">
          {CARGOS.map((cargo, index) => (
            /* Nuevo contenedor que agrupa la caja y el texto fuera de ella */
            <div key={index} className="flex flex-col items-center gap-4">
              
              {/* Caja interactiva (recuadro) */}
              <div
                ref={el => boxesRef.current[index] = el}
                onClick={handleVote}
                className={`relative flex flex-col items-center justify-center w-36 h-36 md:w-44 md:h-44 border-4 cursor-pointer transition-colors duration-300 shadow-sm overflow-hidden
                  ${hasVoted ? 'bg-red-50' : 'bg-white hover:bg-gray-50 hover:border-red-300'}
                `}
                style={{ 
                  borderColor: hasVoted ? PARTY.color : '#e5e7eb', // gray-200
                  borderRadius: '1rem' 
                }}
              >
                {/* Logo (ahora centrado totalmente al no tener el texto) */}
                <div className="w-20 h-20 md:w-24 md:h-24 pointer-events-none">
                  <img 
                    src={PARTY.url} 
                    alt={`${PARTY.name} Logo`} 
                    className="w-full h-full object-contain opacity-90 bg-[#f5c800]" 
                  />
                </div>

                {/* Marca 'X' (Ahora cubre todo el recuadro) */}
                <div
                  ref={el => xMarksRef.current[index] = el}
                  className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
                >
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="drop-shadow-md">
                    {/* Las líneas ahora van de esquina a esquina (0 a 100) */}
                    <line x1="0" y1="0" x2="100" y2="100" stroke={PARTY.color} strokeWidth="6" strokeLinecap="square" />
                    <line x1="100" y1="0" x2="0" y2="100" stroke={PARTY.color} strokeWidth="6" strokeLinecap="square" />
                  </svg>
                </div>
              </div>

              {/* Nombre del Cargo (Ahora fuera del recuadro) */}
              <p className="text-sm md:text-base font-bold text-gray-800 text-center uppercase tracking-tight leading-tight w-36 md:w-44">
                {cargo}
              </p>

            </div>
          ))}
        </div>

        {/* Mensaje de confirmación */}
        <div className={`mt-12 transition-opacity duration-500 ${hasVoted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center text-[#000000] font-bold text-lg bg-gray-100 p-4 rounded-xl border border-gray-300">
            ¡Has votado por la lista completa del {PARTY.name}!
          </div>
        </div>

      </div>
    </div>
  );
}