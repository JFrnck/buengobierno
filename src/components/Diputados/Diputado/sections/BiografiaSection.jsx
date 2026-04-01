import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function BiografiaSection({ biografia, nombre }) {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-16 items-start">
          
          <div className="lg:col-span-2">
            <p className="text-[#FF6B00] font-bold tracking-[0.2em] text-sm uppercase mb-4">
              {biografia.titulo}
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-[#0D1B2A] leading-tight mb-8">
              {biografia.subtitulo}
            </h2>
            
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              {biografia.historia.map((parrafo, index) => (
                <p key={index}>{parrafo}</p>
              ))}
            </div>
          </div>

          {/* Línea de tiempo académica */}
          {biografia.hitos_academicos && biografia.hitos_academicos.length > 0 && (
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm sticky top-24">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[#0D1B2A] rounded-xl flex items-center justify-center">
                  <GraduationCap className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-[#0D1B2A]">Formación</h3>
              </div>
              
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                {biografia.hitos_academicos.map((hito, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#FF6B00] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <time className="text-sm font-bold text-[#FF6B00]">{hito.anio}</time>
                      <p className="font-bold text-[#0D1B2A] mt-1">{hito.titulo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}