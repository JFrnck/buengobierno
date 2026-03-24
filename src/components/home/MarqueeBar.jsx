export default function MarqueeBar() {
  const items = [
    'TRANSPARENCIA', 'EDUCACIÓN', 'SALUD', 'SEGURIDAD', 'EMPLEO',
    'INFRAESTRUCTURA', 'MEDIO AMBIENTE', 'PARTICIPACIÓN CIUDADANA',
    'TRANSPARENCIA', 'EDUCACIÓN', 'SALUD', 'SEGURIDAD', 'EMPLEO',
    'INFRAESTRUCTURA', 'MEDIO AMBIENTE', 'PARTICIPACIÓN CIUDADANA',
  ]

  return (
    <div className="bg-[#1A1A1A] py-4 overflow-hidden flex items-center">
      <div className="marquee-inner whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 mx-6">
            <span className="text-[#F5C800] font-black text-xs tracking-[0.2em] uppercase">{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D72638] flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}
