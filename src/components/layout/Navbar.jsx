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
      className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 flex items-center justify-center transition-all"
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
            <NavLink to="https://mapa.partidodelbuengobierno.com/" active={isActive('/plan-de-gobierno')}>Mapa de dolencias</NavLink>
          </div>
          {/* <div className="nav-item">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link-text flex items-center gap-2 font-bold text-sm hover:text-[#D72638] transition-colors duration-300"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div> */}

        </div>

        {/* Mobile Menu */}
        {/* <div className="nav-item flex justify-center items-center">
            <a href="https://www.tiktok.com/@nietooficial/live?_r=1&_svg=1&checksum=e0126fa223c564ca82494552c5f6e913622ef1b6d79a7a0ab3ea2b87ae896334&enter_from_merge=share&enter_method=share&sec_user_id=MS4wLjABAAAAstUsSJDrPXq_lW2-mf3RmI7-ujRse4XB_R6rUmOXrTjM_DCvbnLTgVWXqS-vSQpr&share_app_id=1233&share_from_user_id=7126522013896147973&share_link_id=4967c7be-91a7-4ce6-a81c-5f9b23037eaf&share_region=PE&social_share_type=10&source=h5_m&timestamp=1775156521&ug_btm=b2001%2Cb4180&ugbiz_name=LIVE&user_id=7126522013896147973&utm_campaign=client_share&utm_medium=android&utm_source=whatsapp" className="bg-white text-[#d72539] py-2 px-4 rounded-3xl font-semibold inline-flex justify-center items-center gap-1 ">
                <h2 className='animate-pulse'>EN VIVO</h2>
                <span className="text-[#d72539] text-3xl animate-pulse leading-none pb-1">•</span>
            </a>
        </div> */}
        <div ref={ctaRef} className="flex items-center gap-4">
          <MobileMenu location={location} />
        </div>
      </div>
    </nav>
  )
}

function NavLink({ to, active, children }) {
  const lineRef = useRef(null)

  const handleEnter = () => {
    gsap.to(lineRef.current, { scaleX: 1, duration: 0.3, ease: 'power2.out' })
  }
  const handleLeave = () => {
    if (!active) {
      gsap.to(lineRef.current, { scaleX: 0, duration: 0.2, ease: 'power2.in' })
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
        className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#D72638] origin-left"
        style={{ transform: `scaleX(${active ? 1 : 0})` }}
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

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}