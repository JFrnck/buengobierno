import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Importamos el icono
import diputadosData from '../../../data/diputados.json';

// Secciones
import HeroSection from './sections/HeroSection';
import BiografiaSection from './sections/BiografiaSection';
import PropuestasSection from './sections/PropuestasSection';
import TerritorioSection from './sections/TerritorioSection';
import MultimediaSection from './sections/MultimediaSection';
import FooterSection from './sections/FooterSection';

export default function DiputadoPage() {
  const { slug } = useParams();
  
  // Scrollear al inicio al cargar la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const diputado = diputadosData.find(d => d.slug === slug);

  if (!diputado) {
    return <Navigate to="/diputados" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative">
      <HeroSection candidato={diputado} />
      <BiografiaSection biografia={diputado.biografia} nombre={`${diputado.nombre} ${diputado.apellidoHighlighted}`} />
      <TerritorioSection territorio={diputado.territorio} />
      <PropuestasSection propuestas={diputado.propuestas} />
      <MultimediaSection multimedia={diputado.multimedia} />
      <FooterSection candidato={diputado} />

      {/* ── BOTÓN FLOTANTE: REGRESAR A CASA ── */}
      <Link
        to="/diputados"
        className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-50 flex items-center gap-2 bg-[#0D1B2A] text-white px-5 py-3 md:px-6 md:py-3.5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:bg-[#D72638] hover:-translate-y-1 transition-all duration-300 font-bold border border-white/10 group"
      >
        <ArrowLeft size={20} className="transition-transform duration-300 group-hover:-translate-x-1" />
        <span className="text-sm md:text-base tracking-wide">Regresar a casa</span>
      </Link>
    </div>
  );
}