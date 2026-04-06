import React, { useState, useEffect, useRef } from 'react';
import { Map, MapPin, AlertTriangle, CheckCircle2, MousePointerClick } from 'lucide-react';
import { MapContainer, GeoJSON, useMap, Marker } from 'react-leaflet';
import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css';
import gsap from 'gsap';

// --- NUEVAS IMPORTACIONES PARA EL SWIPE ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

// ─── Sub-componente para centrar y encuadrar el mapa automáticamente ───
function FitBounds({ data }) {
  const map = useMap();
  useEffect(() => {
    if (data) {
      const bounds = L.geoJSON(data).getBounds();
      const isMobile = window.innerWidth < 768;
      map.fitBounds(bounds, { padding: isMobile ? [20, 20] : [50, 50] });
    }
  }, [data, map]);
  return null;
}

const createPulsingIcon = (isActive) => L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="relative flex h-7 w-7 items-center justify-center transition-transform duration-300 ${isActive ? 'scale-125 z-50' : 'scale-100 z-10'}">
          ${isActive 
            ? `<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D72638] opacity-75"></span>` 
            : `<span class="absolute inline-flex h-full w-full rounded-full bg-white/20"></span>`}
          <span class="relative inline-flex rounded-full h-5 w-5 border-2 border-[#0D1B2A] shadow-lg ${isActive ? 'bg-[#D72638]' : 'bg-white'}"></span>
        </div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14]
});

export default function TerritorioSection({ territorio }) {
  const [regionGeoJSON, setRegionGeoJSON] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const swiperRef = useRef(null);
  const sectionRef = useRef(null);

  // 1. Carga de GeoJSON (igual)
  useEffect(() => {
    const fetchRegion = async () => {
      if (!territorio?.mapa) return;
      try {
        const response = await fetch('https://raw.githubusercontent.com/juaneladio/peru-geojson/master/peru_departamental_simple.geojson');
        const data = await response.json();
        const regionSolicitada = territorio.mapa.toUpperCase();
        const regionFeature = data.features.find(f => f.properties.NOMBDEP === regionSolicitada);
        if (regionFeature) setRegionGeoJSON(regionFeature);
      } catch (error) { console.error(error); }
    };
    fetchRegion();
  }, [territorio]);

  // 2. Manejador de cambio de Slide
  const handleSlideChange = (swiper) => {
    setSelectedIndex(swiper.realIndex);
  };

  // 3. Sincronizar Mapa -> Swiper (Cuando haces click en un marcador)
  const goToIndex = (index) => {
    setSelectedIndex(index);
    setIsAutoPlaying(false);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  if (!territorio) return null;

  const baseStyle = {
    fillColor: '#1E293B', 
    fillOpacity: 0.8,
    color: '#334155', 
    weight: 2,
    className: 'outline-none pointer-events-none' 
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen lg:h-[100dvh] flex items-center py-12 lg:py-0 bg-[#F5C800] text-[#0D1B2A] overflow-hidden">
      
      <div className="container mx-auto px-4 relative z-10 w-full max-w-[90rem]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* ── COLUMNA IZQUIERDA ── */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
            
            <div className="space-y-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D72638] text-white font-bold uppercase text-[10px] shadow-md">
                <AlertTriangle size={14} /> Radar de Problemáticas
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-[#0D1B2A] tracking-tighter">
                {territorio.nombre}
              </h2>
            </div>

            {/* ── SWIPER DE CONTENIDO (TOUCH) ── */}
            <div className="relative group">
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={handleSlideChange}
                autoplay={isAutoPlaying ? { delay: 8000, disableOnInteraction: true } : false}
                className="bg-white border border-[#0D1B2A]/10 rounded-3xl shadow-2xl overflow-hidden"
              >
                {territorio.puntos_criticos.map((punto) => (
                  <SwiperSlide key={punto.id} className="p-6 md:p-8 bg-white">
                    <div className="space-y-5">
                      <div className="flex items-center justify-between border-b border-[#0D1B2A]/10 pb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="text-[#D72638]" size={22} />
                          <h3 className="text-lg lg:text-xl font-black uppercase">{punto.zona}</h3>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <AlertTriangle className="text-[#D72638] shrink-0 mt-1" size={18} />
                        <div>
                          <p className="text-[10px] font-bold text-[#D72638] uppercase mb-0.5">El Problema</p>
                          <p className="text-[#0D1B2A] text-sm md:text-base font-semibold leading-tight">{punto.problema}</p>
                        </div>
                      </div>

                      <div className="bg-[#D72638] rounded-2xl p-4 shadow-lg">
                        <div className="flex items-start gap-3 text-white">
                          <CheckCircle2 className="shrink-0 mt-1" size={18} />
                          <div>
                            <p className="text-[10px] font-bold opacity-80 uppercase mb-0.5">Nuestra Solución</p>
                            <p className="text-sm md:text-base font-bold leading-snug">{punto.solucion}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Indicador de Swipe en Móvil */}
              <div className="lg:hidden flex justify-center mt-3 gap-1">
                {territorio.puntos_criticos.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all ${selectedIndex === i ? 'w-6 bg-[#D72638]' : 'w-2 bg-[#0D1B2A]/20'}`} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              {territorio.estadisticas.map((stat, i) => (
                <div key={i} className="border-l-4 border-[#D72638] pl-3 py-1 bg-white/30 rounded-r-md">
                  <p className="text-2xl font-black text-[#0D1B2A] leading-none">{stat.valor}</p>
                  <p className="text-[10px] font-bold text-[#0D1B2A]/70 uppercase mt-1">{stat.etiqueta}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── COLUMNA DERECHA: Mapa ── */}
          <div className="lg:col-span-7 h-[400px] lg:h-[80vh] rounded-3xl overflow-hidden border-4 border-[#0D1B2A] bg-[#0D1B2A] relative order-1 lg:order-2">
            {regionGeoJSON && (
              <MapContainer 
                center={[-9.19, -75.01]} 
                zoom={5} 
                zoomControl={false}
                dragging={false}
                touchZoom={false}
                scrollWheelZoom={false}
                className="w-full h-full"
                style={{ background: 'transparent' }}
              >
                <FitBounds data={regionGeoJSON} />
                <GeoJSON data={regionGeoJSON} style={baseStyle} />
                {territorio.puntos_criticos.map((punto, idx) => (
                  <Marker 
                    key={punto.id} 
                    position={[punto.lat, punto.lng]}
                    icon={createPulsingIcon(selectedIndex === idx)}
                    eventHandlers={{
                      click: () => goToIndex(idx)
                    }}
                  />
                ))}
              </MapContainer>
            )}
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[400] bg-[#0D1B2A]/90 text-white px-4 py-2 rounded-full text-[10px] font-bold flex items-center gap-2 border border-white/10 backdrop-blur-sm">
               <MousePointerClick size={12} className="text-[#F5C800]" />
               DESLIZA PARA EXPLORAR ZONAS
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}