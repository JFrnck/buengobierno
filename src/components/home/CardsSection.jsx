import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Cortaremos las redes de extorsión desde la raíz',
    desc: 'Implementaremos bloqueadores de señal al 100% en todos los penales del país para 2028 y desplegaremos fuerzas conjuntas de inteligencia para reducir en más del 50% la incidencia de la extorsión. El Estado recuperará el control de las calles.',
    tag: 'Seguridad'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Salud digital y erradicación de la anemia infantil',
    desc: 'Llevaremos la anemia infantil por debajo del 10%. Además, eliminaremos las barreras burocráticas implementando la Historia Clínica Electrónica Única e interoperable, asegurando que con solo tu DNI recibas atención en cualquier establecimiento de salud del país.',
    tag: 'Salud'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    title: 'Crecimiento del 5% y fin del crédito "gota a gota"',
    desc: 'Retomaremos la senda del crecimiento sostenido por encima del 5% anual. Para proteger a nuestros emprendedores, crearemos el Programa Nacional de Crédito Justo, desplazando las mafias informales y ofreciendo financiamiento real y accesible a las MYPE.',
    tag: 'Economía'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    title: 'El 100% de las escuelas públicas con internet',
    desc: 'Cerraremos la brecha digital educativa. Garantizaremos conectividad de banda ancha e infraestructura tecnológica operativa en todas las escuelas y colegios públicos del territorio nacional, asegurando que ningún estudiante se quede fuera del mundo digital.',
    tag: 'Educación'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    title: 'Contrataciones y obras 100% auditables',
    desc: 'La corrupción se combate con luz. Implementaremos la plataforma "Estado Íntegro", haciendo que todas las compras, licitaciones y obras públicas sean 100% digitales, abiertas y trazables en tiempo real por cualquier ciudadano. Cero contrataciones a oscuras.',
    tag: 'Transparencia'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'Cobertura total de luz en zonas rurales',
    desc: 'Llevaremos al país hacia el siglo XXI logrando el 100% de electrificación rural mediante proyectos sostenibles y microrredes de energía limpia. Nadie se quedará atrás en el acceso a servicios básicos, sin importar lo lejos que viva de la capital.',
    tag: 'Infraestructura'
  }
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
            // Ancho reajustado a w-full para mobile y w-[70%] para desktop
            className="font-black text-[#D72638] leading-tight w-full md:w-[70%]"
            style={{ 
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', 
              letterSpacing: '0.030em',
              textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black'
            }}
          >
            SEIS COMPROMISOS QUE TRANSFORMARÁN EL
            <br />
            {/* Clases adaptables al tamaño de fuente en mobile evitando desbordamientos */}
            <span className='text-[#D72638] text-[60px] md:text-[100px]'>P</span>
            <span className='text-[#FFF5D9] text-[60px] md:text-[100px]'>E</span>
            <span className='text-[#D72638] text-[60px] md:text-[100px]'>R</span>
            <span className='text-[#FFF5D9] text-[60px] md:text-[100px]'>Ú</span>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}