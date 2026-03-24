import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: 'Vivienda Digna',
    desc: 'Acceso justo a vivienda para todas las familias. Programas de mejoramiento y construcción sostenible.',
    tag: 'Social'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    title: 'Educación de Calidad',
    desc: 'Inversión real en colegios, docentes y tecnología. Becas para jóvenes talentosos sin recursos.',
    tag: 'Educación'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Salud para Todos',
    desc: 'Sistema de salud cercano, eficiente y humano. Más centros de atención primaria en barrios.',
    tag: 'Salud'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Empleo y Economía',
    desc: 'Apoyo a emprendedores locales, atracción de inversión y generación de empleo formal digno.',
    tag: 'Economía'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Seguridad Ciudadana',
    desc: 'Policía comunitaria, cámaras en zonas críticas y programas de prevención del delito.',
    tag: 'Seguridad'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Participación Ciudadana',
    desc: 'Gobierno abierto, presupuesto participativo y consultas populares en decisiones clave.',
    tag: 'Democracia'
  },
]

export default function CardsSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(headingRef.current?.children ? Array.from(headingRef.current.children) : [],
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          }
        }
      )

      // Cards stagger
      const cards = cardsRef.current ? Array.from(cardsRef.current.children) : []
      gsap.fromTo(cards,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          }
        }
      )

      // Hover effect on each card
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -8, scale: 1.02, boxShadow: '0 20px 48px rgba(0,0,0,0.13)', duration: 0.3, ease: 'power2.out' })
        })
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, scale: 1, boxShadow: '0 4px 24px rgba(0,0,0,0.07)', duration: 0.3, ease: 'power2.out' })
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#F5C800] py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-0.5 bg-[#D72638]" />
            <span className="text-[#D72638] font-bold text-xs tracking-[0.2em] uppercase">Nuestros Pilares</span>
          </div>
          <h2
            className="font-black text-[#1A1A1A] leading-tight max-w-2xl"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', letterSpacing: '-0.025em' }}
          >
            Seis compromisos que transformarán la región
          </h2>
          <p className="text-[#1A1A1A]/60 font-medium mt-4 max-w-xl leading-relaxed">
            Propuestas concretas, financiables y verificables. Sin promesas vacías.
          </p>
        </div>

        {/* Cards grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PILLARS.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 cursor-default"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#FFF5D9] flex items-center justify-center text-[#D72638]">
                  {p.icon}
                </div>
                <span className="text-[#D72638] text-xs font-bold tracking-widest uppercase bg-[#D72638]/8 px-3 py-1 rounded-full">
                  {p.tag}
                </span>
              </div>
              <h3 className="font-black text-[#1A1A1A] text-xl tracking-tight mb-3">{p.title}</h3>
              <p className="text-[#1A1A1A]/60 text-sm leading-relaxed font-medium">{p.desc}</p>
              <div className="mt-6 flex items-center gap-2 text-[#D72638] font-bold text-sm group cursor-pointer">
                <span>Leer más</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-200 group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
