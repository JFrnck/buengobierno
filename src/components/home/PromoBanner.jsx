import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react'; 

const IMAGES = [
  '/comunicados/comunicado-17.jpg',
  '/comunicados/comunicado-18.jpg',
  // Puedes agregar más imágenes aquí
];

// Distancia mínima en píxeles para que se considere un "swipe" válido
const MIN_SWIPE_DISTANCE = 50; 

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Estados para capturar las coordenadas del toque en la pantalla
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  
  useEffect(() => {
    if (!isVisible || IMAGES.length <= 1) return;

    const intervalID = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    }, 5000);

    return () => clearInterval(intervalID);
  }, [isVisible, currentIndex]); // Agregamos currentIndex para que el timer se reinicie si el usuario desliza manualmente

  if (!isVisible) return null;

  // --- LÓGICA TÁCTIL (SWIPE) ---
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(0); // Reiniciamos el end al iniciar un nuevo toque
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

    if (isLeftSwipe) {
      // Deslizó hacia la izquierda -> Siguiente imagen
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    } else if (isRightSwipe) {
      // Deslizó hacia la derecha -> Imagen anterior
      setCurrentIndex((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
    }

    // Reiniciamos los valores
    setTouchStartX(0);
    setTouchEndX(0);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 sm:p-6 backdrop-blur-sm transition-opacity">
      
      <div className="relative w-full max-w-3xl bg-transparent rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
        
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 z-20 flex items-center justify-center p-2 rounded-full bg-black/60 hover:bg-red-600 text-white focus:outline-none transition-colors duration-200"
          aria-label="Cerrar anuncio"
        >
          <X className="h-6 w-6" strokeWidth={2.5} />
        </button>

        <a href="/plan-de-gobierno" className="block w-full cursor-pointer relative overflow-hidden">
          
          {/* Aquí agregamos los eventos onTouch */}
          <div 
            className="flex transition-transform duration-500 ease-in-out w-full items-center"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {IMAGES.map((src, index) => (
              <div key={index} className="w-full flex-shrink-0 flex justify-center items-center">
                {/* Agregamos pointer-events-none a la imagen para que no interfiera con el arrastre en algunos navegadores móviles */}
                <img className="w-[80%] rounded-md object-contain pointer-events-none" src={src} alt={`Comunicado ${index + 1}`} />
              </div>
            ))}
          </div>
        </a>

        {IMAGES.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Ir a la imagen ${idx + 1}`}
              />
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default PromoBanner;