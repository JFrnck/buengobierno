import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { num: '210+', label: 'Personeros inscritos' },
  { num: '32', label: 'Municipios cubiertos' },
  { num: '98%', label: 'Mesas vigiladas' },
  { num: '3', label: 'Capacitaciones anuales' },
]

export default function PersonerosSection() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Left text — from left
      gsap.fromTo(leftRef.current?.children ? Array.from(leftRef.current.children) : [],
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 82%' }
        }
      )

      // Right image block — parallax + reveal
      gsap.fromTo(rightRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 82%' }
        }
      )

      gsap.to(rightRef.current?.querySelector('.parallax-img'),
        {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#F5C800] py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div ref={leftRef}>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-0.5 bg-[#D72638]" />
              <span className="text-[#D72638] font-bold text-xs tracking-[0.2em] uppercase">Personeros Electorales</span>
            </div>
            <h2
              className="font-black text-[#1A1A1A] leading-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
            >
              Guardianes de la democracia
            </h2>
            <p className="text-[#1A1A1A]/65 font-medium leading-relaxed mb-5 text-base">
              Los personeros del PBG son ciudadanos capacitados que vigilan las mesas de votación, garantizan la transparencia del proceso y denuncian irregularidades en tiempo real.
            </p>
            <p className="text-[#1A1A1A]/65 font-medium leading-relaxed mb-8 text-base">
              Su presencia en cada mesa es fundamental para asegurar que cada voto cuente y sea contado correctamente.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5">
              {STATS.map((s, i) => (
                <div key={i} className="bg-white rounded-xl p-5" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
                  <div className="font-black text-[#D72638] text-3xl tracking-tight">{s.num}</div>
                  <div className="text-[#1A1A1A]/55 text-xs font-semibold mt-1 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>

            <a
              href="#voluntarios-form"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] text-[#F5C800] font-bold px-7 py-3.5 rounded-full hover:bg-[#2D2D2D] transition-all duration-200 hover:-translate-y-0.5 text-sm mt-8"
            >
              Ser personero
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Right — visual block */}
          <div ref={rightRef} className="relative" style={{ opacity: 0 }}>
            <div className="relative overflow-hidden rounded-3xl" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
              <div
                className="parallax-inner parallax-img bg-[#E0B400] h-[480px] flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-[#1A1A1A]/20 font-black text-[8rem] leading-none tracking-tighter">📋</div>
                  <p className="text-[#1A1A1A]/40 font-medium text-sm mt-2">Imagen de personeros electorales</p>
                </div>
              </div>
              {/* Overlay badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4">
                <p className="font-black text-[#1A1A1A] text-base tracking-tight">210+ personeros</p>
                <p className="text-[#1A1A1A]/55 text-xs font-medium mt-0.5">en 32 municipios de la región</p>
                <div className="mt-3 flex gap-1">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-[#F5C800] border-2 border-white flex items-center justify-center -ml-1 first:ml-0">
                      <div className="w-3 h-3 rounded-full bg-[#1A1A1A]/30" />
                    </div>
                  ))}
                  <div className="w-6 h-6 rounded-full bg-[#D72638] border-2 border-white flex items-center justify-center -ml-1 text-white text-[8px] font-black">
                    +202
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
