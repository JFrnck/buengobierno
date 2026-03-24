import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function VoteSection() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const btnRef = useRef(null)
  const counterRef = useRef(null)
  const feedbackRef = useRef(null)
  const [count, setCount] = useState(4827)
  const [voted, setVoted] = useState(false)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: cardRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleVote = () => {
    if (voted) return
    const tl = gsap.timeline()

    // Press down
    tl.to(btnRef.current, { scale: 0.92, duration: 0.12, ease: 'power2.in' })
    // Change color + bounce up
    .to(btnRef.current, {
      scale: 1, backgroundColor: '#1A1A1A', duration: 0.3, ease: 'back.out(2)'
    })
    // Counter update animation
    .add(() => {
      setCount(c => c + 1)
      setVoted(true)
    }, '-=0.1')
    // Reveal counter element
    .fromTo(counterRef.current,
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }
    )
    // Feedback text
    .fromTo(feedbackRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      '-=0.3'
    )
    // Small celebration particles
    .fromTo(
      sectionRef.current.querySelectorAll('.particle'),
      { opacity: 0, scale: 0, y: 0 },
      {
        opacity: 1, scale: 1, y: -40 + Math.random() * 80,
        duration: 0.6, stagger: 0.08, ease: 'power2.out'
      }, '-=0.5'
    )
    .to(sectionRef.current.querySelectorAll('.particle'), {
      opacity: 0, duration: 0.4, delay: 0.4
    })
  }

  return (
    <section
      ref={sectionRef}
      className="bg-[#F5C800] py-24 md:py-32 px-6 md:px-12 lg:px-20 relative overflow-hidden"
    >
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-black text-[#E0B400] select-none"
          style={{ fontSize: 'clamp(8rem, 20vw, 20rem)', letterSpacing: '-0.05em', opacity: 0.4 }}
        >
          VOTA
        </span>
      </div>

      {/* Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="particle absolute pointer-events-none opacity-0"
          style={{
            left: `${30 + i * 8}%`,
            top: '50%',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: i % 2 === 0 ? '#D72638' : '#1A1A1A',
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-0.5 bg-[#D72638]" />
            <span className="text-[#D72638] font-bold text-xs tracking-[0.2em] uppercase">Tu voz importa</span>
            <span className="w-10 h-0.5 bg-[#D72638]" />
          </div>
          <h2
            className="font-black text-[#1A1A1A] leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
          >
            ¿Apoyas el cambio?
          </h2>
        </div>

        {/* Main card */}
        <div
          ref={cardRef}
          className="bg-white rounded-3xl p-10 md:p-16 text-center max-w-2xl mx-auto"
          style={{ boxShadow: '0 16px 64px rgba(0,0,0,0.12)', opacity: 0 }}
        >
          {/* Big icon */}
          <div className="w-20 h-20 rounded-full bg-[#F5C800] flex items-center justify-center mx-auto mb-8">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
              <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            </svg>
          </div>

          <h3 className="font-black text-[#1A1A1A] text-2xl md:text-3xl tracking-tight mb-3">
            {voted ? '¡Gracias por tu apoyo!' : 'Declara tu apoyo al PBG'}
          </h3>
          <p className="text-[#1A1A1A]/55 font-medium mb-8 text-sm leading-relaxed max-w-xs mx-auto">
            {voted
              ? 'Tu participación es fundamental para construir el cambio que necesitamos.'
              : 'Únete a miles de ciudadanos que ya respaldan un gobierno transparente y cercano.'}
          </p>

          {/* Counter */}
          <div
            ref={counterRef}
            className="mb-8"
            style={{ opacity: voted ? 1 : 0 }}
          >
            <div className="text-[#D72638] font-black text-5xl tracking-tighter">{count.toLocaleString()}</div>
            <div className="text-[#1A1A1A]/50 text-xs font-bold tracking-widest uppercase mt-1">personas ya apoyan</div>
          </div>

          {/* Support bar */}
          {!voted && (
            <div className="mb-8">
              <div className="flex justify-between text-xs font-bold text-[#1A1A1A]/40 mb-2">
                <span>Apoyo ciudadano</span>
                <span>{count.toLocaleString()} votos</span>
              </div>
              <div className="h-2 bg-[#F5C800] rounded-full overflow-hidden">
                <div className="h-full bg-[#D72638] rounded-full" style={{ width: '73%' }} />
              </div>
            </div>
          )}

          {/* CTA Button */}
          <button
            ref={btnRef}
            onClick={handleVote}
            disabled={voted}
            className="text-white font-black py-4 px-12 rounded-full text-base tracking-wide transition-opacity duration-200 disabled:cursor-default"
            style={{
              backgroundColor: voted ? '#1A1A1A' : '#D72638',
              boxShadow: voted ? '0 6px 24px rgba(26,26,26,0.3)' : '0 8px 28px rgba(215,38,56,0.45)'
            }}
          >
            {voted ? '✓ Apoyo registrado' : 'Apoyo al PBG →'}
          </button>

          {/* Feedback */}
          <p
            ref={feedbackRef}
            className="text-[#1A1A1A]/45 text-xs font-medium mt-4"
            style={{ opacity: voted ? 1 : 0 }}
          >
            Comparte con tus amigos y amplifica el mensaje
          </p>

          {/* Social share — visible after vote */}
          {voted && (
            <div className="flex justify-center gap-3 mt-4">
              {['WhatsApp', 'Facebook', 'X'].map(s => (
                <button
                  key={s}
                  className="text-xs font-bold text-[#1A1A1A]/50 hover:text-[#D72638] transition-colors px-3 py-1.5 rounded-full border border-[#1A1A1A]/15 hover:border-[#D72638]/40"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
