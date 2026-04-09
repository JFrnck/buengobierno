import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react'; 

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [bannerTime, setBannerTime] = useState(11)
  
  useEffect(() => {
    if (!isVisible) return ;
    const timeID = setTimeout(() => {
        setBannerTime( prev => (prev < 16 ? prev + 1 : 15) )
    }, 3000)

    return () => clearTimeout(timeID)
  }, [bannerTime])
  
   if (!isVisible) return null;

  return (
    // ¡AQUÍ ESTÁ EL CAMBIO! Pasamos de z-[100] a z-[9999] 
    // para aplastar cualquier z-index que tenga el Navbar
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 sm:p-6 backdrop-blur-sm transition-opacity">
      
      {/* Contenedor de la imagen */}
      <div className="relative w-full max-w-3xl bg-transparent rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
        
        {/* Botón flotante para cerrar */}
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 z-10 flex items-center justify-center p-2 rounded-full bg-black/60 hover:bg-red-600 text-white focus:outline-none transition-colors duration-200"
          aria-label="Cerrar anuncio"
        >
          <X className="h-6 w-6" strokeWidth={2.5} />
        </button>

        {/* Enlace e Imagen */}
          <a href="/plan-de-gobierno" className="flex justify-center items-center w-full cursor-pointer">
            <img className='w-[80%]' src={`/comunicados/comunicado-${bannerTime}.jpg`} />
            {/* <img className='w-[80%]' src={`/comunicados/comunicado-15.jpg`} /> */}
          </a>
      </div>
    </div>
  );
};

export default PromoBanner;