import React from 'react';
import { Camera } from 'lucide-react';

export default function BiografiaSection({ biografia }) {
  // Evaluamos si el arreglo de galería existe y tiene al menos un elemento
  const hasGaleria = biografia.galeria && biografia.galeria.length > 0;

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        {/* Cambiamos entre Grid (2 columnas) o Flex centrado dependiendo de hasGaleria */}
        <div className={`max-w-7xl mx-auto ${hasGaleria ? 'grid lg:grid-cols-12 gap-16 items-start' : 'flex justify-center'}`}>
          
          {/* Texto Biográfico */}
          {/* Si hay galería ocupa 7 columnas, si no, toma un ancho máximo centrado */}
          {/* Eliminamos max-w-4xl para que el texto se extienda a lo ancho */}
          <div className={`${hasGaleria ? 'lg:col-span-7' : 'w-[60%]'} space-y-8`}>
            
            {/* Centramos los títulos si no hay galería */}
            <div className={hasGaleria ? '' : 'text-center'}>
              <span className="inline-block py-1 px-3 rounded-md bg-[#0D1B2A]/5 text-[#D72638] font-bold tracking-[0.2em] text-xs uppercase mb-4">
                {biografia.titulo}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#D72638] leading-tight">
                {biografia.subtitulo}
              </h2>
            </div>
            
            {/* Centramos los párrafos si no hay galería */}
            <div className={`prose prose-lg text-gray-600 space-y-6 ${hasGaleria ? '' : ' mx-auto'}`}>
              {biografia.historia.map((parrafo, index) => (
                <p key={index} className="leading-relaxed">{parrafo}</p>
              ))}
            </div>
          </div>

          {/* Galería Fotográfica Lateral (Renderizado Condicional) */}
          {hasGaleria && (
            <div className="lg:col-span-5 sticky top-24">
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#D72638] rounded-xl flex items-center justify-center shadow-lg shadow-[#D72638]/30">
                  <Camera className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-black text-[#0D1B2A]">En el campo</h3>
              </div>

              {/* Cuadrícula de imágenes estilo Bento */}
              <div className="grid grid-cols-2 gap-4">
                {biografia.galeria.map((fotoObj, index) => {
                  const imageUrl = Object.values(fotoObj)[0];
                  const isFirst = index === 0;

                  return (
                    <div 
                      key={index} 
                      className={`relative overflow-hidden rounded-3xl shadow-md group ${
                        isFirst ? 'col-span-2 aspect-[4/3]' : 'col-span-1 aspect-square'
                      }`}
                    >
                      <img 
                        src={imageUrl} 
                        alt={`Fotografía biográfica ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-[#0D1B2A]/10 group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>
                  );
                })}
              </div>
              
            </div>
          )}

        </div>
      </div>
    </section>
  );
}