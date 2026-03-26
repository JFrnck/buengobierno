import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin()

const WA_LINK = 'https://chat.whatsapp.com/'

export default function Navbar() {
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const linksRef = useRef(null)
  const ctaRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Entrance animation
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.2 }
      )
      tl.fromTo(logoRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 },
        '-=0.5'
      )
      tl.fromTo(linksRef.current?.children ? Array.from(linksRef.current.children) : [],
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        '-=0.4'
      )
      tl.fromTo(ctaRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
        '-=0.3'
      )
    }, navRef)
    return () => ctx.revert()
  }, [])

  // Scroll style change
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    gsap.to(navRef.current, {
      backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(245,200,0,1)',
      backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
      boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.10)' : '0 0 0 rgba(0,0,0,0)',
      duration: 0.4,
      ease: 'power2.out'
    })
  }, [scrolled])

  const isActive = (path) => location.pathname === path

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: '#F5C800' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" ref={logoRef} className="flex items-center gap-3 group">
          <img src="logo-sol-pbg.png" alt="" width={80}/>
          <img src="/logo-pbg.png" alt="" width={200}/>
        </Link>

        {/* Links */}
        <div ref={linksRef} className="hidden md:flex items-center gap-8">
          <NavLink to="/" active={isActive('/')}>PBG</NavLink>
          <NavLink to="/plan-de-gobierno" active={isActive('/plan-de-gobierno')}>Plan de Gobierno</NavLink>
          <NavLink to="/voluntarios" active={isActive('/voluntarios')}>Voluntariado</NavLink>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#1A1A1A] font-semibold text-sm hover:text-[#D72638] transition-colors duration-200"
          >
            <WhatsAppIcon />
            Grupo WhatsApp
          </a>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="flex items-center gap-3">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex bg-[#D72638] text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-[#B81F2E] transition-all duration-200 hover:shadow-[0_4px_16px_rgba(215,38,56,0.35)] hover:-translate-y-0.5"
          >
            Únete
          </a>
          {/* Mobile menu icon */}
          <MobileMenu location={location} waLink={WA_LINK} />
        </div>
      </div>
    </nav>
  )
}

function NavLink({ to, active, children }) {
  const ref = useRef(null)
  const lineRef = useRef(null)

  const handleEnter = () => {
    gsap.to(lineRef.current, { scaleX: 1, duration: 0.25, ease: 'power2.out' })
    gsap.to(ref.current, { y: -2, duration: 0.2, ease: 'power2.out' })
  }
  const handleLeave = () => {
    if (!active) gsap.to(lineRef.current, { scaleX: 0, duration: 0.2, ease: 'power2.in' })
    gsap.to(ref.current, { y: 0, duration: 0.2, ease: 'power2.out' })
  }

  useEffect(() => {
    if (!lineRef.current) return
    gsap.set(lineRef.current, { scaleX: active ? 1 : 0, transformOrigin: 'left' })
  }, [active])

  return (
    <Link
      to={to}
      ref={ref}
      className="relative text-[#1A1A1A] font-semibold text-sm transition-colors duration-200 hover:text-[#D72638]"
      style={{ color: active ? '#D72638' : undefined }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
      <span
        ref={lineRef}
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D72638] origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </Link>
  )
}

function MobileMenu({ location, waLink }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!menuRef.current) return
    if (open) {
      gsap.fromTo(menuRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out', display: 'flex' }
      )
    } else {
      gsap.to(menuRef.current, { opacity: 0, y: -10, duration: 0.2, onComplete: () => {
        if (menuRef.current) menuRef.current.style.display = 'none'
      }})
    }
  }, [open])

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-9 h-9 flex flex-col items-center justify-center gap-1.5"
        aria-label="Menu"
      >
        <span className={`w-5 h-0.5 bg-[#1A1A1A] transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-5 h-0.5 bg-[#1A1A1A] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`w-5 h-0.5 bg-[#1A1A1A] transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>
      <div
        ref={menuRef}
        style={{ display: 'none' }}
        className="absolute top-12 right-0 w-56 bg-white rounded-2xl shadow-xl p-5 flex-col gap-4"
      >
        <Link to="/" onClick={() => setOpen(false)} className="font-bold text-[#1A1A1A] hover:text-[#D72638] transition-colors">PBG</Link>
        <Link to="/voluntarios" onClick={() => setOpen(false)} className="font-bold text-[#1A1A1A] hover:text-[#D72638] transition-colors">Voluntariado</Link>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold text-[#1A1A1A] hover:text-[#D72638] transition-colors">
          <WhatsAppIcon />WhatsApp
        </a>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-[#D72638] text-white font-bold text-sm px-4 py-2.5 rounded-full text-center hover:bg-[#B81F2E] transition-colors">
          Únete
        </a>
      </div>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
