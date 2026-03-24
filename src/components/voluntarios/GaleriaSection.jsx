import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GALLERY_ITEMS = [
  { id: 1, label: 'Jornada de puerta a puerta', cols: 'col-span-2', rows: 'row-span-2', bg: '#C9A200' },
  { id: 2, label: 'Capacitación de voluntarios', cols: '', rows: '', bg: '#D4B000' },
  { id: 3, label: 'Rally apertura norte', cols: '', rows: '', bg: '#E0B400' },
  { id: 4, label: 'Reunión de líderes', cols: 'col-span-2', rows: '', bg: '#C9A200' },
  { id: 5, label: 'Entrega de material', cols: '', rows: 'row-span-2', bg: '#D4B000' },
  { id: 6, label: 'Evento comunitario', cols: '', rows: '', bg: '#CFAD00' },
]

export default function GaleriaSection({ title = 'Voluntarios en acción', tag = 'Galería' }) {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current ? Array.from(gridRef.current.children) : []

      items.forEach((item, i) => {
        // Parallax inner image
        const inner = item.querySelector('.gal-inner')
        if (inner) {
          gsap.to(inner, {
            y: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            }
          })
        }

        // Reveal
        gsap.fromTo(item,
          { opacity: 0, scale: 0.94 },
          {
            opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 88%' },
            delay: (i % 3) * 0.1
          }
        )

        // Hover
        const overlay = item.querySelector('.gal-overlay')
        item.addEventListener('mouseenter', () => {
          gsap.to(inner, { scale: 1.08, duration: 0.5, ease: 'power2.out' })
          if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.3 })
        })
        item.addEventListener('mouseleave', () => {
          gsap.to(inner, { scale: 1, duration: 0.5, ease: 'power2.out' })
          if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 })
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#F5C800] py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-0.5 bg-[#D72638]" />
              <span className="text-[#D72638] font-bold text-xs tracking-[0.2em] uppercase">{tag}</span>
            </div>
            <h2
              className="font-black text-[#1A1A1A]"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em' }}
            >
              {title}
            </h2>
          </div>
          <a href="#" className="hidden md:flex text-[#D72638] font-bold text-sm items-center gap-2 hover:gap-3 transition-all duration-200">
            Ver todas
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-3 gap-3 auto-rows-[180px]"
        >
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`relative rounded-2xl overflow-hidden cursor-pointer ${item.cols} ${item.rows}`}
            >
              <div
                className="gal-inner absolute inset-[-10%] flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${item.bg} 0%, #F5C800 100%)` }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(26,26,26,0.2)" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <div className="gal-overlay absolute inset-0 bg-[#1A1A1A]/60 flex items-end p-4 opacity-0">
                <p className="text-white font-bold text-sm leading-tight">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
