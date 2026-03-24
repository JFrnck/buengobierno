import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EVENTS = [
  {
    id: 1,
    date: { day: '05', month: 'ABR', year: '2026' },
    title: 'Gran Marcha por el Buen Gobierno',
    location: 'Plaza Central — Ciudad Capital',
    category: 'Acto masivo',
    hot: true,
    desc: 'El evento de campaña más importante del año. Esperamos más de 10.000 asistentes. Organiza tu grupo y ven con el PBG.',
  },
  {
    id: 2,
    date: { day: '12', month: 'ABR', year: '2026' },
    title: 'Debate Público con Comunidades',
    location: 'Polideportivo Municipal Norte',
    category: 'Debate',
    hot: false,
    desc: 'El candidato responde preguntas directas de la comunidad en un foro abierto y participativo.',
  },
  {
    id: 3,
    date: { day: '19', month: 'ABR', year: '2026' },
    title: 'Cierre de Campaña — Zona Sur',
    location: 'Estadio Olímpico — Gradería Norte',
    category: 'Cierre',
    hot: true,
    desc: 'Acto musical, político y ciudadano para cerrar la campaña del PBG en la zona sur con todo el equipo.',
  },
  {
    id: 4,
    date: { day: '27', month: 'ABR', year: '2026' },
    title: 'Jornada de Capacitación Electoral',
    location: 'Virtual — Plataforma PBG',
    category: 'Capacitación',
    hot: false,
    desc: 'Última sesión antes del día de elecciones. Repaso de protocolos y verificación de listados de voluntarios.',
  },
]

export default function EventosSection() {
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current ? Array.from(cardsRef.current.children) : []

      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
            delay: i * 0.08
          }
        )

        // Title hover
        const title = card.querySelector('.event-title')
        card.addEventListener('mouseenter', () => {
          gsap.to(title, { x: 4, color: '#D72638', duration: 0.25, ease: 'power2.out' })
          gsap.to(card, { y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.13)', duration: 0.3, ease: 'power2.out' })
        })
        card.addEventListener('mouseleave', () => {
          gsap.to(title, { x: 0, color: '#1A1A1A', duration: 0.25 })
          gsap.to(card, { y: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.07)', duration: 0.3 })
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#F5C800] py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-0.5 bg-[#D72638]" />
              <span className="text-[#D72638] font-bold text-xs tracking-[0.2em] uppercase">Agenda de Campaña</span>
            </div>
            <h2
              className="font-black text-[#1A1A1A] leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
            >
              Próximos eventos
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <div className="font-black text-[#1A1A1A]/20 text-8xl leading-none tracking-tighter">2026</div>
          </div>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-5">
          {EVENTS.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl p-6 md:p-8 cursor-pointer"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.07)', opacity: 0 }}
            >
              <div className="flex items-start gap-5">
                {/* Date block */}
                <div className="flex-shrink-0 text-center">
                  <div
                    className="w-16 h-16 rounded-xl flex flex-col items-center justify-center"
                    style={{ background: event.hot ? '#D72638' : '#F5C800' }}
                  >
                    <span
                      className="font-black text-2xl leading-none"
                      style={{ color: event.hot ? 'white' : '#1A1A1A' }}
                    >
                      {event.date.day}
                    </span>
                    <span
                      className="text-[10px] font-bold tracking-widest uppercase mt-0.5"
                      style={{ color: event.hot ? 'rgba(255,255,255,0.7)' : 'rgba(26,26,26,0.5)' }}
                    >
                      {event.date.month}
                    </span>
                  </div>
                  <span className="text-[#1A1A1A]/35 text-[10px] font-bold mt-1 block">{event.date.year}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#1A1A1A]/40 bg-[#1A1A1A]/6 px-2 py-0.5 rounded-full">
                      {event.category}
                    </span>
                    {event.hot && (
                      <span className="text-[10px] font-bold tracking-widest uppercase text-[#D72638] bg-[#D72638]/10 px-2 py-0.5 rounded-full">
                        🔥 Destacado
                      </span>
                    )}
                  </div>
                  <h4 className="event-title font-black text-[#1A1A1A] text-base leading-tight mb-2 transition-colors duration-200">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[#1A1A1A]/45 text-xs font-medium mb-3">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {event.location}
                  </div>
                  <p className="text-[#1A1A1A]/55 text-xs leading-relaxed font-medium">{event.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
