import { useRef, useEffect } from 'react'
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
  const triggerRef = useRef(null)
  const trackRef = useRef(null)
  const headingRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(headingRef.current?.children ? Array.from(headingRef.current.children) : [],
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
        }
      )

      const mm = gsap.matchMedia()

      // Desktop: horizontal scroll
      mm.add('(min-width: 768px)', () => {
        const panels = trackRef.current?.querySelectorAll('.plan-panel')
        if (!panels || !trackRef.current) return

        const totalWidth = trackRef.current.scrollWidth - window.innerWidth
        const tween = gsap.to(trackRef.current, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: true,
            scrub: 1.2,
            end: () => `+=${totalWidth * 1.2}`,
            snap: {
              snapTo: 1 / (panels.length - 1),
              duration: { min: 0.2, max: 0.5 },
              delay: 0.05,
              ease: 'power2.inOut'
            },
            onUpdate: (self) => {
              // Animate internal content as panels scroll in
              panels.forEach((panel, i) => {
                const progress = self.progress
                const panelProgress = Math.max(0, Math.min(1,
                  (progress - i / panels.length) * panels.length
                ))
                const content = panel.querySelector('.panel-content')
                if (content) {
                  const items = content.querySelectorAll('.panel-item')
                  items.forEach((item, j) => {
                    const delay = j * 0.15
                    const itemProgress = Math.max(0, Math.min(1, (panelProgress - delay) * 2))
                    item.style.opacity = itemProgress
                    item.style.transform = `translateY(${(1 - itemProgress) * 20}px)`
                  })
                }
              })
            }
          }
        })
        return () => { tween.kill(); }
      })

      // Mobile: vertical stacked layout
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
    <section ref={sectionRef} id="plan" className="bg-[#F5C800] py-20">
      {/* Heading — outside pinned area */}
      <div ref={headingRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-16">
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

      {/* Pinned horizontal scroll container */}
      <div ref={triggerRef} className="overflow-hidden">
        {/* Desktop: horizontal track */}
        <div
          ref={trackRef}
          className="hidden md:flex gap-5 px-6 md:px-12 lg:px-20 pb-8"
          style={{ width: 'max-content' }}
        >
          {PANELS.map((p, i) => (
            <PlanPanel key={i} panel={p} index={i} />
          ))}
          {/* End spacer panel */}
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

        {/* Mobile: vertical stacked */}
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
      className="plan-panel flex-shrink-0 w-[85vw] md:w-[500px] lg:w-[560px] h-auto md:h-[520px] rounded-3xl overflow-hidden"
      style={{
        background: isLight ? '#1A1A1A' : 'white',
        boxShadow: '0 8px 40px rgba(0,0,0,0.12)'
      }}
    >
      <div className="panel-content h-full flex flex-col p-10 md:p-12">
        {/* Number */}
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

        {/* Title */}
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

        {/* Body */}
        <p
          className="text-sm leading-relaxed font-medium mb-8 flex-shrink-0"
          style={{ color: isLight ? 'rgba(255,255,255,0.6)' : 'rgba(26,26,26,0.6)' }}
        >
          {panel.body}
        </p>

        {/* Items */}
        <div className="flex flex-col gap-3 mt-auto">
          {panel.items.map((item, j) => (
            <div
              key={j}
              className="panel-item flex items-center gap-3"
              style={{ opacity: 1 }}
            >
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
