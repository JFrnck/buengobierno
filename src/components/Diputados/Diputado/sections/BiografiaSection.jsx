import React, { useEffect, useRef, useState } from 'react';
import { Camera, ArrowRight } from 'lucide-react';

/*
  GSAP via CDN en tu index.html (o npm install gsap):
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  SplitText requiere licencia Club GSAP — hay fallback automático sin ella.
*/

export default function BiografiaSection({ biografia }) {
  const sectionRef    = useRef(null);
  const headingRef    = useRef(null);
  const paragraphsRef = useRef([]);
  const galleryRef    = useRef([]);
  const decorRef      = useRef([]);
  const lineRef       = useRef(null);
  const badgeRef      = useRef(null);

  const [activeImage, setActiveImage] = useState(null);

  const hasGaleria = biografia?.galeria && biografia.galeria.length > 0;

  /* ─── GSAP Animations ─── */
  useEffect(() => {
    const gsap          = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    // Fallback: si GSAP no carga, mostrar todo visible
    if (!gsap || !ScrollTrigger) {
      [
        badgeRef.current, headingRef.current, lineRef.current,
        ...paragraphsRef.current, ...galleryRef.current,
      ].forEach(el => {
        if (el) {
          el.style.opacity  = '1';
          el.style.transform = 'none';
          el.style.clipPath  = 'none';
        }
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Estados iniciales (GSAP los oculta, no el JSX)
      gsap.set(badgeRef.current,   { opacity: 0, y: 20, scale: 0.8 });
      gsap.set(lineRef.current,    { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(headingRef.current, { opacity: 0 });
      paragraphsRef.current.forEach(el => {
        if (el) gsap.set(el, { opacity: 0, x: -30, clipPath: 'inset(0 100% 0 0)' });
      });
      galleryRef.current.forEach((el, i) => {
        if (el) gsap.set(el, { opacity: 0, y: 80, scale: 0.9, rotateZ: i % 2 === 0 ? -3 : 3 });
      });

      // Badge
      gsap.to(badgeRef.current, {
        opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(2)',
        scrollTrigger: { trigger: badgeRef.current, start: 'top 85%' },
      });

      // Línea roja
      gsap.to(lineRef.current, {
        scaleX: 1, duration: 1.2, ease: 'expo.out', delay: 0.3,
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      });

      // Heading — SplitText char-by-char si está disponible
      if (window.SplitText && headingRef.current) {
        gsap.set(headingRef.current, { opacity: 1 });
        const split = new window.SplitText(headingRef.current, { type: 'chars,words' });
        gsap.fromTo(
          split.chars,
          { opacity: 0, y: 80, rotateX: -90, transformOrigin: '50% 100%' },
          {
            opacity: 1, y: 0, rotateX: 0, duration: 0.7, ease: 'back.out(1.4)',
            stagger: 0.025,
            scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
          }
        );
      } else {
        gsap.to(headingRef.current, {
          opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
        });
      }

      // Párrafos — clip-path reveal
      paragraphsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)',
          duration: 0.9, ease: 'power4.out', delay: i * 0.12,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      // Galería — stagger + parallax
      galleryRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          opacity: 1, y: 0, scale: 1, rotateZ: 0,
          duration: 1, ease: 'expo.out', delay: i * 0.15,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
        const img = el.querySelector('img');
        if (img) {
          gsap.to(img, {
            yPercent: -15, ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
          });
        }
      });

      // Blobs decorativos — float infinito
      decorRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: i % 2 === 0 ? -20 : 20,
          rotation: i % 2 === 0 ? 12 : -12,
          duration: 3 + i * 0.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/*
        <style> mínimo — solo lo que Tailwind no puede hacer:
        1. @import fuentes Google
        2. @keyframes custom
        3. Scrollbar webkit
        4. font-family custom (sin tocar tailwind.config)
        5. Pseudo-elemento ::before para el punto animado del badge
      */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .bio-font-display { font-family: 'Playfair Display', serif; }
        .bio-font-body    { font-family: 'DM Sans', sans-serif; }

        @keyframes bio-pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.6); opacity: .4; }
        }
        @keyframes bio-lb-fade {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes bio-lb-scale {
          from { transform: scale(.85); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }

        .bio-animate-lb-fade  { animation: bio-lb-fade  .3s ease; }
        .bio-animate-lb-scale { animation: bio-lb-scale .4s cubic-bezier(.34,1.56,.64,1); }

        .bio-badge-dot::before {
          content: '';
          display: inline-block;
          width: 6px; height: 6px;
          background: #D72638;
          border-radius: 50%;
          margin-right: 8px;
          vertical-align: middle;
          animation: bio-pulse-dot 2s ease-in-out infinite;
        }

        .bio-gallery-scroll::-webkit-scrollbar       { width: 4px; }
        .bio-gallery-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,.05); border-radius: 2px; }
        .bio-gallery-scroll::-webkit-scrollbar-thumb { background: #D72638; border-radius: 2px; }
      `}</style>

      {/* ─── Lightbox ─── */}
      {activeImage && (
        <div
          className="bio-animate-lb-fade fixed inset-0 z-[9999] flex items-center justify-center p-10 bg-black/95 backdrop-blur-xl"
          onClick={() => setActiveImage(null)}
        >
          <button
            className="fixed top-6 right-6 w-11 h-11 flex items-center justify-center rounded-full border border-white/15 bg-white/10 text-white text-xl backdrop-blur-sm transition-colors duration-200 hover:bg-[#D72638]/60"
            onClick={() => setActiveImage(null)}
          >
            ✕
          </button>
          <img
            src={activeImage}
            alt="Foto ampliada"
            className="bio-animate-lb-scale max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}

      {/* ─── Sección principal ─── */}
      <section
        ref={sectionRef}
        className="bio-font-body relative overflow-hidden bg-white py-28 md:py-36"
      >
        {/* Grid sutil de fondo */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(240,236,228,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(240,236,228,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Blobs decorativos */}
        <div
          ref={el => (decorRef.current[0] = el)}
          className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(215,38,56,0.06) 0%, transparent 70%)' }}
        />
        <div
          ref={el => (decorRef.current[1] = el)}
          className="absolute bottom-24 -left-12 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(215,38,56,0.04) 0%, transparent 70%)' }}
        />
        <div
          ref={el => (decorRef.current[2] = el)}
          className="absolute w-[120px] h-[120px] rounded-full border border-[#D72638]/10 pointer-events-none"
          style={{ top: '20%', right: '35%' }}
        />

        {/* Esquinas decorativas */}
        <div className="absolute top-0 left-0 w-28 h-28 border-l border-t border-[#D72638]/20 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-28 h-28 border-r border-b border-[#D72638]/20 pointer-events-none" />

        {/* ─── Contenido ─── */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div
            className={
              hasGaleria
                ? 'grid lg:grid-cols-[1fr_420px] gap-16 xl:gap-24 items-start'
                : 'flex justify-center'
            }
          >

            {/* ══════════════ COLUMNA TEXTO ══════════════ */}
            <div className={hasGaleria ? '' : 'max-w-[760px] w-full'}>

              {/* Badge */}
              <div ref={badgeRef} className="mb-5">
                <span className="bio-badge-dot inline-flex items-center px-4 py-1.5 rounded-full bg-[#D72638]/10 border border-[#D72638]/25 text-[#D72638] text-[11px] font-semibold tracking-[0.2em] uppercase">
                  {biografia?.titulo || 'Biografía'}
                </span>
              </div>

              {/* Titular */}
              <h2
                ref={headingRef}
                className="bio-font-display text-[clamp(2.8rem,5vw,5rem)] font-black text-[#0a0f1a] leading-[1.05] tracking-tight"
              >
                {biografia?.subtitulo || 'Una historia de dedicación'}
              </h2>

              {/* Línea animada */}
              <div
                ref={lineRef}
                className="h-[3px] w-20 mt-5 mb-8 origin-left"
                style={{ background: 'linear-gradient(90deg, #D72638, transparent)' }}
              />

              {/* Párrafos */}
              <div className="flex flex-col gap-5">
                {(biografia?.historia || []).map((parrafo, index) => {
                  // Segundo párrafo como bloque de cita
                  if (index === 1 && (biografia?.historia?.length ?? 0) > 2) {
                    return (
                      <div
                        key={index}
                        ref={el => (paragraphsRef.current[index] = el)}
                        className="relative overflow-hidden border-l-2 border-[#D72638] pl-6 py-4 pr-4 bg-[#D72638]/5 rounded-r-xl"
                      >
                        <span className="bio-font-display absolute -top-2 right-4 text-[80px] leading-none text-[#D72638]/10 pointer-events-none select-none">
                          "
                        </span>
                        <p className="text-[#0a0f1a]/75 text-[1.05rem] leading-[1.85] font-light">
                          {parrafo}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <p
                      key={index}
                      ref={el => (paragraphsRef.current[index] = el)}
                      className={`leading-[1.85] font-light ${
                        index === 0
                          ? 'text-[#0a0f1a]/90 text-[1.1rem]'
                          : 'text-[#0a0f1a]/65 text-base'
                      }`}
                    >
                      {parrafo}
                    </p>
                  );
                })}
              </div>

              {/* Stats */}
              {biografia?.stats && (
                <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-[#f0ece4]/[0.08]">
                  {biografia.stats.map((s, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="bio-font-display text-[2rem] font-black text-[#D72638] leading-none">
                        {s.valor}
                      </span>
                      <span className="text-[0.72rem] font-medium text-[#0a0f1a]/40 tracking-[0.12em] uppercase">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tags */}
              {biografia?.tags && (
                <div className="flex flex-wrap gap-2 mt-7">
                  {biografia.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1 rounded-full bg-[#f0ece4]/[0.04] border border-[#f0ece4]/10 text-[0.8rem] text-[#0a0f1a]/50 tracking-wide cursor-default transition-all duration-300 hover:bg-[#D72638]/10 hover:border-[#D72638]/30 hover:text-[#D72638] hover:-translate-y-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* ══════════════ COLUMNA GALERÍA ══════════════ */}
            {hasGaleria && (
              <div className="sticky top-24">

                {/* Encabezado */}
                <div className="flex items-center gap-3.5 mb-7">
                  <div
                    className="w-[46px] h-[46px] shrink-0 rounded-[14px] flex items-center justify-center shadow-[0_8px_24px_rgba(215,38,56,0.4)]"
                    style={{ background: 'linear-gradient(135deg, #D72638, #a01c2b)' }}
                  >
                    <Camera color="white" size={20} />
                  </div>
                  <div>
                    <p className="bio-font-display text-[1.35rem] font-bold text-[#0a0f1a] leading-tight">
                      En el campo
                    </p>
                    <p className="text-xs text-[#0a0f1a]/40 mt-0.5">
                      {biografia.galeria.length} fotografías
                    </p>
                  </div>
                </div>

                {/* Lista con scroll */}
                <div className="bio-gallery-scroll flex flex-col gap-4 max-h-[80vh] overflow-y-auto pr-2 pb-2">
                  {biografia.galeria.map((fotoObj, index) => {
                    const imageUrl    = Object.values(fotoObj)[0];
                    const isLandscape = index % 3 === 1;

                    return (
                      <div
                        key={index}
                        ref={el => (galleryRef.current[index] = el)}
                        className="relative overflow-hidden rounded-[20px] cursor-pointer group transition-shadow duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(215,38,56,0.2)]"
                        style={{ aspectRatio: isLandscape ? '16/9' : '4/5' }}
                        onClick={() => setActiveImage(imageUrl)}
                      >
                        {/* Imagen (parallax via GSAP) */}
                        <img
                          src={imageUrl}
                          alt={`Fotografía biográfica ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                        />

                        {/* Overlay hover */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6"
                          style={{
                            background:
                              'linear-gradient(to top, rgba(10,15,26,0.88) 0%, rgba(10,15,26,0.15) 55%, transparent 100%)',
                          }}
                        >
                          <div className="flex items-center gap-2 text-[#0a0f1a] text-sm font-medium tracking-wide translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 delay-100">
                            Ver imagen
                            <ArrowRight size={14} />
                          </div>
                        </div>

                        {/* Número de foto */}
                        <div className="absolute top-3.5 left-3.5 w-8 h-8 rounded-lg bg-[#D72638]/90 flex items-center justify-center text-[0.72rem] font-bold text-white backdrop-blur-sm">
                          0{index + 1}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}