import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PANELS = [
  {
    num: '01',
    title: 'Economía para el Bienestar',
    subtitle: 'Productividad con inclusión',
    body: 'Promovemos una economía moderna, diversificada y sostenible que genere empleo, fortalezca a las MYPE, impulse el agro y convierta la innovación en motor del desarrollo nacional.',
    items: [
      'Diversificación productiva',
      'Innovación y tecnología',
      'Formalización con incentivos',
      'Impulso al agro y las MYPE'
    ],
    accent: '#D72638',
  },
  {
    num: '02',
    title: 'Seguridad y Justicia Firme',
    subtitle: 'Orden con autoridad democrática',
    body: 'Recuperaremos la paz social con una política firme frente al crimen, una justicia más ágil e independiente y una estrategia de prevención que proteja especialmente a nuestros jóvenes.',
    items: [
      'Recuperación del control territorial',
      'Justicia independiente y eficaz',
      'Lucha contra mafias y economías criminales',
      'Prevención del delito juvenil'
    ],
    accent: '#1A1A1A',
  },
  {
    num: '03',
    title: 'Estado Íntegro y Cercano',
    subtitle: 'Gestión pública al servicio de la gente',
    body: 'Queremos un Estado honesto, eficiente y descentralizado, capaz de rendir cuentas, usar bien los recursos públicos y responder con resultados concretos en cada región del país.',
    items: [
      'Meritocracia en el servicio público',
      'Presupuesto con trazabilidad total',
      'Auditoría y control digital',
      'Descentralización efectiva'
    ],
    accent: '#D72638',
  },
  {
    num: '04',
    title: 'Desarrollo Humano Integral',
    subtitle: 'Oportunidades para todos',
    body: 'Nuestro gobierno pondrá a las personas en el centro: educación de calidad, salud preventiva, protección social y defensa efectiva de los derechos de quienes más lo necesitan.',
    items: [
      'Educación para el siglo XXI',
      'Salud universal y preventiva',
      'Protección de mujeres y juventudes',
      'Inclusión de poblaciones vulnerables'
    ],
    accent: '#1A1A1A',
  },
  {
    num: '05',
    title: 'Sostenibilidad y Futuro Verde',
    subtitle: 'Crecimiento con responsabilidad',
    body: 'Impulsamos un desarrollo que cuide nuestros recursos, promueva energías limpias, proteja la biodiversidad y prepare al país para enfrentar el cambio climático con resiliencia.',
    items: [
      'Transición energética',
      'Defensa del patrimonio natural',
      'Bioeconomía amazónica',
      'Adaptación climática'
    ],
    accent: '#D72638',
  },
  {
    num: '06',
    title: 'Integración y Conectividad',
    subtitle: 'Un país que avanza unido',
    body: 'Integraremos el territorio con infraestructura, conectividad digital y planificación urbana sostenible para reducir brechas, dinamizar la economía y acercar oportunidades a todos.',
    items: [
      'Infraestructura estratégica',
      'Transporte multimodal',
      'Cierre de brecha digital',
      'Ciudades seguras y resilientes'
    ],
    accent: '#1A1A1A',
  },
]

export default function PlanSection() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const headingRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.children ? Array.from(headingRef.current.children) : [],
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
        }
      )

      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const panels = trackRef.current?.querySelectorAll('.plan-panel')
        if (!panels || !trackRef.current) return

        const getScrollAmount = () => trackRef.current.scrollWidth - window.innerWidth

        const scrollTween = gsap.to(trackRef.current, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 35px',
            pin: true,
            scrub: 1,
            end: () => `+=${getScrollAmount()}`,
            invalidateOnRefresh: true,
          }
        })

        panels.forEach((panel) => {
          const contentMain = panel.querySelectorAll('.panel-main-content > *')
          const listItems = panel.querySelectorAll('.panel-item')
          const allElements = [...contentMain, ...listItems]

          gsap.set(allElements, { opacity: 0, y: 30 })

          gsap.to(allElements, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: 'left 85%',
              toggleActions: 'play none none reverse',
            }
          })
        })

        return () => { scrollTween.kill() }
      })

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
            6 ejes que definen nuestro gobierno
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
          {/* Panel final spacer */}
          <div className="w-[calc(100vw-10rem)] flex-shrink-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-[#1A1A1A]/30 font-black text-8xl tracking-tighter mb-4">FIN</div>
              <p className="text-[#1A1A1A]/50 font-medium">¿Tienes preguntas sobre el plan?</p>
              <a
                href="#contacto"
                className="inline-block mt-4 bg-[#D72638] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#B81F2E] transition-colors"
              >
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
      className="plan-panel flex-shrink-0 w-[85vw] md:w-[400px] lg:w-[420px] min-h-[65%] flex flex-col rounded-[2rem] overflow-hidden"
      style={{
        background: isLight ? '#D72638' : 'white',
        boxShadow: '0 8px 40px rgba(0,0,0,0.12)'
      }}
    >
      <div className="panel-content flex-grow flex flex-col p-8 md:p-10">

        <div className="panel-main-content">
          <div className="flex items-start justify-between gap-4 mb-4">
            <span
              className="font-black text-5xl md:text-6xl leading-none tracking-tighter"
              style={{ color: isLight ? 'rgba(245,200,0,0.25)' : 'rgba(26,26,26,0.08)' }}
            >
              {panel.num}
            </span>

            <span
              className="text-[10px] font-bold tracking-widest uppercase px-3 py-2 rounded-2xl text-right leading-tight max-w-[65%]"
              style={{
                background: isLight ? 'rgba(245,200,0,0.15)' : 'rgba(215,38,56,0.1)',
                color: isLight ? '#F5C800' : '#D72638'
              }}
            >
              {panel.subtitle}
            </span>
          </div>

          <h3
            className="font-black leading-tight mb-3"
            style={{
              fontSize: 'clamp(1.2rem, 1.6vw, 1.6rem)',
              letterSpacing: '-0.025em',
              color: isLight ? '#FFFFFF' : '#1A1A1A'
            }}
          >
            {panel.title}
          </h3>

          <p
            className="text-xs leading-relaxed font-medium mb-6"
            style={{ color: isLight ? 'rgba(255,255,255,0.6)' : 'rgba(26,26,26,0.6)' }}
          >
            {panel.body}
          </p>
        </div>

        <div
          className="panel-item-list flex flex-col gap-3 pt-4 border-t"
          style={{ borderColor: isLight ? 'rgba(255,255,255,0.1)' : 'rgba(26,26,26,0.1)' }}
        >
          {panel.items.map((item, j) => (
            <div key={j} className="panel-item flex items-start gap-3">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: isLight ? '#F5C800' : '#D72638' }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={isLight ? '#1A1A1A' : 'white'} strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span
                className="text-xs font-semibold leading-snug"
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
