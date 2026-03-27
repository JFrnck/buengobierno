import { Link } from 'react-router-dom'

const WA_LINK = 'https://chat.whatsapp.com/pbg-grupo'

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* Top CTA bar */}
      <div className="bg-[#D72638] py-6 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-black text-white text-lg tracking-tight text-center md:text-left">
            Únete al movimiento del Buen Gobierno
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#D72638] font-black text-sm px-6 py-3 rounded-full hover:bg-[#F5C800] hover:text-[#1A1A1A] transition-colors duration-200 flex items-center gap-2 w-full md:w-auto justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Grupo WhatsApp
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#F5C800] flex items-center justify-center shrink-0">
                  <span className="text-[#1A1A1A] font-black text-sm">PBG</span>
                </div>
                <span className="font-black text-white text-lg tracking-tight">Partido del Buen Gobierno</span>
              </div>
              <p className="text-white/45 text-sm leading-relaxed font-medium max-w-xs">
                Un movimiento ciudadano comprometido con la transparencia, la participación y el desarrollo sostenible de nuestra región.
              </p>
              <div className="flex gap-4 mt-6">
                {['facebook', 'instagram', 'twitter', 'youtube'].map(s => (
                  <a
                    key={s}
                    href={ 
                      s === 'facebook' ? 'https://www.facebook.com/BuenGobiernoPe/' : '' | 
                      s === 'instagram' ? 'https://www.instagram.com/buengobiernope' : '' | 
                      s === 'twitter' ? 'https://x.com/buengobiernope?s=21' : '' | 
                      s === 'youtube' ? 'https://www.youtube.com/@pbg-peru' : '' 
                    }
                    className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center text-white/40 hover:bg-[#F5C800] hover:text-[#1A1A1A] transition-all duration-200 shrink-0"
                    aria-label={s}
                  >
                    <SocialIcon name={s} />
                  </a>
                ))}
              </div>
            </div>

            {/* Nav */}
            <div>
              <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-5">Navegación</h4>
              <ul className="flex flex-col gap-3">
                {[
                  { to: '/', label: 'Inicio' },
                  { to: '/#plan', label: 'Plan de Gobierno' },
                  { to: '/#contacto', label: 'Contacto' },
                ].map(l => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-white/45 font-medium text-sm hover:text-[#F5C800] transition-colors duration-200">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs font-medium text-center md:text-left">
              © 2026 Partido del Buen Gobierno. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
              <p className="text-white/30 text-xs font-medium">@JFrnck </p>
              <p className="text-white/30 text-xs font-medium">Hecho por cocolovers 💛</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ name }) {
  const icons = {
    facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>,
    instagram: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>,
    twitter: <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>,
    youtube: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47a2.78 2.78 0 0 0-1.95 1.95A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.5C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></>,
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  )
}