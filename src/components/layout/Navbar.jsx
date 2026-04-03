import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Navbar() {
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const linksRef = useRef(null)
  const ctaRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  
  // NUEVO: Estado para controlar el modal del simulador
  const [isGuideOpen, setIsGuideOpen] = useState(false)

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
    <>
      <nav
        ref={navRef}
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
              {/* Ajustado para ser enlace externo, abre en otra pestaña */}
              <a href="https://mapa.partidodelbuengobierno.com/" target="_blank" rel="noreferrer" className="nav-link-text font-bold text-sm">Mapa de dolencias</a>
            </div>
            <div className="nav-item">
              {/* NUEVO: Botón que abre el modal en lugar de redirigir directamente */}
              <button 
                onClick={() => setIsGuideOpen(true)}
                className="nav-link-text relative font-bold text-sm tracking-tight transition-colors duration-300 text-[#1A1A1A] hover:text-[#D72638]"
              >
                Simulador de Votación
              </button>
            </div>
          </div>

          <a 
            href="https://www.tiktok.com/@nietooficial/live?_r=1&_svg=1&checksum=95f00e5fd1e94f55af360a81bec80632d6d07784b9a7051e39547c2396d8dd9e&enter_from_merge=share&enter_method=share&sec_user_id=MS4wLjABAAAAOhCUWWTugcZRRRNdMz5-aEXZgb25zFWvmB5965crCDabjQ9Io3CCBghMfksJfgdT&share_app_id=1233&share_from_user_id=245756048685285376&share_link_id=60419d96-1c00-402f-87b8-e87c3a5e224f&share_region=PE&social_share_type=10&source=h5_m&timestamp=1775237168&ug_btm=b2001%2Cb4180&ugbiz_name=LIVE&user_id=245756048685285376&utm_campaign=client_share&utm_medium=android&utm_source=whatsapp" 
            className="inline-flex items-center gap-1.5 bg-white text-red-600 font-bold text-sm px-4 py-2 rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            EN VIVO 
            <span className="animate-pulse text-red-600 text-xl leading-[0] pb-0.5">
              •
            </span>
          </a>

          <div ref={ctaRef} className="flex items-center gap-4">
            <MobileMenu location={location} openGuide={() => setIsGuideOpen(true)} />
          </div>
        </div>
      </nav>

      {/* NUEVO: Modal renderizado fuera del nav para evitar problemas de z-index */}
      <VotingGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </>
  )
}

function NavLink({ to, active, children }) {
  const lineRef = useRef(null)

  useGSAP(() => {
    gsap.to(lineRef.current, {
      scaleX: active ? 1 : 0,
      duration: 0.3,
      ease: 'power2.out'
    })
  }, [active])

  const handleEnter = () => {
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
        className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#D72638] origin-left scale-x-0"
      />
    </Link>
  )
}

function MobileMenu({ location, openGuide }) {
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
        <a href="https://mapa.partidodelbuengobierno.com/" target="_blank" rel="noreferrer" className="text-lg font-bold text-[#1A1A1A]">Mapa de dolencias 🇵🇪</a>
        
        {/* NUEVO: Botón móvil para abrir el modal */}
        <button 
          onClick={() => { setOpen(false); openGuide(); }} 
          className="text-left text-lg font-bold text-[#1A1A1A]"
        >
          Simulador de Votación
        </button>
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

// =====================================================================
// NUEVO COMPONENTE: Modal Interactivo Paso a Paso (Wizard)
// =====================================================================
function VotingGuideModal({ isOpen, onClose }) {
  const [step, setStep] = useState(0)
  const overlayRef = useRef(null)
  const modalBoxRef = useRef(null)
  const contentRef = useRef(null) // Para animar el cambio de paso

  // Reemplaza estas rutas con las imágenes reales que tengas
  const guideSteps = [
    { image: '/instruccion-1.jpg', title: 'Paso 1', text: 'Selecciona tu departamento o región.' },
    { image: '/instruccion-2.jpg', title: 'Paso 2', text: 'Ubica el símbolo del Partido del Buen Gobierno.' },
    { image: '/instruccion-3.jpg', title: 'Paso 3', text: 'Marca con una aspa (X) o cruz (+) dentro del recuadro.' },
    { image: '/instruccion-4.jpg', title: 'Paso 4', text: 'Si deseas, escribe el número de tu diputado preferido.' },
    { image: '/instruccion-5.jpg', title: 'Paso 5', text: '¡Revisa tu voto y listo!' },
  ]

  // Animación de entrada/salida del modal
  useGSAP(() => {
    if (isOpen) {
      setStep(0) // Resetear al paso 1 al abrir
      gsap.to(overlayRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.3, display: 'flex' })
      gsap.fromTo(modalBoxRef.current,
        { scale: 0.8, y: 20, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.2)', delay: 0.1 }
      )
    } else {
      gsap.to(modalBoxRef.current, { scale: 0.9, y: 20, opacity: 0, duration: 0.2 })
      gsap.to(overlayRef.current, { 
        opacity: 0, pointerEvents: 'none', duration: 0.3, delay: 0.1,
        onComplete: () => { if (overlayRef.current) overlayRef.current.style.display = 'none' } 
      })
    }
  }, [isOpen])

  // Animación al cambiar de paso
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
      )
    }
  }, [step, isOpen])

  const nextStep = () => {
    if (step < guideSteps.length - 1) setStep(step + 1)
  }
  const prevStep = () => {
    if (step > 0) setStep(step - 1)
  }

  const handleGoToSimulator = () => {
    window.location.href = "https://simuladordevotoperu.com/simulador/"
  }

  return (
    <div 
      ref={overlayRef} 
      style={{ display: 'none' }}
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm items-center justify-center p-4"
    >
      <div 
        ref={modalBoxRef} 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative"
      >
        {/* Botón de cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full z-10 transition-colors"
        >
          ✕
        </button>

        {/* Contenido Cambiante */}
        <div className="p-6 md:p-8">
          {/* Indicador de Pasos */}
          <div className="flex justify-center gap-2 mb-6">
            {guideSteps.map((_, i) => (
              <div 
                key={i} 
                className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-[#D72638]' : 'w-2 bg-gray-300'}`} 
              />
            ))}
          </div>

          <div ref={contentRef} className="flex flex-col items-center text-center">
            {/* Imagen Placeholder (Cambiar el src por guideSteps[step].image) */}
            <div className="w-full aspect-video bg-gray-100 rounded-xl mb-6 flex items-center justify-center border border-gray-200 overflow-hidden">
               {/* Aquí debes usar tu etiqueta <img /> */}
               <span className="text-gray-400 font-bold">
                 [ Imagen: {guideSteps[step].title} ]
               </span>
               {/* <img src={guideSteps[step].image} alt={`Paso ${step + 1}`} className="w-full h-full object-cover" /> */}
            </div>

            <h3 className="text-2xl font-black text-[#1A1A1A] mb-2">
              {guideSteps[step].title}
            </h3>
            <p className="text-gray-600 mb-8 min-h-[48px]">
              {guideSteps[step].text}
            </p>
          </div>

          {/* Controles de Navegación */}
          <div className="flex items-center justify-between mt-4">
            <button 
              onClick={prevStep}
              disabled={step === 0}
              className={`px-4 py-2 font-bold rounded-lg transition-colors ${step === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#1A1A1A] hover:bg-gray-100'}`}
            >
              Anterior
            </button>

            {step < guideSteps.length - 1 ? (
              <button 
                onClick={nextStep}
                className="px-6 py-2 bg-[#1A1A1A] text-white font-bold rounded-lg hover:bg-[#D72638] transition-colors"
              >
                Siguiente
              </button>
            ) : (
              <button 
                onClick={handleGoToSimulator}
                className="px-6 py-2 bg-[#D72638] text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30"
              >
                ¡Ir al Simulador!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}