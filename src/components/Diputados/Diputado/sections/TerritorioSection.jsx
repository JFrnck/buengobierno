import React, { useState, useEffect } from 'react';
import { Map } from 'lucide-react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function TerritorioSection({ territorio }) {
  const [sanMartinGeoJSON, setSanMartinGeoJSON] = useState(null);
  
  // Nuevo estado para saber si el cursor está sobre el mapa
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchSanMartin = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/juaneladio/peru-geojson/master/peru_departamental_simple.geojson');
        if (!response.ok) throw new Error("No se pudo cargar el GeoJSON");
        
        const data = await response.json();

        const sanMartinFeature = data.features.find(
          (feature) => feature.properties.NOMBDEP === 'SAN MARTIN'
        );

        if (sanMartinFeature) {
          setSanMartinGeoJSON(sanMartinFeature);
        }
      } catch (error) {
        console.error("Error al cargar la silueta de San Martín:", error);
      }
    };

    fetchSanMartin();
  }, []);

  if (!territorio) return null;

  const sanMartinPosition = [-7.0, -76.5];

  // 1. Estilo base (Blanco normal)
  const baseStyle = {
    fillColor: '#ffffff',
    fillOpacity: 1,
    color: '#0D1B2A',
    weight: 2,
    className: 'transition-all duration-300 cursor-pointer outline-none'
  };

  // 2. Estilo al pasar el cursor (Rojo de la bandera / campaña. Si prefieres verde usa: '#008A3D')
  const hoverStyle = {
    fillColor: '#D72638', 
    fillOpacity: 1,
    color: '#0D1B2A',
    weight: 3, // Borde ligeramente más grueso al hacer hover
  };

  // 3. Función para inyectar los eventos de hover al GeoJSON
  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        setIsHovered(true); // Activa el fondo del logo
        e.target.setStyle(hoverStyle); // Cambia el color del mapa
      },
      mouseout: (e) => {
        setIsHovered(false); // Oculta el fondo del logo
        e.target.setStyle(baseStyle); // Regresa al color original
      }
    });
  };

  return (
    <section className="py-16 bg-[#F5C800] text-[#0D1B2A] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          {/* ── COLUMNA IZQUIERDA: Texto y Estadísticas ── */}
          <div className="w-full space-y-10 z-10 relative">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0D1B2A]/10 mb-2">
                <Map size={32} className="text-[#D72638]" /> 
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0D1B2A] leading-tight">
                {territorio.nombre}
              </h2>
              <p className="text-[#0D1B2A]/80 text-lg md:text-xl leading-relaxed font-medium max-w-lg">
                {territorio.descripcion}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
              {territorio.estadisticas.map((stat, i) => (
                <div key={i} className="bg-white border border-[#0D1B2A] rounded-2xl p-4 md:p-6 text-center shadow-sm">
                  <p className="text-3xl md:text-3xl font-black text-[#D72638] mb-1 md:mb-2">{stat.valor}</p>
                  <p className="text-xs md:text-sm font-bold text-[#0D1B2A]/70 uppercase tracking-wider">{stat.etiqueta}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── COLUMNA DERECHA: Mapa Interactivo y Fondo Dinámico ── */}
          <div className="w-full h-[400px] md:h-[600px] relative flex items-center justify-center">
            
            {/* Imagen de fondo (Logo) que aparece al hacer hover en el mapa */}
            <div 
              className="absolute inset-0 bg-no-repeat bg-center bg-contain transition-all duration-500 ease-in-out z-0"
              style={{ 
                backgroundImage: `url('/logo-sol-pbg.png')`,
                opacity: isHovered ? 0.6 : 0, // Se hace visible (20% opacidad) al hacer hover
                transform: isHovered ? 'scale(1.05)' : 'scale(0.95)' // Pequeño efecto de zoom
              }}
            />

            {sanMartinGeoJSON ? (
              <MapContainer 
                center={sanMartinPosition} 
                zoom={6.5} 
                zoomControl={false}
                dragging={false}
                attributionControl={false}
                touchZoom={false}
                doubleClickZoom={false}
                scrollWheelZoom={false}
                boxZoom={false}
                keyboard={false}
                className="w-full h-full outline-none relative z-10" 
                style={{ background: 'transparent' }} 
                >
                <GeoJSON 
                    data={sanMartinGeoJSON} 
                    style={baseStyle} 
                    onEachFeature={onEachFeature} // <--- Inyectamos la interactividad aquí
                />
            </MapContainer>
            ) : (
              <div className="animate-pulse flex flex-col items-center justify-center opacity-50 relative z-10">
                <Map size={48} className="text-[#0D1B2A] mb-4" />
                <p className="text-sm font-bold uppercase tracking-widest text-[#0D1B2A]">Cargando mapa...</p>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}