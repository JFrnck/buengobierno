import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef(null)
  const tagRef = useRef(null)
  const titleRef = useRef(null)
  const title2Ref = useRef(null)
  const subtitleRef = useRef(null)
  const ctasRef = useRef(null)
  const imageRef = useRef(null)
  const decorRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.5 })

      tl.fromTo(tagRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
      .fromTo(titleRef.current,
        { opacity: 0, y: 60, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.9 },
        '-=0.3'
      )
      .fromTo(title2Ref.current,
        { opacity: 0, y: 60, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.9 },
        '-=0.7'
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.5'
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

      // Parallax on scroll
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

      gsap.to(titleRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#F5C800] flex items-center overflow-hidden pt-20"
    >
      {/* Background geometric elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border-[40px] border-[#E0B400] opacity-40" />
        <div className="absolute bottom-10 -left-10 w-64 h-64 rounded-full border-[30px] border-[#E0B400] opacity-30" />
        <div className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-[#D72638] opacity-60" />
        <div className="absolute top-2/3 right-1/3 w-2 h-2 rounded-full bg-[#1A1A1A] opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-80px)] py-16">
          {/* Text content */}
          <div className="flex flex-col justify-center z-10">
            <div ref={tagRef} className="inline-flex items-center gap-2 mb-8" style={{ opacity: 0 }}>
              <span className="w-8 h-0.5 bg-[#D72638]" />
              <span className="text-[#D72638] font-bold text-xs tracking-[0.2em] uppercase">
                Partido del Buen Gobierno
              </span>
            </div>

            <div className="overflow-hidden mb-2">
              <h1
                ref={titleRef}
                className="font-black text-[#1A1A1A] leading-[0.92] tracking-[-0.03em]"
                style={{
                  fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
                  opacity: 0
                }}
              >
                EL CAMBIO
              </h1>
            </div>
            <div className="overflow-hidden mb-6">
              <h1
                ref={title2Ref}
                className="font-black leading-[0.92] tracking-[-0.03em]"
                style={{
                  fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
                  color: '#D72638',
                  opacity: 0
                }}
              >
                ES POSIBLE
              </h1>
            </div>

            <p
              ref={subtitleRef}
              className="text-[#1A1A1A]/70 font-medium leading-relaxed mb-10 max-w-md"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', opacity: 0 }}
            >
              Un gobierno limpio, transparente y cercano a la gente. Juntos construimos el futuro que nuestra región merece.
            </p>

            <div ref={ctasRef} className="flex flex-wrap gap-4">
              <a
                href="#plan"
                className="bg-[#D72638] text-white font-bold px-8 py-4 rounded-full hover:bg-[#B81F2E] transition-all duration-200 hover:shadow-[0_8px_24px_rgba(215,38,56,0.4)] hover:-translate-y-1 text-sm tracking-wide"
                style={{ opacity: 0 }}
              >
                Ver Plan de Gobierno
              </a>
              <a
                href="/voluntarios"
                className="bg-[#1A1A1A] text-[#F5C800] font-bold px-8 py-4 rounded-full hover:bg-[#2D2D2D] transition-all duration-200 hover:-translate-y-1 text-sm tracking-wide"
                style={{ opacity: 0 }}
              >
                Ser Voluntario
              </a>
            </div>

            {/* Stats row */}
            <div className="flex gap-10 mt-14 pt-10 border-t border-[#1A1A1A]/15">
              {[
                { num: '12K+', label: 'Seguidores' },
                { num: '850+', label: 'Voluntarios' },
                { num: '32', label: 'Municipios' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-black text-[#1A1A1A] text-2xl tracking-tight">{s.num}</div>
                  <div className="text-[#1A1A1A]/55 text-xs font-semibold tracking-widest uppercase mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="relative flex justify-center items-center">
            <div
              ref={decorRef}
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: 0 }}
            >
              <div className="w-[420px] h-[420px] rounded-full bg-[#E0B400] opacity-50" />
            </div>

            <div
              ref={imageRef}
              className="relative z-10 w-full max-w-[460px]"
              style={{ opacity: 0 }}
            >
              {/* Placeholder hero image — replace with actual candidate photo */}
              <div className="relative bg-[#E0B400] rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_24px_64px_rgba(0,0,0,0.2)]">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-[#1A1A1A]/10 flex items-center justify-center">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(26,26,26,0.3)" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <p className="text-[#1A1A1A]/40 text-sm font-medium text-center px-8">
                    Insertar imagen<br />del candidato aquí
                  </p>
                </div>
                {/* Red accent corner */}
                <div className="absolute top-6 right-6 bg-[#D72638] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  #2026
                </div>
                {/* Bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#1A1A1A] px-6 py-4">
                  <p className="text-[#F5C800] font-black text-lg tracking-tight">Partido del Buen Gobierno</p>
                  <p className="text-white/60 text-xs font-medium mt-0.5">Por un gobierno que te representa</p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D72638] flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-black text-[#1A1A1A] text-sm leading-tight">Propuesta #1</p>
                  <p className="text-[#1A1A1A]/50 text-xs">en transparencia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[#1A1A1A]/40 text-xs font-semibold tracking-widest uppercase">Scroll</span>
        <div className="w-0.5 h-8 bg-[#1A1A1A]/20 rounded-full overflow-hidden">
          <div className="w-full h-1/2 bg-[#1A1A1A]/60 rounded-full animate-[shimmer_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  )
}
