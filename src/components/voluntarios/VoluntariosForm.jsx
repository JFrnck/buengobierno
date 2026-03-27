import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ROLES_OPTIONS = ['Voluntario de base', 'Personero electoral', 'Comunicador digital', 'Líder zonal', 'Logística y eventos']

export default function VoluntariosForm() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const [selected, setSelected] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleFocus = (e) => {
    gsap.to(e.target, { borderColor: '#D72638', duration: 0.25 })
  }
  const handleBlur = (e) => {
    if (!e.target.value) gsap.to(e.target, { borderColor: 'rgba(26,26,26,0.2)', duration: 0.2 })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const btn = e.target.querySelector('button[type="submit"]')
    const tl = gsap.timeline()
    tl.to(btn, { scale: 0.94, duration: 0.1 })
      .to(btn, { scale: 1, duration: 0.3, ease: 'back.out(2)' })
      .add(() => setSubmitted(true), '-=0.1')
  }

  return (
    <section
      id="voluntarios-form"
      ref={sectionRef}
      className="bg-[#F5C800] py-24 md:py-32 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-0.5 bg-[#D72638]" />
            <span className="text-[#D72638] font-bold text-xs tracking-[0.2em] uppercase">Inscripción</span>
            <span className="w-10 h-0.5 bg-[#D72638]" />
          </div>
          <h2
            className="font-black text-[#1A1A1A] leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
          >
            Únete al equipo hoy
          </h2>
        </div>

        <div
          ref={formRef}
          className="bg-white rounded-3xl p-8 md:p-12"
          style={{ boxShadow: '0 16px 64px rgba(0,0,0,0.12)', opacity: 0 }}
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              <div className="grid md:grid-cols-2 gap-7">
                <div className="form-field">
                  <label className="block text-xs font-bold tracking-widest uppercase text-[#1A1A1A]/50 mb-2">Nombre</label>
                  <input className="pbg-input" type="text" placeholder="Tu nombre" onFocus={handleFocus} onBlur={handleBlur} required />
                </div>
                <div className="form-field">
                  <label className="block text-xs font-bold tracking-widest uppercase text-[#1A1A1A]/50 mb-2">Apellido</label>
                  <input className="pbg-input" type="text" placeholder="Tu apellido" onFocus={handleFocus} onBlur={handleBlur} required />
                </div>
              </div>
              <div className="form-field">
                <label className="block text-xs font-bold tracking-widest uppercase text-[#1A1A1A]/50 mb-2">Correo electrónico</label>
                <input className="pbg-input" type="email" placeholder="correo@ejemplo.com" onFocus={handleFocus} onBlur={handleBlur} required />
              </div>
              <div className="grid md:grid-cols-2 gap-7">
                <div className="form-field">
                  <label className="block text-xs font-bold tracking-widest uppercase text-[#1A1A1A]/50 mb-2">Teléfono</label>
                  <input className="pbg-input" type="tel" placeholder="+57 300 000 0000" onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div className="form-field">
                  <label className="block text-xs font-bold tracking-widest uppercase text-[#1A1A1A]/50 mb-2">Municipio</label>
                  <input className="pbg-input" type="text" placeholder="Tu municipio" onFocus={handleFocus} onBlur={handleBlur} required />
                </div>
              </div>

              {/* Role selector */}
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-[#1A1A1A]/50 mb-3">¿En qué quieres participar?</label>
                <div className="flex flex-wrap gap-2">
                  {ROLES_OPTIONS.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelected(role)}
                      className="text-xs font-bold px-4 py-2.5 rounded-full border-2 transition-all duration-200"
                      style={{
                        borderColor: selected === role ? '#D72638' : 'rgba(26,26,26,0.15)',
                        background: selected === role ? '#D72638' : 'transparent',
                        color: selected === role ? 'white' : 'rgba(26,26,26,0.65)',
                      }}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#D72638] text-white font-black py-4 px-8 rounded-full text-sm tracking-wide hover:bg-[#B81F2E] transition-colors duration-200 mt-2 w-full"
                style={{ boxShadow: '0 8px 24px rgba(215,38,56,0.4)' }}
              >
                Registrarme como voluntario →
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center py-12 text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-[#F5C800] flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 className="font-black text-[#1A1A1A] text-2xl tracking-tight">¡Ya eres parte del PBG!</h3>
              <p className="text-[#1A1A1A]/60 font-medium text-sm max-w-xs leading-relaxed">
                Bienvenido a la familia. Recibirás instrucciones en tu correo y serás añadido al grupo de coordinación.
              </p>
              {/* <a
                href="https://chat.whatsapp.com/pbg-grupo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#1ebe57] transition-colors mt-2"
              >
                Unirse al grupo de WhatsApp
              </a> */}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
