import React, { useRef } from 'react';
import { MapPin, Link } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

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
  const marcaCardRef   = useRef(null);
  const escribeCardRef = useRef(null);
  const xPath1Ref      = useRef(null);
  const xPath2Ref      = useRef(null);
  const wipeMaskRef    = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [marcaCardRef.current, escribeCardRef.current],
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 3,
          stagger: 0.2,
          ease: 'back.out(1.5)',
          delay: 0.5,
        }
      );

      if (xPath1Ref.current && xPath2Ref.current && wipeMaskRef.current) {
        const BUFFER = 30; 
        const xLengths = [
          xPath1Ref.current.getTotalLength() + BUFFER,
          xPath2Ref.current.getTotalLength() + BUFFER
        ];

        const masterTl = gsap.timeline({ repeat: -1, delay: 0.8 });

        masterTl.set([xPath1Ref.current, xPath2Ref.current], { opacity: 0 });
        masterTl.set(wipeMaskRef.current, { xPercent: 0 }); 

        masterTl.set(xPath1Ref.current, { strokeDasharray: xLengths[0], strokeDashoffset: xLengths[0] });
        masterTl.set(xPath2Ref.current, { strokeDasharray: xLengths[1], strokeDashoffset: xLengths[1] });

        masterTl.to(xPath1Ref.current, { opacity: 1, duration: 0.01 }, 0.1);
        masterTl.to(xPath1Ref.current, { strokeDashoffset: 0, duration: 0.4, ease: 'power1.inOut' }, 0.1);

        masterTl.to(xPath2Ref.current, { opacity: 1, duration: 0.01 }, 0.4);
        masterTl.to(xPath2Ref.current, { strokeDashoffset: 0, duration: 0.4, ease: 'power1.inOut' }, 0.4);

        masterTl.to(wipeMaskRef.current, { 
          xPercent: 100, 
          duration: 3, 
          ease: 'power2.inOut' 
        }, 0.8);

        masterTl.to([xPath1Ref.current, xPath2Ref.current], {
          opacity: 0,
          duration: 0.5, 
          ease: 'power1.inOut'
        }, 2.0);
        
        masterTl.to(wipeMaskRef.current, {
           xPercent: 0,
           duration: 0.5,
           ease: 'power1.inOut'
        }, 2.0);

        masterTl.set([xPath1Ref.current, xPath2Ref.current], {
          strokeDashoffset: (i) => xLengths[i]
        }, 2.6);

        masterTl.set({}, {}, 3.2); 
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── 3. Normalizador Dinámico de Redes (Soporta Arrays, Objetos y URLs planas) ──
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

  // Filtramos solo las que tengan una URL de verdad
  redesValidas = redesValidas.filter(r => r.url && typeof r.url === 'string' && r.url.trim() !== '');


  return (
    <section
      ref={sectionRef}
      className="bg-[#F5C800] text-[#0D1B2A] min-h-[110vh] flex items-center pb-20 overflow-hidden relative"
    >
      <div className="container mx-auto px-4 z-10 pt-10 md:pt-0">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-7xl mx-auto">

          {/* ── COLUMNA IZQUIERDA ─────────────────────────────────────────── */}
          <div className="contents md:flex md:flex-col md:order-1 space-y-0 md:space-y-8">
            
            <div className="order-1 md:order-none flex items-center gap-4">
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

            <h1 className="order-2 md:order-none text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight uppercase text-[#0D1B2A]">
              {candidato.nombre}
              <br />
              <span className="text-[#D72638]">{candidato.apellidoHighlighted}</span>
            </h1>

            <div className="order-4 md:order-none flex flex-col space-y-8 w-full">
              <p className="text-lg md:text-xl text-[#0D1B2A] max-w-xl leading-relaxed border-l-4 border-[#D72638] pl-5 font-medium">
                {candidato.hero_resumen}
              </p>

              <div className="flex gap-4">
                  {redesValidas.map((item, index) => {
                    let network = item.key.toLowerCase();
                    const urlString = item.url.toLowerCase();

                    // Si el key es un número (porque era un Array) o es "desconocida", adivinamos leyendo el enlace
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
                        className="w-14 h-14 rounded-full border border-[#0D1B2A]/20 flex items-center justify-center hover:bg-[#D72638] hover:text-white transition-all duration-300"
                      >
                        {IconComponent}
                      </a>
                    );
                  })}
                </div>
            </div>

          </div>

          {/* ── COLUMNA DERECHA ───────────────────────────────────────────── */}
          <div className="order-3 md:order-2 flex flex-col items-center justify-end relative h-auto -mt-10 md: md:-mt-10">

            <img
              src={candidato.hero_image}
              alt={`${candidato.nombre} ${candidato.apellidoHighlighted}`}
              className="relative z-10 h-[65%] md:w-[64%] max-w-lg object-contain -mb-14 rounded-lg"
            />

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
                     <span className="text-6xl md:text-7xl font-bold text-[#0D1B2A]">
                        {candidato.numero_lista}
                     </span>
                     
                     <div 
                        ref={wipeMaskRef}
                        className="absolute inset-0 bg-[#F5C800] w-full h-full transform-gpu"
                        style={{ transformOrigin: 'right' }} 
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
  );
}