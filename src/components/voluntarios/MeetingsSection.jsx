import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MEETINGS = [
  {
    id: 1,
    title: 'Reunión general de voluntarios — Zona Norte',
    date: 'Sáb 29 Mar 2026',
    time: '10:00 AM',
    location: 'Sede Principal PBG — Auditorio',
    type: 'Presencial',
    desc: 'Sesión de coordinación territorial, distribución de tareas y actualización del plan de campaña para municipios del norte.',
  },
  {
    id: 2,
    title: 'Capacitación de personeros electorales',
    date: 'Mié 2 Abr 2026',
    time: '6:00 PM',
    location: 'Zoom — Link en grupo WhatsApp',
    type: 'Virtual',
    desc: 'Entrenamiento sobre protocolos de vigilancia electoral, manejo de actas y comunicación con el comando de campaña.',
  },
  {
    id: 3,
    title: 'Taller de comunicación digital',
    date: 'Sáb 5 Abr 2026',
    time: '9:00 AM',
    location: 'CasaPBG — Sala de medios',
    type: 'Presencial',
    desc: 'Aprende a crear contenido efectivo para redes sociales, manejar herramientas de diseño y maximizar el alcance digital.',
  },
  {
    id: 4,
    title: 'Encuentro de líderes municipales',
    date: 'Dom 13 Abr 2026',
    time: '3:00 PM',
    location: 'Club Comunitario — Salón Rojo',
    type: 'Presencial',
    desc: 'Reunión de coordinadores zonales para alinear estrategia, resolver bloqueos y planificar eventos de cierre de campaña.',
  },
]

export default function MeetingsSection() {
  const sectionRef = useRef(null)
  const [openId, setOpenId] = useState(null)
  const accordionRefs = useRef({})

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.meeting-item'),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const toggle = (id) => {
    const content = accordionRefs.current[id]
    if (!content) return

    if (openId === id) {
      // Close
      gsap.to(content, {
        height: 0, opacity: 0, duration: 0.35,
        ease: 'power2.inOut',
        onComplete: () => setOpenId(null)
      })
    } else {
      // Close previous if open
      if (openId && accordionRefs.current[openId]) {
        gsap.to(accordionRefs.current[openId], {
          height: 0, opacity: 0, duration: 0.3, ease: 'power2.inOut'
        })
      }
      setOpenId(id)
      gsap.set(content, { height: 'auto', opacity: 1 })
      const fullHeight = content.scrollHeight
      gsap.fromTo(content,
        { height: 0, opacity: 0 },
        { height: fullHeight, opacity: 1, duration: 0.45, ease: 'power3.out' }
      )
    }
  }

  return (
    <section
      ref={sectionRef}
      id="meetings"
      className="bg-[#F5C800] py-24 md:py-32 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-0.5 bg-[#D72638]" />
          <span className="text-[#D72638] font-bold text-xs tracking-[0.2em] uppercase">Reuniones</span>
        </div>
        <h2
          className="font-black text-[#1A1A1A] leading-tight mb-12"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
        >
          Próximas sesiones
        </h2>

        <div className="flex flex-col gap-3">
          {MEETINGS.map((m) => (
            <div
              key={m.id}
              className="meeting-item bg-white rounded-2xl overflow-hidden cursor-pointer"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.07)', opacity: 0 }}
              onClick={() => toggle(m.id)}
            >
              {/* Header */}
              <div className="flex items-center gap-4 p-6">
                {/* Date pill */}
                <div className="flex-shrink-0 text-center bg-[#F5C800] rounded-xl px-3 py-2 min-w-[56px]">
                  <div className="text-[#1A1A1A] font-black text-xl leading-none">
                    {m.date.split(' ')[1]}
                  </div>
                  <div className="text-[#1A1A1A]/60 text-[10px] font-bold uppercase tracking-wider mt-0.5">
                    {m.date.split(' ')[2]}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: m.type === 'Virtual' ? 'rgba(215,38,56,0.1)' : 'rgba(26,26,26,0.07)',
                        color: m.type === 'Virtual' ? '#D72638' : '#1A1A1A'
                      }}
                    >
                      {m.type}
                    </span>
                    <span className="text-[#1A1A1A]/40 text-xs">{m.time}</span>
                  </div>
                  <h4 className="font-black text-[#1A1A1A] text-base leading-tight truncate">{m.title}</h4>
                  <p className="text-[#1A1A1A]/45 text-xs font-medium mt-0.5 truncate">{m.location}</p>
                </div>

                {/* Toggle arrow */}
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F5C800] flex items-center justify-center transition-transform duration-300"
                  style={{ transform: openId === m.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>

              {/* Accordion content */}
              <div
                ref={el => accordionRefs.current[m.id] = el}
                style={{ height: 0, opacity: 0, overflow: 'hidden' }}
              >
                <div className="px-6 pb-6 pt-0">
                  <div className="h-px bg-[#1A1A1A]/8 mb-4" />
                  <p className="text-[#1A1A1A]/65 text-sm font-medium leading-relaxed mb-4">{m.desc}</p>
                  <div className="flex gap-3">
                    <a
                      href={`https://chat.whatsapp.com/pbg-grupo`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#D72638] text-white font-bold text-xs px-4 py-2.5 rounded-full hover:bg-[#B81F2E] transition-colors"
                      onClick={e => e.stopPropagation()}
                    >
                      Confirmar asistencia
                    </a>
                    <button
                      className="bg-[#1A1A1A]/8 text-[#1A1A1A] font-bold text-xs px-4 py-2.5 rounded-full hover:bg-[#1A1A1A]/15 transition-colors"
                      onClick={e => e.stopPropagation()}
                    >
                      Añadir al calendario
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
