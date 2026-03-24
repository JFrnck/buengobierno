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
    items: ['Portal de datos abiertos', 'Auditorías ciudadanas', 'Rendición de cuentas', 'Cero contratos a dedo'],
    accent: '#D72638',
  },
  {
    num: '02',
    title: 'Educación Sin Barreras',
    subtitle: 'Capital Humano',
    body: 'Construcción de 12 nuevas aulas tecnológicas. 3.000 becas universitarias para jóvenes con mérito.',
    items: ['12 nuevas aulas tech', '3.000 becas completas', 'Programa bilingüe', 'Capacitación docente'],
    accent: '#1A1A1A',
  },
  {
    num: '03',
    title: 'Salud Territorial',
    subtitle: 'Bienestar Colectivo',
    body: 'Red de 8 centros de salud primaria en comunas periféricas. Telemedicina prioritaria para adultos mayores.',
    items: ['8 nuevos centros', 'Telemedicina 24/7', 'Adultos mayores 1ro', 'Salud mental'],
    accent: '#D72638',
  },
  {
    num: '04',
    title: 'Economía Local',
    subtitle: 'Desarrollo Productivo',
    body: 'Fondo de $500M para emprendedores locales. Alianzas universitarias para incubación de startups.',
    items: ['$500M para PYMES', 'Incubadora municipal', 'Ferias de empleo', 'Capacitación tech'],
    accent: '#1A1A1A',
  },
  {
    num: '05',
    title: 'Ciudad Sostenible',
    subtitle: 'Medio Ambiente',
    body: 'Plan de arborización masiva. Reciclaje obligatorio con incentivos. 100% energía renovable pública.',
    items: ['10.000 árboles', 'Paneles solares', 'Red de ciclovías', 'Cero plástico'],
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
      // 1. Animación del Encabezado
      gsap.fromTo(headingRef.current?.children ? Array.from(headingRef.current.children) : [],
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
        }
      )

      const mm = gsap.matchMedia()

      // 2. Desktop: Scroll Horizontal + Container Animation
      mm.add('(min-width: 768px)', () => {
        const panels = gsap.utils.toArray('.plan-panel')
        if (!panels.length || !trackRef.current) return

        // Calculamos la distancia exacta de desplazamiento
        const trackWidth = trackRef.current.scrollWidth
        const windowWidth = window.innerWidth
        const xMove = trackWidth - windowWidth

        // Animación maestra que mueve el track horizontalmente
        const scrollTween = gsap.to(trackRef.current, {
          x: -xMove,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: true,
            scrub: 1,
            end: () => `+=${xMove}`,
          }
        })

        // Animaciones internas: Se disparan cuando cada panel llega al centro
        panels.forEach((panel) => {
          const contentElements = panel.querySelectorAll('.anim-target')
          
          // Estado inicial invisible y desplazado
          gsap.set(contentElements, { opacity: 0.2, y: 30, scale: 0.95 })

          // Animación activada por la posición dentro del contenedor
          gsap.to(contentElements, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween, // Vincula al scroll horizontal
              start: 'left center+=300',       // Inicia cuando entra al campo de visión
              end: 'center center',            // Termina cuando está perfectamente centrado
              scrub: 1,                        // Efecto fluido al hacer scroll
            }
          })
        })

        return () => { scrollTween.kill() }
      })

      // 3. Mobile: Scroll Vertical Tradicional
      mm.add('(max-width: 767px)', () => {
        const panels = gsap.utils.toArray('.plan-panel')
        panels.forEach((panel) => {
          gsap.fromTo(panel,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
              scrollTrigger: { trigger: panel, start: 'top 80%' }
            }
          )
        })
      })
    }, sectionRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="plan" className="bg-[#F5C800] py-12 md:py-20 overflow-hidden">
      {/* Encabezado */}
      <div ref={headingRef} className="max-w-7xl mx-auto px-6 md:px-[5vw] lg:px-[10vw] mb-10 md:mb-16">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-0.5 bg-[#D72638]" />
          <span className="text-[#D72638] font-bold text-xs tracking-[0.2em] uppercase">Plan de Gobierno</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:justify-between">
          <h2 className="font-black text-[#1A1A1A] leading-tight max-w-xl text-4xl md:text-5xl lg:text-6xl tracking-tight">
            5 ejes que definen nuestro gobierno
          </h2>
          <p className="text-[#1A1A1A]/70 font-medium max-w-xs text-sm leading-relaxed">
            Desliza horizontalmente para explorar cada pilar del programa de gobierno.
          </p>
        </div>
      </div>

      {/* Contenedor del Scroll */}
      <div ref={triggerRef}>
        {/* Track Desktop */}
        <div
          ref={trackRef}
          className="hidden md:flex gap-6 lg:gap-8 px-[5vw] lg:px-[10vw] pb-10"
          style={{ width: 'max-content' }}
        >
          {PANELS.map((p, i) => (
            <PlanPanel key={i} panel={p} index={i} />
          ))}
          {/* Panel de Cierre */}
          <div className="w-[60vw] md:w-[400px] flex-shrink-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-[#1A1A1A]/20 font-black text-7xl md:text-8xl tracking-tighter mb-2">FIN</div>
              <a href="#contacto" className="inline-block mt-4 bg-[#1A1A1A] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#D72638] transition-colors">
                Únete al voluntariado
              </a>
            </div>
          </div>
        </div>

        {/* Stack Mobile */}
        <div className="md:hidden flex flex-col gap-6 px-6">
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
      className="plan-panel flex-shrink-0 w-full md:w-[400px] lg:w-[450px] h-auto md:h-[450px] rounded-3xl overflow-hidden"
      style={{
        background: isLight ? '#1A1A1A' : 'white',
        boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
      }}
    >
      <div className="h-full flex flex-col p-8 md:p-10">
        {/* Número y Etiqueta */}
        <div className="anim-target flex items-center justify-between mb-6">
          <span
            className="font-black text-6xl leading-none tracking-tighter"
            style={{ color: isLight ? 'rgba(245,200,0,0.3)' : 'rgba(26,26,26,0.1)' }}
          >
            {panel.num}
          </span>
          <span
            className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
            style={{
              background: isLight ? 'rgba(245,200,0,0.15)' : 'rgba(215,38,56,0.1)',
              color: isLight ? '#F5C800' : '#D72638'
            }}
          >
            {panel.subtitle}
          </span>
        </div>

        {/* Título */}
        <h3
          className="anim-target font-black text-2xl lg:text-3xl leading-tight mb-3"
          style={{ letterSpacing: '-0.02em', color: isLight ? '#FFFFFF' : '#1A1A1A' }}
        >
          {panel.title}
        </h3>

        {/* Cuerpo */}
        <p
          className="anim-target text-sm leading-relaxed font-medium mb-6 line-clamp-3"
          style={{ color: isLight ? 'rgba(255,255,255,0.6)' : 'rgba(26,26,26,0.6)' }}
        >
          {panel.body}
        </p>

        {/* Items (Viñetas) */}
        <div className="mt-auto flex flex-col gap-2.5">
          {panel.items.map((item, j) => (
            <div key={j} className="anim-target flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: isLight ? '#F5C800' : '#D72638' }}
              >
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={isLight ? '#1A1A1A' : 'white'} strokeWidth="3.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span
                className="text-sm font-semibold"
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