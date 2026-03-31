import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

// Importamos los componentes que extrajimos anteriormente
import HeroSection from '../Diputado/sections/HeroSection';
import BiografiaSection from '../Diputado/sections/BiografiaSection';
import PropuestasSection from '../Diputado/sections/PropuestasSection';
import FooterSection from '../Diputado/sections/FooterSection';

export default function DiputadoPage() {
  // Extraemos el parámetro dinámico de la URL
  const { slug } = useParams();
  const [diputadoInfo, setDiputadoInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí normalmente harías una petición a tu backend o filtrarías un JSON local
    // Ejemplo simulado: fetch(`/api/diputados/${slug}`)
    
    // Simulamos la carga de datos basados en el slug
    const fetchDatos = async () => {
      // Simulando una base de datos local
      const db = {
        "jehu-pezo": {
          nombre: "Jehú Pezo",
          profesion: "Ingeniero Civil",
          bio: "Nacido en...",
          // ... más datos
        },
        "ricardo-mendez": {
          nombre: "Ricardo Méndez",
          profesion: "Abogado",
          bio: "Nacido y criado en...",
          // ... más datos
        }
      };

      setDiputadoInfo(db[slug]);
      setLoading(false);
    };

    fetchDatos();
  }, [slug]); // Se vuelve a ejecutar si el slug cambia

  if (loading) return <div className="pt-24 text-center">Cargando perfil...</div>;
  
  // Si el usuario pone un slug que no existe (ej: /diputados/candidato-falso)
  if (!diputadoInfo) return <Navigate to="/diputados" replace />;

  return (
    <div className="diputado-layout">
      {/* OJO: Para que estos componentes sean 100% dinámicos, 
        tendrás que modificarlos para que acepten "props" 
        en lugar de tener el texto de "Ricardo Méndez" en duro (hardcoded).
      */}
      <HeroSection candidato={diputadoInfo} />
      <BiografiaSection candidato={diputadoInfo} />
      <PropuestasSection propuestas={diputadoInfo.propuestas} />
      <FooterSection candidato={diputadoInfo} />
    </div>
  );
}