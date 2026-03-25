import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PANELS = [
  {
    num: '01',
    title: 'Transparencia Radical',
    subtitle: 'Gobierno Abierto',
    body: 'Publicación en tiempo real de contratos, licitaciones y gastos. Dashboard ciudadano accesible desde cualquier dispositivo.',
    items: ['Portal de datos abiertos', 'Auditorías ciudadanas', 'Rendición de cuentas mensual', 'Sin contratación directa'],
    accent: '#D72638',
  },
  {
    num: '02',
    title: 'Educación Sin Barreras',
    subtitle: 'Capital Humano',
    body: 'Construcción de 12 nuevas aulas tecnológicas. 3.000 becas universitarias para jóvenes con mérito y sin recursos.',
    items: ['12 nuevas aulas tech', '3.000 becas universitarias', 'Programa bilingüe', 'Capacitación docente'],
    accent: '#1A1A1A',
  },
  {
    num: '03',
    title: 'Salud Territorial',
    subtitle: 'Bienestar Colectivo',
    body: 'Red de 8 centros de salud primaria en comunas periféricas. Telemedicina y atención prioritaria para adultos mayores.',
    items: ['8 nuevos centros de salud', 'Telemedicina 24/7', 'Adultos mayores primero', 'Salud mental comunitaria'],
    accent: '#D72638',
  },
  {
    num: '04',
    title: 'Economía Local',
    subtitle: 'Desarrollo Productivo',
    body: 'Fondo de $500M para emprendedores locales. Alianzas con universidades para incubación de startups.',
    items: ['$500M para emprendedores', 'Incubadora municipal', 'Ferias de empleo trimestrales', 'Capacitación PYMES'],
    accent: '#1A1A1A',
  },
  {
    num: '05',
    title: 'Ciudad Sostenible',
    subtitle: 'Medio Ambiente',
    body: 'Plan de arborización urbana masiva. Reciclaje obligatorio con incentivos. 100% energía renovable en edificios públicos.',
    items: ['10.000 árboles plantados', 'Energía solar en colegios', 'Ciclovías conectadas', 'Cero plástico en eventos'],
    accent: '#D72638',
  },
]

export default function PlanSection() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const headingRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Heading — animación vertical de entrada
      gsap.fromTo(headingRef.current?.children ? Array.from(headingRef.current.children) : [],
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
        }
      )

      const mm = gsap.matchMedia()

      // Desktop: Horizontal scroll con containerAnimation
      mm.add('(min-width: 768px)', () => {
        const panels = trackRef.current?.querySelectorAll('.plan-panel')
        if (!panels || !trackRef.current) return

        const totalWidth = trackRef.current.scrollWidth - window.innerWidth

        // 1. MAESTRO: Animación y detonador principal del Scroll
        const scrollTween = gsap.to(trackRef.current, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current, // <-- DETONADOR: Observa toda la sección amarilla
            start: 'top 30px',            // <-- DETONADOR: Activa cuando el top de la sección toca el top de la pantalla
            pin: true,                   // Fija la sección para que no se mueva verticalmente
            scrub: 1.2,
            end: () => `+=${totalWidth}`,
            snap: {
              snapTo: 1 / (panels.length - 1),
              duration: { min: 0.2, max: 0.5 },
              delay: 0.05,
              ease: 'power2.inOut'
            },
          }
        })

        // 2. Animaciones internas de cada panel
        panels.forEach((panel, index) => {
          const contentMain = panel.querySelectorAll('.panel-main-content > *');
          const listItems = panel.querySelectorAll('.panel-item');
          const allElements = [...contentMain, ...listItems];

          // Estado inicial oculto
          gsap.set(allElements, { opacity: 0, y: 30 })

          gsap.to(allElements, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween, // Se vincula al movimiento horizontal
              // El primer panel ya está en pantalla, así que lo disparamos de inmediato ('left 200%').
              // Los demás paneles se disparan cuando su borde izquierdo entra al 85% de la pantalla ('left 85%').
              start: index === 0 ? 'left 200%' : 'left 85%',
              toggleActions: 'play none none reverse',
            }
          })
        })

        return () => { scrollTween.kill(); }
      })

      // Mobile: Layout apilado vertical
      mm.add('(max-width: 767px)', () => {
        const panels = sectionRef.current?.querySelectorAll('.plan-panel')
        if (!panels) return
        panels.forEach((panel) => {
          gsap.fromTo(panel,
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
              scrollTrigger: { trigger: panel, start: 'top 85%' }
            }
          )
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="plan" className="bg-[#F5C800] py-20 overflow-hidden">
      {/* Encabezado */}
      <div ref={headingRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-0.5 bg-[#D72638]" />
          <span className="text-[#D72638] font-bold text-xs tracking-[0.2em] uppercase">Plan de Gobierno</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:justify-between">
          <h2
            className="font-black text-[#1A1A1A] leading-tight max-w-xl"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', letterSpacing: '-0.025em' }}
          >
            5 ejes que definen nuestro gobierno
          </h2>
          <p className="text-[#1A1A1A]/60 font-medium max-w-xs text-sm leading-relaxed">
            Desliza horizontalmente para explorar cada pilar del programa de gobierno del PBG.
          </p>
        </div>
      </div>

      {/* Track Horizontal */}
      <div>
        {/* Desktop */}
        <div
          ref={trackRef}
          className="hidden md:flex gap-5 px-6 md:px-12 lg:px-20 pb-8"
          style={{ width: 'max-content' }}
        >
          {PANELS.map((p, i) => (
            <PlanPanel key={i} panel={p} index={i} />
          ))}
          {/* Panel final (Spacer) */}
          <div className="w-[calc(100vw-10rem)] flex-shrink-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-[#1A1A1A]/30 font-black text-8xl tracking-tighter mb-4">FIN</div>
              <p className="text-[#1A1A1A]/50 font-medium">¿Tienes preguntas sobre el plan?</p>
              <a href="#contacto" className="inline-block mt-4 bg-[#D72638] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#B81F2E] transition-colors">
                Contáctanos
              </a>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col gap-5 px-6">
          {PANELS.map((p, i) => (
            <PlanPanel key={i} panel={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PlanPanel({ panel, index }) {
  const isLight = index % 2 === 0
  return (
    <div
      className="plan-panel flex-shrink-0 w-[85vw] md:w-[480px] h-auto md:h-[480px] rounded-3xl overflow-hidden"
      style={{
        background: isLight ? '#1A1A1A' : 'white',
        boxShadow: '0 8px 40px rgba(0,0,0,0.12)'
      }}
    >
      <div className="panel-content h-full flex flex-col p-10 md:p-12">
        <div className="panel-main-content">
          <div className="flex items-start justify-between mb-8">
            <span
              className="font-black text-7xl leading-none tracking-tighter"
              style={{ color: isLight ? 'rgba(245,200,0,0.25)' : 'rgba(26,26,26,0.08)' }}
            >
              {panel.num}
            </span>
            <span
              className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
              style={{
                background: isLight ? 'rgba(245,200,0,0.15)' : 'rgba(215,38,56,0.1)',
                color: isLight ? '#F5C800' : '#D72638'
              }}
            >
              {panel.subtitle}
            </span>
          </div>

          <h3
            className="font-black leading-tight mb-4 flex-shrink-0"
            style={{
              fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
              letterSpacing: '-0.025em',
              color: isLight ? '#FFFFFF' : '#1A1A1A'
            }}
          >
            {panel.title}
          </h3>

          <p
            className="text-sm leading-relaxed font-medium mb-8 flex-shrink-0 line-clamp-3"
            style={{ color: isLight ? 'rgba(255,255,255,0.6)' : 'rgba(26,26,26,0.6)' }}
          >
            {panel.body}
          </p>
        </div>

        <div className="panel-item-list flex flex-col gap-3 mt-auto">
          {panel.items.map((item, j) => (
            <div key={j} className="panel-item flex items-center gap-3">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: isLight ? '#F5C800' : '#D72638' }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={isLight ? '#1A1A1A' : 'white'} strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span
                className="text-sm font-semibold"
                style={{ color: isLight ? 'rgba(255,255,255,0.85)' : '#1A1A1A' }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}