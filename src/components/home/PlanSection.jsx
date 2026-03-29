import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { NavLink } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger, SplitText)

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
  const titleRef = useRef(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mm = gsap.matchMedia()

    // ─── MÓVIL (hasta 767px) ────────────────────────────────────────────────
    mm.add('(max-width: 767px)', () => {
      let splitTitle = null
      if (!prefersReducedMotion) {
        splitTitle = new SplitText(titleRef.current, { type: 'words' })

        gsap.fromTo(
          headingRef.current?.children ? Array.from(headingRef.current.children) : [],
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )

        gsap.from(splitTitle.words, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            once: true,
          },
        })
      }

      return () => {
        splitTitle?.revert()
        // Limpiar animaciones de GSAP para que no interfieran con el scroll de CSS
        gsap.set(trackRef.current, { clearProps: 'transform' })
        const panels = trackRef.current?.querySelectorAll('.plan-panel')
        if (panels) gsap.set(panels, { clearProps: 'transform,opacity,visibility' })
      }
    })

    // ─── DESKTOP (desde 768px) ──────────────────────────────────────────────
    mm.add('(min-width: 768px)', () => {
      const panels = trackRef.current?.querySelectorAll('.plan-panel')
      if (panels) gsap.set(panels, { force3D: true })

      const splitTitle = new SplitText(titleRef.current, { type: 'words,chars' })

      gsap.fromTo(
        headingRef.current?.children ? Array.from(headingRef.current.children) : [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      )

      gsap.from(splitTitle.words, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.05,
        ease: 'back.out(1.4)',
        force3D: true,
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      })

      if (!panels || !trackRef.current) return

      const getScrollAmount = () => trackRef.current.scrollWidth - window.innerWidth

      const scrollTween = gsap.to(trackRef.current, {
        x: () => -getScrollAmount(),
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 18px',
          pin: true,
          scrub: 1,
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      })

      if (!prefersReducedMotion) {
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
            force3D: true,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: 'left 85%',
              toggleActions: 'play none none reverse',
            },
          })
        })
      }

      return () => {
        splitTitle.revert()
        gsap.set(trackRef.current, { clearProps: 'transform' })
        gsap.set(panels, { clearProps: 'transform,opacity,visibility' })
      }
    })

    return () => {
      mm.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="plan" className="bg-[#F5C800] py-16 md:py-20 overflow-hidden">
      <div ref={headingRef} className="w-full mx-auto px-6 md:px-12 lg:px-20 mb-8 md:mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-0.5 bg-[#D72638]" />
          <span className="text-[#D72638] font-bold text-xs tracking-[0.2em] uppercase">Plan de Gobierno</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end gap-2 md:justify-between">
          <h2
            ref={titleRef}
            className="font-black text-[#D72638] leading-tight w-full md:w-[50%]"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              letterSpacing: '0.030em',
              textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black',
              willChange: 'transform, opacity',
            }}
          >
            6 EJES QUE DEFINEN UN BUEN GOBIERNO
          </h2>
        </div>
      </div>

      <div>
        <div
          ref={trackRef}
          // LA CLAVE ESTÁ AQUÍ: w-full en móvil, md:w-max en desktop
          className="w-full md:w-max flex gap-5 px-6 md:px-12 lg:px-20 pb-8 overflow-x-auto snap-x snap-mandatory md:overflow-visible md:snap-none hide-scrollbar"
          style={{
            willChange: 'transform',
          }}
        >
          {PANELS.map((p, i) => (
            <PlanPanel key={i} panel={p} index={i} />
          ))}
          
          <div className="w-[85vw] md:w-[calc(100vw-10rem)] flex-shrink-0 flex items-center justify-center snap-center md:snap-align-none">
            <div className="text-center">
              <div className="text-[#1A1A1A]/30 font-black text-7xl md:text-8xl tracking-tighter mb-4 leading-none">FIN</div>
              <p className="text-[#1A1A1A]/50 font-medium mb-4">¿Tienes preguntas sobre el plan?</p>
              <NavLink
                to="/plan-de-gobierno"
                className="inline-block bg-[#D72638] text-white font-bold px-8 py-4 rounded-full text-sm md:text-base hover:bg-[#B81F2E] transition-colors shadow-lg"
              >
                Mira el Plan de Gobierno Completo
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}

function PlanPanel({ panel, index }) {
  const isLight = index % 2 === 0

  return (
    <div
      className="plan-panel flex-shrink-0 w-[85vw] md:w-[400px] lg:w-[420px] min-h-[70%] flex flex-col rounded-[2rem] overflow-hidden snap-center md:snap-align-none"
      style={{
        background: isLight ? '#D72638' : 'white',
        boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
        willChange: 'transform, opacity', 
      }}
    >
      <div className="panel-content flex-grow flex flex-col p-6 md:p-10">
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
              style={{ color: isLight ? '#FFFFFF' : '#D72638' }}
            >
              {panel.subtitle}
            </span>
          </div>

          <h3
            className="font-black leading-tight mb-3 text-xl md:text-2xl lg:text-[1.6rem]"
            style={{
              letterSpacing: '-0.025em',
              color: isLight ? '#FFFFFF' : '#1A1A1A',
            }}
          >
            {panel.title}
          </h3>

          <p
            className="text-sm md:text-[15px] leading-relaxed font-medium mb-6"
            style={{ color: isLight ? 'rgba(255,255,255,0.7)' : 'rgba(26,26,26,0.7)' }}
          >
            {panel.body}
          </p>
        </div>

        <div
          className="panel-item-list flex flex-col gap-3 pt-4 border-t mt-auto"
          style={{ borderColor: isLight ? 'rgba(255,255,255,0.1)' : 'rgba(26,26,26,0.1)' }}
        >
          {panel.items.map((item, j) => (
            <div key={j} className="panel-item flex items-start gap-3">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: isLight ? '#F5C800' : '#D72638' }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={isLight ? '#1A1A1A' : 'white'} strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span
                className="text-[11px] md:text-xs font-semibold leading-snug"
                style={{ color: isLight ? 'rgba(255,255,255,0.9)' : '#1A1A1A' }}
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