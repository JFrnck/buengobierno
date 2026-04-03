import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const WA_LINK = 'https://chat.whatsapp.com/tucodigo'

export default function Navbar() {
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const linksRef = useRef(null)
  const ctaRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // 1. Animación de entrada
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    )
    tl.fromTo(logoRef.current,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7 },
      '-=0.6'
    )
    
    const children = linksRef.current?.querySelectorAll('.nav-item')
    if (children) {
      tl.fromTo(children,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        '-=0.4'
      )
    }
    tl.fromTo(ctaRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.3'
    )
  }, { scope: navRef })

  // 2. Lógica de Scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 3. Transición de Estilo
  useGSAP(() => {
    gsap.to(navRef.current, {
      backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(245, 200, 0, 1)',
      backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
      boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.08)' : '0 0 0 rgba(0,0,0,0)',
      height: scrolled ? '70px' : '85px', 
      duration: 0.4,
      ease: 'none'
    })
    
    const textColor = scrolled ? '#1A1A1A' : '#1A1A1A' 
    gsap.to('.nav-link-text', { color: textColor, duration: 0.3 })
  }, [scrolled])

  const isActive = (path) => location.pathname === path

  return (
    <nav
      ref={navRef}
      // CAMBIO 1: Quitamos "transition-all" para que no pelee con GSAP
      // CAMBIO 2: Agregamos "opacity-0" para evitar el parpadeo inicial en móviles
      className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 flex items-center justify-center opacity-0"
    >
       
      <div className="max-w-7xl w-full flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" ref={logoRef} className="flex items-center gap-3 group relative z-10 shrink-0">
          <img src="/logo-sol-pbg.png" alt="Sol PBG" className="w-10 md:w-12 h-auto object-contain transition-transform group-hover:rotate-12" />
          <img src="/logo-pbg.png" alt="Partido del Buen Gobierno" className="w-28 sm:w-32 md:w-44 h-auto object-contain" />
        </Link>

        {/* Desktop Links */}
        <div ref={linksRef} className="hidden md:flex items-center gap-10">
          <div className="nav-item">
            <NavLink to="/" active={isActive('/')}>PBG</NavLink>
          </div>
          <div className="nav-item">
            <NavLink to="/plan-de-gobierno" active={isActive('/plan-de-gobierno')}>Plan de Gobierno</NavLink>
          </div>
          <div className="nav-item">
            <NavLink to="/diputados" active={isActive('/diputados')}>Lista de Diputados</NavLink>
          </div>
          <div className="nav-item">
            <NavLink to="https://mapa.partidodelbuengobierno.com/" active={isActive('/mapa-de-dolencias')}>Mapa de dolencias</NavLink>
          </div>
        </div>

        <div ref={ctaRef} className="flex items-center gap-4">
          <MobileMenu location={location} />
        </div>
      </div>
    </nav>
  )
}

function NavLink({ to, active, children }) {
  const lineRef = useRef(null)

  // CAMBIO 3: Escuchamos el cambio de "active" cuando el usuario navega a otra ruta
  useGSAP(() => {
    gsap.to(lineRef.current, {
      scaleX: active ? 1 : 0,
      duration: 0.3,
      ease: 'power2.out'
    })
  }, [active]) // La dependencia es "active"

  const handleEnter = () => {
    // Usamos overwrite: 'auto' para prevenir que la animación pelee si estás animando el click
    gsap.to(lineRef.current, { scaleX: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
  }
  const handleLeave = () => {
    if (!active) {
      gsap.to(lineRef.current, { scaleX: 0, duration: 0.2, ease: 'power2.in', overwrite: 'auto' })
    }
  }

  return (
    <Link
      to={to}
      className={`nav-link-text relative font-bold text-sm tracking-tight transition-colors duration-300 ${active ? 'text-[#D72638]' : 'text-[#1A1A1A]'}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
      <span
        ref={lineRef}
        // CAMBIO 4: Eliminamos el style={{ transform: ... }} de React. GSAP ahora controla esto totalmente.
        className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#D72638] origin-left scale-x-0"
      />
    </Link>
  )
}

function MobileMenu({ location, waLink }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useGSAP(() => {
    if (open) {
      gsap.fromTo(menuRef.current,
        { opacity: 0, y: -20, pointerEvents: 'none' },
        { opacity: 1, y: 0, pointerEvents: 'all', duration: 0.4, ease: 'back.out(1.2)', display: 'flex' }
      )
    } else {
      gsap.to(menuRef.current, { 
        opacity: 0, y: -20, pointerEvents: 'none', duration: 0.3, 
        onComplete: () => { if (menuRef.current) menuRef.current.style.display = 'none' } 
      })
    }
  }, [open])

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[110] relative"
        aria-label="Menu"
      >
        <span className={`w-6 h-0.5 bg-[#1A1A1A] transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-6 h-0.5 bg-[#1A1A1A] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`w-6 h-0.5 bg-[#1A1A1A] transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      <div
        ref={menuRef}
        style={{ display: 'none' }}
        className="absolute top-14 right-0 w-[calc(100vw-3rem)] max-w-sm bg-white rounded-3xl shadow-2xl p-6 flex-col gap-5 border border-gray-100"
      >
        <MobileItem to="/" active={location.pathname === '/'} onClick={() => setOpen(false)}>PBG</MobileItem>
        <MobileItem to="/plan-de-gobierno" active={location.pathname === '/plan-de-gobierno'} onClick={() => setOpen(false)}>Plan de Gobierno</MobileItem>
        <MobileItem to="/diputados" active={location.pathname === '/diputados'} onClick={() => setOpen(false)}>Lista de Diputados</MobileItem>
        <a href="https://mapa.partidodelbuengobierno.com/">Mapa de dolencias 🇵🇪</a>
      </div>
    </div>
  )
}

function MobileItem({ to, children, active, onClick }) {
  return (
    <Link 
      to={to} 
      onClick={onClick} 
      className={`text-lg font-bold ${active ? 'text-[#D72638]' : 'text-[#1A1A1A]'}`}
    >
      {children}
    </Link>
  )
}