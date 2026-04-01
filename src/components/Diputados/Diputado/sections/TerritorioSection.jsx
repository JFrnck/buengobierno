import React, { useState, useEffect } from 'react';
import { Map } from 'lucide-react';
import { MapContainer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet'; // Importamos Leaflet para el cálculo automático de límites
import 'leaflet/dist/leaflet.css';

// ─── Sub-componente para centrar el mapa automáticamente ───────────
function FitBounds({ data }) {
  const map = useMap();
  useEffect(() => {
    if (data) {
      // Calculamos los bordes exactos de la región geométrica
      const bounds = L.geoJSON(data).getBounds();
      // Le decimos al mapa que se adapte a esos bordes con un ligero margen (padding)
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [data, map]);
  return null;
}

export default function TerritorioSection({ territorio }) {
  const [regionGeoJSON, setRegionGeoJSON] = useState(null);
  
  // Nuevo estado para saber si el cursor está sobre el mapa
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchRegion = async () => {
      // Si no hay mapa definido en el JSON, no hacemos la petición
      if (!territorio?.mapa) return;

      try {
        const response = await fetch('https://raw.githubusercontent.com/juaneladio/peru-geojson/master/peru_departamental_simple.geojson');
        if (!response.ok) throw new Error("No se pudo cargar el GeoJSON");
        
        const data = await response.json();

        // 1. Convertimos el valor del JSON a mayúsculas por seguridad
        const regionSolicitada = territorio.mapa.toUpperCase();

        // 2. Filtramos el GeoJSON buscando específicamente la región solicitada
        const regionFeature = data.features.find(
          (feature) => feature.properties.NOMBDEP === regionSolicitada
        );

        if (regionFeature) {
          setRegionGeoJSON(regionFeature);
        } else {
          console.warn(`No se encontró la región: ${regionSolicitada} en el GeoJSON.`);
        }
      } catch (error) {
        console.error("Error al cargar la silueta de la región:", error);
      }
    };

    fetchRegion();
  }, [territorio]); // Se vuelve a ejecutar si el candidato/territorio cambia

  if (!territorio) return null;

  // Centro de Perú por defecto (solo como valor inicial rápido antes del auto-centrado)
  const defaultCenter = [-9.19, -75.01];

  // 1. Estilo base (Blanco normal)
  const baseStyle = {
    fillColor: '#ffffff',
    fillOpacity: 1,
    color: '#0D1B2A',
    weight: 2,
    className: 'transition-all duration-300 cursor-pointer outline-none'
  };

  // 2. Estilo al pasar el cursor
  const hoverStyle = {
    fillColor: '#D72638', 
    fillOpacity: 1,
    color: '#0D1B2A',
    weight: 3, 
  };

  // 3. Función para inyectar los eventos de hover al GeoJSON
  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        setIsHovered(true); 
        e.target.setStyle(hoverStyle); 
      },
      mouseout: (e) => {
        setIsHovered(false); 
        e.target.setStyle(baseStyle); 
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
                opacity: isHovered ? 0.6 : 0, 
                transform: isHovered ? 'scale(1.05)' : 'scale(0.95)' 
              }}
            />

            {regionGeoJSON ? (
              <MapContainer 
                // Añadimos key dinámica para forzar a Leaflet a reiniciar si cambias de región
                key={territorio.mapa} 
                center={defaultCenter} 
                zoom={5} 
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
                {/* Esto se encarga de encuadrar perfectamente la región automáticamente */}
                <FitBounds data={regionGeoJSON} />

                <GeoJSON 
                    data={regionGeoJSON} 
                    style={baseStyle} 
                    onEachFeature={onEachFeature} 
                />
              </MapContainer>
            ) : (
              <div className="animate-pulse flex flex-col items-center justify-center opacity-50 relative z-10">
                <Map size={48} className="text-[#0D1B2A] mb-4" />
                <p className="text-sm font-bold uppercase tracking-widest text-[#0D1B2A]">Cargando región...</p>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}