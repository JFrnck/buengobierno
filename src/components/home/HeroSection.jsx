import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// 1. Importamos SplitText (Asegúrate de tener instalado el paquete premium)
import { SplitText } from 'gsap/SplitText'
import TikTokEmbed from './VideoComponent'
import CampaignVideoPlayer from './VideoComponent'

// 2. Registramos ambos plugins
gsap.registerPlugin(ScrollTrigger, SplitText)

export default function HeroSection() {
  const sectionRef = useRef(null)
  const tagRef = useRef(null)
  
  const title1Ref = useRef(null)
  const title2Ref = useRef(null)
  const title3Ref = useRef(null)
  
  const subtitleRef = useRef(null)
  const ctasRef = useRef(null)
  const imageRef = useRef(null)
  const decorRef = useRef(null)

  useGSAP(() => {
    // 3. Inicializamos SplitText pasándole un array con las refs de tus títulos
    const splitTitles = new SplitText(
      [title1Ref.current, title2Ref.current, title3Ref.current], 
      { type: "words,chars" } 
    )

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.5 })

      tl.fromTo(tagRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
      // 4. Aplicamos la animación de la documentación al array de palabras separadas
      .from(splitTitles.words, {
        y: -100,
        opacity: 0,
        rotation: "random(-80, 80)",
        duration: 0.7, 
        ease: "back.out(1.7)", 
        stagger: 0.15
      }, '-=0.3')
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4'
      )
      .fromTo(ctasRef.current?.children ? Array.from(ctasRef.current.children) : [],
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12 },
        '-=0.4'
      )
      .fromTo(imageRef.current,
        { opacity: 0, scale: 0.92, x: 40 },
        { opacity: 1, scale: 1, x: 0, duration: 1, ease: 'power2.out' },
        '-=0.8'
      )
      .fromTo(decorRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' },
        '-=0.6'
      )

      // Parallax al scrollear
      gsap.to(imageRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        }
      })
    }, sectionRef)

    // 5. Cleanup: Revertimos el contexto de GSAP y el SplitText
    return () => {
      ctx.revert()
      splitTitles.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      // Cambiado a min-h-[100dvh] para mejor comportamiento en navegadores móviles
      className="relative min-h-[100dvh] lg:h-screen py-20 lg:py-0 bg-[#F5C800] flex items-center overflow-hidden"
    >
      {/* Background geometric elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 md:w-96 md:h-96 rounded-full border-[30px] md:border-[40px] border-[#E0B400] opacity-40" />
        <div className="absolute bottom-10 -left-10 w-48 h-48 md:w-64 md:h-64 rounded-full border-[20px] md:border-[30px] border-[#E0B400] opacity-30" />
        <div className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-[#D72638] opacity-60" />
        <div className="absolute top-2/3 right-1/3 w-2 h-2 rounded-full bg-[#1A1A1A] opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Text content */}
          <div className="flex flex-col justify-center z-10 pt-12 lg:pt-0">
            <div ref={tagRef} className="inline-flex items-center gap-2 my-4 md:my-6" style={{ opacity: 0 }}>
              <span className="w-6 md:w-8 h-0.5 bg-[#D72638]" />
              <span className="text-[#D72638] font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase">
                Partido del Buen Gobierno
              </span>
            </div>

            {/* Ajuste en el margin inferior y el solapamiento (-space-y) responsivo */}
            <div className="flex flex-col mb-4 md:mb-6 -space-y-1 md:-space-y-2 lg:-space-y-3">
              <div>
                <h1
                  ref={title1Ref}
                  className="font-black text-[#1A1A1A] leading-[0.95] tracking-[-0.03em] pb-2 md:pb-3"
                  style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', opacity: 1 }}
                >
                  EL
                </h1>
              </div>
              <div>
                <h1
                  ref={title2Ref}
                  className="font-black text-[#1A1A1A] leading-[0.95] tracking-[-0.03em] pb-2 md:pb-3"
                  style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', opacity: 1 }}
                >
                  CAMBIO
                </h1>
              </div>
              <div>
                <h1
                  ref={title3Ref}
                  className="font-black leading-[0.95] tracking-[-0.03em] pb-2 md:pb-3"
                  style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: '#D72638', opacity: 1 }}
                >
                  ES POSIBLE
                </h1>
              </div>
            </div>

            <p
              ref={subtitleRef}
              className="text-[#1A1A1A]/70 font-medium leading-relaxed mb-8 max-w-[90%] md:max-w-md"
              style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', opacity: 0 }}
            >
              Un gobierno limpio, transparente y cercano a la gente. Juntos construimos el futuro que nuestro país merece.
            </p>

            <div ref={ctasRef} className="flex flex-wrap gap-4">
              <a
                href="#plan"
                className="bg-[#D72638] text-white font-bold px-6 md:px-8 py-3.5 rounded-full hover:bg-[#B81F2E] transition-all duration-200 hover:shadow-[0_8px_24px_rgba(215,38,56,0.4)] hover:-translate-y-1 text-sm tracking-wide text-center"
                style={{ opacity: 0 }}
              >
                Ver Plan de Gobierno
              </a>
            </div>
          </div>

          {/* Hero image container */}
          <div className="relative flex justify-center items-center w-full h-full mt-8 lg:mt-0">
            <div
              ref={decorRef}
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: 0 }}
            >
              {/* Círculo fluido: Usa vw en móviles para no desbordar, y medidas fijas en pantallas más grandes */}
              <div className="w-[80vw] h-[80vw] max-w-[300px] max-h-[300px] sm:max-w-[340px] sm:max-h-[340px] lg:max-w-[420px] lg:max-h-[420px] rounded-full bg-[#E0B400] opacity-50" />
            </div>

            <div
              ref={imageRef}
              // Ancho controlado en móviles (85%) para que la imagen no choque contra los bordes
              className="relative z-10 w-[85%] sm:w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[620px] mx-auto"
              style={{ opacity: 0 }}
            >
              {/* <img src="/JorgeNieto.png" alt="Jorge Nieto" className="w-full h-auto object-contain" /> */}
            <CampaignVideoPlayer/>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator - oculto en mobile ultra pequeños por colisiones */}
      <div className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-2 animate-bounce">
        <span className="text-[#1A1A1A]/40 text-[10px] font-semibold tracking-widest uppercase">Scroll</span>
        <div className="w-0.5 h-6 bg-[#1A1A1A]/20 rounded-full overflow-hidden">
          <div className="w-full h-1/2 bg-[#1A1A1A]/60 rounded-full animate-[shimmer_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  )
}