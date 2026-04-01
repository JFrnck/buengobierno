import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <HeroSection candidato={diputado} />
      <BiografiaSection biografia={diputado.biografia} nombre={`${diputado.nombre} ${diputado.apellidoHighlighted}`} />
      <TerritorioSection territorio={diputado.territorio} />
      <PropuestasSection propuestas={diputado.propuestas} />
      <MultimediaSection multimedia={diputado.multimedia} />
      <FooterSection candidato={diputado} />
    </div>
  );
}