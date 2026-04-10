import React, { useState } from 'react';
import { MapPin, Navigation, Calendar, Clock, LocateFixed, Sun, Music, Users } from 'lucide-react';

export default function BannerCierreCampana() {
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('idle');

  // Datos actualizados según el flyer
  const eventDetails = {
    candidate: "JORGE NIETO",
    title: "GRAN CIERRE DE CAMPAÑA",
    city: "LIMA",
    date: "JUE 09 ABRIL",
    time: "5:00 P.M.",
    locationName: "Av. Paseo Colón",
    address: "Paseo Colón, Cercado de Lima, Lima",
    artists: "Mojarras, Hnos Yaipén, Qori Nka",
    query: "Paseo Colón, Lima, Perú"
  };

  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta la geolocalización.");
      return;
    }
    setLocationStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationStatus('success');
      },
      (error) => {
        console.error("Error al obtener la ubicación", error);
        setLocationStatus('error');
      }
    );
  };

  // URLs de Google Maps
  let mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(eventDetails.query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  if (userLocation) {
    mapEmbedUrl = `https://maps.google.com/maps?saddr=${userLocation.lat},${userLocation.lng}&daddr=${encodeURIComponent(eventDetails.query)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  }
  
  const directionsUrl = userLocation 
    ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${encodeURIComponent(eventDetails.query)}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(eventDetails.query)}`;

  return (
    <section className="w-full bg-yellow-400 border-b-8 border-red-600 font-sans mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        
        {/* Columna Izquierda: Información de la Campaña (Mobile First) */}
        <div className="w-full lg:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          
          {/* Logo / Lema */}
          <div className="flex items-center gap-2 mb-4">
            <Sun className="text-red-600" size={32} strokeWidth={2.5} />
            <span className="text-red-600 font-black text-xl tracking-tight uppercase leading-none">
              Buen<br/>Gobierno
            </span>
          </div>

          {/* Titulares Principales */}
          <h2 className="text-black font-black text-6xl md:text-8xl tracking-tighter leading-none mb-2 uppercase">
            {eventDetails.candidate}
          </h2>
          <h1 className="text-black font-extrabold text-2xl md:text-4xl uppercase tracking-tight mb-1">
            {eventDetails.title}
          </h1>
          <h3 className="text-white font-black text-5xl md:text-6xl tracking-tighter drop-shadow-md mb-8 uppercase">
            {eventDetails.city}
          </h3>

          {/* Tarjetas de Información (Blanco Terciario) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl border-l-8 border-red-600 shadow-lg flex items-center gap-4">
              <Calendar className="text-red-600" size={32} />
              <div>
                <p className="text-red-600 font-bold text-sm uppercase">Día del Evento</p>
                <p className="text-black font-black text-xl uppercase">{eventDetails.date}</p>
                <p className="text-slate-600 font-bold flex items-center gap-1 mt-1">
                  <Clock size={16} /> {eventDetails.time}
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border-l-8 border-black shadow-lg flex items-center gap-4">
              <MapPin className="text-black" size={32} />
              <div>
                <p className="text-black font-bold text-sm uppercase">Lugar de Encuentro</p>
                <p className="text-black font-black text-xl uppercase">{eventDetails.locationName}</p>
                <p className="text-slate-600 font-medium text-sm mt-1 leading-tight">{eventDetails.address}</p>
              </div>
            </div>
          </div>

          {/* Artistas */}
          <div className="bg-black text-white p-4 rounded-xl flex items-center gap-3 shadow-xl">
            <Music className="text-yellow-400 shrink-0" size={28} />
            <div>
              <p className="text-yellow-400 font-bold text-xs uppercase tracking-wider mb-0.5">Artistas Invitados</p>
              <p className="font-extrabold text-lg leading-tight">{eventDetails.artists}</p>
            </div>
          </div>

        </div>

        {/* Columna Derecha: Mapa y Ruteo */}
        <div className="w-full lg:w-1/2 bg-white/10 p-6 md:p-10 flex flex-col justify-center backdrop-blur-sm">
          
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white flex flex-col h-full min-h-[450px] relative">
            
            {/* Cabecera del Mapa */}
            <div className="bg-red-600 p-4 flex justify-between items-center z-10 shadow-md">
              <div className="flex items-center gap-2 text-white">
                <Navigation size={20} className="animate-pulse" />
                <h3 className="font-black tracking-wide uppercase text-lg">¿Cómo llegar?</h3>
              </div>
              {locationStatus === 'success' && (
                <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Ruta Activa
                </span>
              )}
            </div>

            {/* Iframe del Mapa */}
            <div className="flex-grow relative bg-slate-200">
              <iframe
                title="Mapa del evento"
                src={mapEmbedUrl}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Mensaje que incita a pulsar (solo visible inicialmente) */}
              {locationStatus === 'idle' && (
                <div className="absolute bottom-[5rem] right-4 animate-bounce bg-black text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-2xl pointer-events-none z-20">
                  ¡Pulsa aquí para ver <span className="text-yellow-400">cómo llegar!</span>
                  {/* Triángulo apuntando hacia abajo */}
                  <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-black"></div>
                </div>
              )}

              {/* Botón Flotante para Ubicación */}
              <button 
                onClick={requestUserLocation}
                disabled={locationStatus === 'loading'}
                className={`absolute bottom-4 right-4 p-4 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.2)] border-2 transition-all flex items-center justify-center
                  ${locationStatus === 'success' 
                    ? 'bg-yellow-400 border-yellow-500 text-black' 
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-black hover:text-red-600'
                  }
                `}
                title="Usar mi ubicación actual"
              >
                {locationStatus === 'loading' ? (
                  <span className="animate-spin w-6 h-6 border-4 border-red-600 border-t-transparent rounded-full"></span>
                ) : (
                  <LocateFixed size={26} strokeWidth={2.5} />
                )}
              </button>
            </div>

            {/* Botón de Acción Principal (Footer del mapa) */}
            <div className="p-4 bg-white border-t border-slate-100 z-10">
              {locationStatus === 'error' && (
                <p className="text-red-600 text-xs font-bold mb-3 text-center bg-red-50 p-2 rounded-lg">
                  Activa el GPS/Ubicación en tu navegador para ver la ruta.
                </p>
              )}
              
              <a 
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white py-4 px-6 rounded-xl font-black text-xl uppercase tracking-wide transition-all transform hover:scale-[1.02] shadow-lg shadow-red-600/40"
              >
                <Navigation size={24} />
                Iniciar Ruta Guiada
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}