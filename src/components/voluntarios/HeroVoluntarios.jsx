import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

export default function HeroVoluntarios() {
  const sectionRef = useRef(null)
  const wordsRef = useRef([])
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const statsRef = useRef(null)

  const headline = ['SÉ', 'EL', 'CAMBIO']

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.3 })

      // Word by word reveal
      wordsRef.current.forEach((word, i) => {
        tl.fromTo(word,
          { opacity: 0, y: 80, rotateX: -20 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.7, transformOrigin: 'center bottom' },
          i === 0 ? '+=0' : '-=0.45'
        )
      })

      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.3'
      )
      .fromTo(ctaRef.current?.children ? Array.from(ctaRef.current.children) : [],
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12 },
        '-=0.4'
      )
      .fromTo(statsRef.current?.children ? Array.from(statsRef.current.children) : [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        '-=0.3'
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#F5C800] flex items-center overflow-hidden pt-20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#E0B400] opacity-30" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }} />
        <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full border-[40px] border-[#E0B400] opacity-25" />
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#D72638]"
            style={{
              width: 4 + i * 2,
              height: 4 + i * 2,
              top: `${15 + i * 12}%`,
              right: `${5 + i * 3}%`,
              opacity: 0.25 + i * 0.06
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full py-20">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-10 h-0.5 bg-[#D72638]" />
            <span className="text-[#D72638] font-bold text-xs tracking-[0.2em] uppercase">Voluntariado PBG</span>
          </div>

          {/* Big headline word by word */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 perspective-[800px]">
            {headline.map((word, i) => (
              <span
                key={i}
                ref={el => wordsRef.current[i] = el}
                className="font-black text-[#1A1A1A] leading-none tracking-tighter block"
                style={{ fontSize: 'clamp(5rem, 15vw, 12rem)', opacity: 0 }}
              >
                {word}
              </span>
            ))}
            <span
              className="font-black leading-none tracking-tighter block"
              ref={el => wordsRef.current[3] = el}
              style={{ fontSize: 'clamp(5rem, 15vw, 12rem)', color: '#D72638', opacity: 0 }}
            >
              HOY.
            </span>
          </div>

          <p
            ref={subtitleRef}
            className="text-[#1A1A1A]/65 font-medium leading-relaxed mb-10 max-w-lg"
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', opacity: 0 }}
          >
            Únete a nuestra red de voluntarios y personeros. Tu compromiso puede transformar comunidades enteras.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4 mb-16">
            <a
              href="#voluntarios-form"
              className="bg-[#D72638] text-white font-bold px-8 py-4 rounded-full hover:bg-[#B81F2E] transition-all duration-200 hover:-translate-y-1 text-sm tracking-wide"
              style={{ opacity: 0, boxShadow: '0 8px 24px rgba(215,38,56,0.4)' }}
            >
              Quiero ser voluntario →
            </a>
            <a
              href="#meetings"
              className="bg-[#1A1A1A] text-[#F5C800] font-bold px-8 py-4 rounded-full hover:bg-[#2D2D2D] transition-all duration-200 hover:-translate-y-1 text-sm tracking-wide"
              style={{ opacity: 0 }}
            >
              Ver próximas reuniones
            </a>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="flex flex-wrap gap-10 pt-10 border-t border-[#1A1A1A]/15"
          >
            {[
              { num: '850+', label: 'Voluntarios activos' },
              { num: '32', label: 'Municipios' },
              { num: '210+', label: 'Personeros registrados' },
              { num: '18', label: 'Reuniones al mes' },
            ].map((s, i) => (
              <div key={i} style={{ opacity: 0 }}>
                <div className="font-black text-[#1A1A1A] text-3xl tracking-tight">{s.num}</div>
                <div className="text-[#1A1A1A]/50 text-xs font-semibold tracking-widest uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
