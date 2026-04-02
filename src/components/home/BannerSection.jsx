export default function BannerSection({ className = '' }) {
  const items = [
    'UNETE AL DEBATE Y COMPRUEBA EL NIVEL DE PREPARACION DE JORGE NIETO, APOYALO EN SUS REDES SOCIALES UN LIKE 🌞 UN LIKE RESONARÁ EN TODO EL PERÚ 🌞'
  ]

  return (
    <div className={`absolute left-0 w-full z-30 bg-white/95 py-2 overflow-hidden flex items-center ${className} animate-pulse`}>
      <div className="marquee-inner whitespace-nowrap flex">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 mx-6">
            <span className="text-[#D72638] font-black text-xs tracking-[0.2em] uppercase">{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D72638] flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}
