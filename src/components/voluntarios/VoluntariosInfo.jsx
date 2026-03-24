import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ROLES = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Movilización Territorial',
    desc: 'Visita puerta a puerta, distribución de material, organización de eventos en barrios y veredas.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: 'Comunicación Digital',
    desc: 'Gestión de redes sociales, creación de contenido, difusión de propuestas y cobertura de eventos.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Acompañamiento Electoral',
    desc: 'Testigos electorales, observadores en mesas y asistencia en jornada de votación.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: 'Logística y Organización',
    desc: 'Coordinación de actos públicos, manejo de recursos y apoyo administrativo al partido.',
  },
]

export default function VoluntariosInfo() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const rolesRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Left text block
      gsap.fromTo(textRef.current?.children ? Array.from(textRef.current.children) : [],
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 82%' }
        }
      )

      // Role cards
      const cards = rolesRef.current ? Array.from(rolesRef.current.children) : []
      gsap.fromTo(cards,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: rolesRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#F5C800] py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <div ref={textRef}>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-0.5 bg-[#D72638]" />
              <span className="text-[#D72638] font-bold text-xs tracking-[0.2em] uppercase">¿Qué hacen?</span>
            </div>
            <h2
              className="font-black text-[#1A1A1A] leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
            >
              Los voluntarios son el corazón del partido
            </h2>
            <p className="text-[#1A1A1A]/65 font-medium leading-relaxed mb-6 text-base">
              Sin importar tu profesión, edad o disponibilidad, hay un rol perfecto para ti dentro del PBG. Cada acción suma al cambio que queremos ver.
            </p>
            <p className="text-[#1A1A1A]/65 font-medium leading-relaxed mb-8 text-base">
              Los voluntarios trabajan en equipos organizados por municipio, con líderes de zona y reuniones periódicas de coordinación.
            </p>
            <a
              href="#voluntarios-form"
              className="inline-flex items-center gap-2 bg-[#D72638] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#B81F2E] transition-all duration-200 hover:-translate-y-0.5 text-sm"
              style={{ boxShadow: '0 6px 20px rgba(215,38,56,0.35)' }}
            >
              Inscribirme como voluntario
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Roles grid */}
          <div ref={rolesRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ROLES.map((r, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300 cursor-default"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#FFF5D9] flex items-center justify-center text-[#D72638] mb-4">
                  {r.icon}
                </div>
                <h4 className="font-black text-[#1A1A1A] text-base tracking-tight mb-2">{r.title}</h4>
                <p className="text-[#1A1A1A]/55 text-xs leading-relaxed font-medium">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
