import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// 1. Importamos SplitText (Asegúrate de tener instalado el paquete premium)
import { SplitText } from 'gsap/SplitText'

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
      { type: "words,chars" } // Puedes usar "chars" si quieres que cada letra rote
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
        ease: "back.out(1.7)", // back.out es ideal para que el texto "rebote" hacia su lugar
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
      className="relative h-screen bg-[#F5C800] flex items-center overflow-hidden"
    >
      {/* Background geometric elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border-[40px] border-[#E0B400] opacity-40" />
        <div className="absolute bottom-10 -left-10 w-64 h-64 rounded-full border-[30px] border-[#E0B400] opacity-30" />
        <div className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-[#D72638] opacity-60" />
        <div className="absolute top-2/3 right-1/3 w-2 h-2 rounded-full bg-[#1A1A1A] opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text content */}
          <div className="flex flex-col justify-center z-10">
            <div ref={tagRef} className="inline-flex items-center gap-2 mb-2" style={{ opacity: 0 }}>
              <span className="w-8 h-0.5 bg-[#D72638]" />
              <span className="text-[#D72638] font-bold text-xs tracking-[0.2em] uppercase">
                Partido del Buen Gobierno
              </span>
            </div>

            <div className="flex flex-col mb-6 -space-y-3">
              {/* Quitamos el overflow-hidden de aquí para que la rotación y el y:-100 no se corten */}
              <div>
                <h1
                  ref={title1Ref}
                  className="font-black text-[#1A1A1A] leading-[1] tracking-[-0.03em] pb-3"
                  style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', opacity: 1 }}
                >
                  EL
                </h1>
              </div>
              <div>
                <h1
                  ref={title2Ref}
                  className="font-black text-[#1A1A1A] leading-[1] tracking-[-0.03em] pb-3"
                  style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', opacity: 1 }}
                >
                  CAMBIO
                </h1>
              </div>
              <div>
                <h1
                  ref={title3Ref}
                  className="font-black leading-[1] tracking-[-0.03em] pb-3"
                  style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', color: '#D72638', opacity: 1 }}
                >
                  ES POSIBLE
                </h1>
              </div>
            </div>

            <p
              ref={subtitleRef}
              className="text-[#1A1A1A]/70 font-medium leading-relaxed mb-8 max-w-md"
              style={{ fontSize: 'clamp(1rem, 1.2vw, 1.1rem)', opacity: 0 }}
            >
              Un gobierno limpio, transparente y cercano a la gente. Juntos construimos el futuro que nuestra región merece.
            </p>

            <div ref={ctasRef} className="flex flex-wrap gap-4">
              <a
                href="#plan"
                className="bg-[#D72638] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#B81F2E] transition-all duration-200 hover:shadow-[0_8px_24px_rgba(215,38,56,0.4)] hover:-translate-y-1 text-sm tracking-wide"
                style={{ opacity: 0 }}
              >
                Ver Plan de Gobierno
              </a>
              <a
                href="/voluntarios"
                className="bg-[#1A1A1A] text-[#F5C800] font-bold px-8 py-3.5 rounded-full hover:bg-[#2D2D2D] transition-all duration-200 hover:-translate-y-1 text-sm tracking-wide"
                style={{ opacity: 0 }}
              >
                Ser Voluntario
              </a>
            </div>
          </div>

          {/* Hero image container (sin cambios aquí) */}
          <div className="relative flex justify-center items-center w-full h-full mt-10 lg:mt-0">
            <div
              ref={decorRef}
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: 0 }}
            >
              <div className="w-[340px] h-[340px] lg:w-[420px] lg:h-[420px] rounded-full bg-[#E0B400] opacity-50" />
            </div>

            <div
              ref={imageRef}
              className="relative z-10 w-full max-w-[680px] lg:max-w-[620px]"
              style={{ opacity: 0 }}
            >
{/* 
            <h2 className='text-[60px] font-black'>
              <span className='text-[#D72638]'>JORGE </span>  
              <span className='text-white'>NIETO </span>  
              <span className='text-[#D72638]'>PRESIDENTE</span>  
            </h2> 
               */}
            <img src="/JorgeNieto.png" alt="" />
              
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[#1A1A1A]/40 text-[10px] font-semibold tracking-widest uppercase">Scroll</span>
        <div className="w-0.5 h-6 bg-[#1A1A1A]/20 rounded-full overflow-hidden">
          <div className="w-full h-1/2 bg-[#1A1A1A]/60 rounded-full animate-[shimmer_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  )
}