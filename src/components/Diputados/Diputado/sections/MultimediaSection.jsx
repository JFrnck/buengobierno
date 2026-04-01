import React from 'react';
import { PlayCircle, Camera } from 'lucide-react';

export default function MultimediaSection({ multimedia }) {
  // Si no hay datos multimedia, o los arrays están vacíos, no renderizamos la sección
  if (!multimedia) return null;
  const { videos, galeria_fotos } = multimedia;
  
  if ((!videos || videos.length === 0) && (!galeria_fotos || galeria_fotos.length === 0)) {
    return null;
  }

  return (
    <section className="py-20 md:py-32 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-16">
          <p className="text-[#FF6B00] font-bold tracking-[0.2em] text-sm uppercase mb-4">
            Multimedia
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0D1B2A] leading-tight">
            La campaña en <span className="text-[#FF6B00]">acción</span>
          </h2>
        </div>
        
        {/* Sub-sección de Videos */}
        {videos && videos.length > 0 && (
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-[#0D1B2A] mb-8 flex items-center gap-3 justify-center md:justify-start">
              <PlayCircle className="text-[#FF6B00]" size={28} /> 
              Videos Destacados
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {videos.map(video => (
                <div key={video.id} className="bg-gray-50 rounded-3xl overflow-hidden shadow-sm border border-gray-100 group flex flex-col">
                  {/* Contenedor responsivo para el iframe de 16:9 */}
                  <div className="aspect-video w-full bg-gray-200 relative">
                    <iframe 
                      src={video.url_embed} 
                      title={video.titulo}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-6 flex-grow">
                    <p className="font-bold text-lg text-[#0D1B2A] leading-snug">{video.titulo}</p>
                    <p className="text-sm text-gray-500 mt-2 capitalize font-medium">{video.plataforma}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sub-sección de Galería de Fotos */}
        {galeria_fotos && galeria_fotos.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-[#0D1B2A] mb-8 flex items-center gap-3 justify-center md:justify-start">
              <Camera className="text-[#FF6B00]" size={28} /> 
              Galería Fotográfica
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {galeria_fotos.map((foto, index) => (
                <div key={index} className="aspect-square rounded-2xl overflow-hidden group relative bg-gray-100 shadow-sm border border-gray-200">
                  <img 
                    src={foto.url} 
                    alt={foto.alt} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay oscuro que aparece al hacer hover para mostrar la descripción */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/90 via-[#0D1B2A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <p className="text-white text-sm font-medium leading-tight">
                      {foto.alt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}