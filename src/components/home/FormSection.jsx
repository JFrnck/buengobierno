import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FormSection() {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', city: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleFocus = (e) => {
    const label = e.target.closest('.form-field')?.querySelector('label')
    if (label) gsap.to(label, { color: '#D72638', y: -2, duration: 0.2, ease: 'power2.out' })
    gsap.to(e.target, { borderColor: '#D72638', duration: 0.2 })
  }

  const handleBlur = (e) => {
    const label = e.target.closest('.form-field')?.querySelector('label')
    if (label && !e.target.value) {
      gsap.to(label, { color: 'rgba(26,26,26,0.5)', y: 0, duration: 0.2, ease: 'power2.out' })
    }
    if (!e.target.value) gsap.to(e.target, { borderColor: 'rgba(26,26,26,0.2)', duration: 0.2 })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const btn = e.target.querySelector('button[type="submit"]')
    const tl = gsap.timeline()
    tl.to(btn, { scale: 0.96, duration: 0.1 })
      .to(btn, { scale: 1, duration: 0.2, ease: 'back.out(2)' })
      .add(() => setSubmitted(true))

    gsap.fromTo(
      sectionRef.current.querySelector('.success-msg'),
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 0.3 }
    )
  }

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="bg-[#F5C800] py-24 md:py-32 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-0.5 bg-[#D72638]" />
              <span className="text-[#D72638] font-bold text-xs tracking-[0.2em] uppercase">Contacto</span>
            </div>
            <h2
              className="font-black text-[#1A1A1A] leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
            >
              Sé parte del cambio
            </h2>
            <p className="text-[#1A1A1A]/65 font-medium leading-relaxed mb-10 text-base">
              Regístrate para recibir información sobre el programa de gobierno, eventos de campaña y oportunidades de participación ciudadana.
            </p>
            <div className="flex flex-col gap-5">
              {[
                { icon: '📬', label: 'Correo oficial', value: 'contacto@pbg.com' },
                { icon: '📱', label: 'Teléfono de campaña', value: '+57 300 000 0000' },
                { icon: '📍', label: 'Sede central', value: 'Calle 10 #22-15, Local 3' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#1A1A1A]/8 flex items-center justify-center text-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[#1A1A1A]/50 text-xs font-semibold tracking-wider uppercase">{item.label}</p>
                    <p className="text-[#1A1A1A] font-bold text-sm mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div
            ref={containerRef}
            className="bg-white rounded-3xl p-8 md:p-10"
            style={{ boxShadow: '0 8px 48px rgba(0,0,0,0.1)', opacity: 0 }}
          >
            {!submitted ? (
              <>
                <h3 className="font-black text-[#1A1A1A] text-xl tracking-tight mb-8">
                  Completa tu registro
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                  <div className="form-field">
                    <label className="block text-xs font-bold tracking-widest uppercase text-[#1A1A1A]/50 mb-2 transition-colors duration-200">
                      Nombre completo
                    </label>
                    <input
                      className="pbg-input"
                      type="text"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label className="block text-xs font-bold tracking-widest uppercase text-[#1A1A1A]/50 mb-2 transition-colors duration-200">
                      Correo electrónico
                    </label>
                    <input
                      className="pbg-input"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label className="block text-xs font-bold tracking-widest uppercase text-[#1A1A1A]/50 mb-2 transition-colors duration-200">
                      Ciudad / Municipio
                    </label>
                    <input
                      className="pbg-input"
                      type="text"
                      placeholder="Tu ciudad"
                      value={formData.city}
                      onChange={e => setFormData(p => ({ ...p, city: e.target.value }))}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label className="block text-xs font-bold tracking-widest uppercase text-[#1A1A1A]/50 mb-2 transition-colors duration-200">
                      Mensaje (opcional)
                    </label>
                    <textarea
                      className="pbg-input resize-none"
                      rows={3}
                      placeholder="¿Qué quieres decirnos?"
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#D72638] text-white font-black py-4 px-8 rounded-full text-sm tracking-wide hover:bg-[#B81F2E] transition-colors duration-200 mt-2"
                    style={{ boxShadow: '0 6px 20px rgba(215,38,56,0.35)' }}
                  >
                    Registrarme →
                  </button>
                </form>
              </>
            ) : (
              <div className="success-msg flex flex-col items-center justify-center py-12 text-center gap-4" style={{ opacity: 0 }}>
                <div className="w-16 h-16 rounded-full bg-[#D72638] flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="font-black text-[#1A1A1A] text-2xl tracking-tight">¡Bienvenido!</h3>
                <p className="text-[#1A1A1A]/60 font-medium text-sm max-w-xs leading-relaxed">
                  Tu registro fue exitoso. Te contactaremos pronto con información del partido.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
