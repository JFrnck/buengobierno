import React from 'react';
import * as Icons from 'lucide-react';

export default function PropuestasSection({ propuestas }) {
  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-[#D72638] font-bold tracking-[0.2em] text-sm uppercase mb-4">
            El Plan de Acción
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0D1B2A] leading-tight">
            Propuestas que <span className="text-[#D72638]">mejorarán el Perú</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {propuestas.map((p, index) => {
            const IconComp = Icons[p.icon] || Icons.CheckCircle;
            return (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#D72638]/10 flex items-center justify-center">
                    <IconComp size={28} className="text-[#D72638]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0D1B2A] leading-tight">{p.titulo}</h3>
                </div>
                
                <div className="space-y-4 flex-grow">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-sm font-bold text-[#D72638] uppercase tracking-wider mb-2">¿Qué proponemos?</p>
                    <p className="text-gray-700 leading-relaxed">{p.que_proponemos}</p>
                  </div>
                  <div className="p-4 border-l-4 border-[#0D1B2A]">
                    <p className="text-sm font-bold text-[#0D1B2A] uppercase tracking-wider mb-2">¿Cómo mejorará el Perú?</p>
                    <p className="text-gray-700 leading-relaxed">{p.como_mejorara}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}