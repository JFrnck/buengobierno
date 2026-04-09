import React, { useRef, useState, useEffect } from 'react';
import { MapPin, Link } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
// 1. Importamos SplitText
import { SplitText } from 'gsap/SplitText';
// 2. Importamos el generador de QR
import { QRCodeSVG } from 'qrcode.react';

// Registramos el plugin
gsap.registerPlugin(SplitText);

// ─── Diccionario de Íconos de Redes Sociales ───────────────────────────────────
const SOCIAL_ICONS = {
  facebook: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47a2.78 2.78 0 0 0-1.95 1.95A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.5C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" stroke="none">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  )
};

export default function HeroSection({ candidato }) {
  const sectionRef     = useRef(null);
  
  // Refs para las animaciones iniciales
  const infoRef        = useRef(null);
  const titleRef       = useRef(null);
  const subtitleRef    = useRef(null);
  const socialRef      = useRef(null);
  const imageContainerRef = useRef(null);
  
  const marcaCardRef   = useRef(null);
  const escribeCardRef = useRef(null);
  const xPath1Ref      = useRef(null);
  const xPath2Ref      = useRef(null);
  const wipeMaskRef    = useRef(null);
  const numeroRef      = useRef(null);

  const [isFlipped, setIsFlipped] = useState(false);
  
  // Estado para capturar la URL actual y generar el QR dinámicamente
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // Nos aseguramos de que window exista (útil para Next.js / SSR)
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  useGSAP(() => {
    const splitTitle = new SplitText(titleRef.current, { type: "words,chars" });

    const ctx = gsap.context(() => {
      
      const initTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      initTl.fromTo(infoRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
      .from(splitTitle.chars, {
        opacity: 0,
        y: 40,
        rotationX: -90,
        stagger: 0.02, 
        duration: 0.8,
        ease: "back.out(1.5)"
      }, "-=0.4")
      .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .fromTo(socialRef.current?.children ? Array.from(socialRef.current.children) : [], 
        { opacity: 0, scale: 0 }, 
        { opacity: 1, scale: 1, stagger: 0.1, duration: 0.5, ease: "back.out(1.5)" }, 
        "-=0.6"
      )
      .fromTo(
        [imageContainerRef.current, marcaCardRef.current, escribeCardRef.current],
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.1, 
          ease: 'back.out(1.2)',
        },
        "-=0.8"
      );

      if (xPath1Ref.current && xPath2Ref.current && wipeMaskRef.current && numeroRef.current) {
        const BUFFER = 30; 
        const xLengths = [
          xPath1Ref.current.getTotalLength() + BUFFER,
          xPath2Ref.current.getTotalLength() + BUFFER
        ];

        const masterTl = gsap.timeline({ repeat: -1, delay: 2.0 });

        masterTl.set([xPath1Ref.current, xPath2Ref.current, numeroRef.current], { opacity: 0 });
        masterTl.set(wipeMaskRef.current, { xPercent: 0 }); 

        masterTl.set(xPath1Ref.current, { strokeDasharray: xLengths[0], strokeDashoffset: xLengths[0] });
        masterTl.set(xPath2Ref.current, { strokeDasharray: xLengths[1], strokeDashoffset: xLengths[1] });
        
        masterTl.to(numeroRef.current, { opacity: 1, duration: 0.01 }, 0.5);
        masterTl.to(xPath1Ref.current, { opacity: 1, duration: 0.01 }, 0.5);
        masterTl.to(xPath1Ref.current, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, 0.5);
        masterTl.to(wipeMaskRef.current, { xPercent: 100, duration: 1.6, ease: 'power2.inOut' }, 0.5);

        masterTl.to(xPath2Ref.current, { opacity: 1, duration: 0.01 }, 1.3);
        masterTl.to(xPath2Ref.current, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, 1.3);

        masterTl.to([xPath1Ref.current, xPath2Ref.current, numeroRef.current], {
          opacity: 0,
          duration: 0.8, 
          ease: 'power1.inOut'
        }, 7.0);
        
        masterTl.to(wipeMaskRef.current, {
           xPercent: 0,
           duration: 0.8,
           ease: 'power1.inOut'
        }, 7.0);

        masterTl.set([xPath1Ref.current, xPath2Ref.current], {
          strokeDashoffset: (i) => xLengths[i]
        }, 7.9);
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      splitTitle.revert();
    };
  }, []);

  let redesValidas = [];
  const datosRedes = candidato?.redes_sociales;

  if (Array.isArray(datosRedes)) {
    datosRedes.forEach(item => {
      if (typeof item === 'string') {
        redesValidas.push({ key: 'desconocida', url: item });
      } else if (typeof item === 'object' && item !== null) {
        Object.entries(item).forEach(([k, v]) => redesValidas.push({ key: k, url: v }));
      }
    });
  } else if (typeof datosRedes === 'object' && datosRedes !== null) {
    Object.entries(datosRedes).forEach(([k, v]) => redesValidas.push({ key: k, url: v }));
  }

  redesValidas = redesValidas.filter(r => r.url && typeof r.url === 'string' && r.url.trim() !== '');

  // Determinar qué URL irá en el QR (prioriza si envías una url específica por props, si no, usa la actual)
  const qrUrlValue = `https://partidodelbuengobierno.com/diputados/${candidato.slug}`;

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap');
          .font-number {
            font-family: 'Inter', sans-serif;
            letter-spacing: -0.05em;
          }
        `}
      </style>

      <section
        ref={sectionRef}
        className="bg-[#F5C800] text-[#0D1B2A] min-h-[110vh] flex items-center pb-20 overflow-hidden relative"
      >
        <div className="container mx-auto px-4 z-10 pt-10 md:pt-0">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-16 md:gap-12 items-center max-w-7xl mx-auto">

            {/* ── COLUMNA IZQUIERDA ─────────────────────────────────────────── */}
            <div className="contents md:flex md:flex-col md:order-1 space-y-0 md:space-y-8">
              
              <div ref={infoRef} className="order-1 md:order-none flex items-center gap-4" style={{ opacity: 0 }}>
                <img src={candidato.partido_logo} alt="Partido" className="w-16 h-16 object-contain" />
                <div>
                  <p className="text-[#D72638] font-bold tracking-[0.2em] text-sm uppercase">
                    {candidato.rol}
                  </p>
                  <div className="flex items-center gap-2 text-[#0D1B2A]/80 mt-1">
                    <MapPin size={16} />
                    <span className="text-sm font-bold">{candidato.distrito} - Lista {candidato.numero_lista}</span>
                  </div>
                </div>
              </div>

              <div className="order-2 md:order-none flex flex-col" style={{ perspective: "1000px" }}>
                <div ref={titleRef} className="text-5xl md:text-7xl lg:text-[90px] font-black leading-[0.9] tracking-tight uppercase">
                  <div className="text-[#0D1B2A]">
                    {candidato.nombre}
                  </div>
                  <div className="text-[#D72638]">
                    {candidato.apellidoHighlighted}
                  </div>
                </div>
              </div>

              <div className="order-4 md:order-none flex flex-col space-y-8 w-full">
                <p ref={subtitleRef} className="text-lg md:text-xl text-[#0D1B2A] max-w-xl leading-relaxed border-l-4 border-[#D72638] pl-5 font-medium" style={{ opacity: 0 }}>
                  {candidato.hero_resumen}
                </p>

                <div ref={socialRef} className="flex gap-4">
                    {redesValidas.map((item, index) => {
                      let network = item.key.toLowerCase();
                      const urlString = item.url.toLowerCase();

                      if (!isNaN(network) || network === 'desconocida') {
                        if (urlString.includes('facebook') || urlString.includes('fb.')) network = 'facebook';
                        else if (urlString.includes('instagram')) network = 'instagram';
                        else if (urlString.includes('twitter') || urlString.includes('x.com')) network = 'twitter';
                        else if (urlString.includes('youtube') || urlString.includes('youtu.be')) network = 'youtube';
                        else if (urlString.includes('tiktok')) network = 'tiktok';
                      }
                      
                      const IconComponent = SOCIAL_ICONS[network] || <Link size={24} />;
      
                      return (
                        <a 
                          key={index} 
                          href={item.url} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 rounded-full border border-[#0D1B2A]/20 flex items-center justify-center hover:bg-[#D72638] hover:text-white transition-all duration-300 animate-bounce"
                        >
                          {IconComponent}
                        </a>
                      );
                    })}
                  </div>
              </div>

            </div>

            {/* ── COLUMNA DERECHA ───────────────────────────────────────────── */}
            <div className="order-3 md:order-2 flex flex-col items-center justify-end relative h-auto -mt-10 md:-mt-10">

              <div 
                ref={imageContainerRef}
                className="relative z-10 w-full md:w-[64%] h-[40vh] md:h-[65vh] max-w-lg -mb-8 sm:-mb-4 lg:-mb-14 cursor-pointer group"
                style={{ perspective: '1000px', opacity: 0 }} 
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div 
                  className="w-full h-full relative transition-transform duration-700 ease-in-out"
                  style={{ 
                    transformStyle: 'preserve-3d', 
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' 
                  }}
                >
                  {/* Lado A: FRENTE */}
                  <div 
                    className="inset-0 w-full h-full p-2"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  >
                    <img
                      src={candidato.hero_image}
                      alt={`${candidato.nombre} ${candidato.apellidoHighlighted}`}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>

                  {/* Lado B: DORSO */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-[#f0f0f0] rounded-lg shadow-2xl flex flex-col items-center justify-center p-8 border-4 border-[#f0f0f0]"
                    style={{ 
                      backfaceVisibility: 'hidden', 
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)' 
                    }}
                  >
                    <p className="text-[#0D1B2A] font-black text-lg md:text-2xl my-6 text-center tracking-tight uppercase">
                      ¡Comparte para lograr un Buen Gobierno!
                    </p>
                    
                    {/* Generador Dinámico de QR */}
                    <div className="w-full max-w-[200px] aspect-square flex items-center justify-center bg-white p-2 rounded-lg shadow-inner">
                    <QRCodeSVG 
                      value={qrUrlValue}
                      width="100%"
                      height="100%"
                      fgColor="#0D1B2A"
                      bgColor="transparent"
                      level="H" /* Alto nivel de corrección de errores (necesario y perfecto para incrustar logos) */
                      imageSettings={{
                        src: "/logo-sol-pbg.png",
                        x: undefined,
                        y: undefined,
                        height: 48, // Ajusta este tamaño según qué tan grande quieras el logo
                        width: 48,  // Ajusta este tamaño para mantener la proporción
                        excavate: true, // Borra los puntos del QR detrás del logo para mayor legibilidad
                      }}
                    />
                  </div>
                    
                    <p className="text-[#0D1B2A]/60 text-sm mt-6 font-bold uppercase tracking-wider">
                      Toca para volver
                    </p>
                  </div>
                </div>
              </div>

              {/* Tarjetas de Votación */}
              <div className="flex justify-center w-full max-w-sm relative z-20 ">

                {/* ── Tarjeta: MARCA ──────────────────────────────────────── */}
                <div
                  ref={marcaCardRef}
                  className="bg-[#f0f0f0] p-4 md:p-6 w-1/2 flex flex-col items-center rounded-l-lg"
                  style={{ opacity: 0 }}
                >
                  <div className="w-full h-full bg-[#F5C800] flex items-center justify-center p-2 mb-3 border border-black relative">
                    <img src={candidato.partido_logo} alt="Marca el Sol" className="w-full h-full object-contain" />

                    <svg
                      viewBox="0 0 100 100"
                      className="absolute inset-0 w-full h-full"
                      style={{ overflow: 'visible' }}
                    >
                      <path
                        ref={xPath1Ref}
                        d="M 15,15 L 85,85"
                        fill="none"
                        stroke="#0D1B2A"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                      <path
                        ref={xPath2Ref}
                        d="M 85,15 L 15,85"
                        fill="none"
                        stroke="#0D1B2A"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="bg-[#0D1B2A] text-white text-xs md:text-sm font-black tracking-widest uppercase py-1.5 px-6 w-full text-center">
                    MARCA
                  </div>
                </div>

                {/* ── Tarjeta: ESCRIBE ─────────────────────────────────────── */}
                <div
                  ref={escribeCardRef}
                  className="bg-[#f0f0f0] p-4 md:p-6 w-1/2 flex flex-col items-center  rounded-r-lg"
                  style={{ opacity: 0 }}
                >
                  <div className="w-full h-full bg-[#F5C800] flex items-center justify-center p-2 mb-3 border border-black">
                    
                    <div className="relative overflow-hidden w-full flex items-center justify-center h-16 md:h-24">
                       <span ref={numeroRef} className="text-7xl md:text-8xl font-number text-[#0D1B2A]">
                          {candidato.numero_lista}
                       </span>
                       
                       <div 
                          ref={wipeMaskRef}
                          className="absolute inset-0 bg-[#F5C800] w-[105%] h-full transform-gpu"
                          style={{ transformOrigin: 'right', right: '-2%' }} 
                       ></div>
                    </div>

                  </div>

                  <div className="bg-[#D72638] text-white w-full text-xs md:text-sm font-black tracking-widest uppercase py-1.5 px-6 text-center">
                    ESCRIBE
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}