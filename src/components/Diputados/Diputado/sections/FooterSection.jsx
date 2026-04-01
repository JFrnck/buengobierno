import React from 'react';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Diccionario de Íconos de Redes Sociales ───────────────────────────────────
const SOCIAL_ICONS = {
  facebook: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47a2.78 2.78 0 0 0-1.95 1.95A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.5C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" stroke="none">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  )
};

export default function FooterSection({ candidato }) {
  const { redes_sociales, enlaces_importantes } = candidato;

  // ── Normalizador Dinámico de Redes ──────────────────────────────────────────
  let redesValidas = [];
  
  if (Array.isArray(redes_sociales)) {
    redes_sociales.forEach(item => {
      if (typeof item === 'string') {
        redesValidas.push({ key: 'desconocida', url: item });
      } else if (typeof item === 'object' && item !== null) {
        Object.entries(item).forEach(([k, v]) => redesValidas.push({ key: k, url: v }));
      }
    });
  } else if (typeof redes_sociales === 'object' && redes_sociales !== null) {
    Object.entries(redes_sociales).forEach(([k, v]) => redesValidas.push({ key: k, url: v }));
  }

  // Filtramos solo las que tengan una URL de verdad
  redesValidas = redesValidas.filter(r => r.url && typeof r.url === 'string' && r.url.trim() !== '');

  return (
    <footer className="bg-[#F5C800] text-[#D72638] pt-20 pb-10 border-t border-[#0D1B2A]/10 mt-auto">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          
          {/* Columna 1: Enlaces y Documentos */}
          <div>
            <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
              <Icons.FolderOpen className="text-[#0D1B2A]" />
              Documentos Oficiales
            </h3>
            <div className="space-y-4">
              {enlaces_importantes.map((enlace, i) => {
                const DocIcon = Icons[enlace.icon] || Icons.File;
                return (
                  <a 
                    key={i} 
                    href={enlace.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-[#0D1B2A]/5 border border-[#0D1B2A]/10 hover:bg-[#0D1B2A]/10 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <DocIcon size={24} className="text-[#0D1B2A] group-hover:text-[#D72638] transition-colors" />
                      <span className="font-medium text-[#0D1B2A] group-hover:text-[#0D1B2A]">{enlace.titulo}</span>
                    </div>
                    <Icons.Download size={18} className="text-[#0D1B2A] group-hover:text-[#0D1B2A]" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Columna 2: Redes y Contacto */}
          <div className="flex flex-col md:items-end">
            <h3 className="text-2xl font-black mb-6">Sigue la campaña</h3>
            <p className="text-[#0D1B2A] mb-8 md:text-right max-w-sm">
              Únete a nuestras redes sociales para estar al tanto de los recorridos, propuestas y actividades.
            </p>
            <div className="flex gap-4">
              {redesValidas.map((item, index) => {
                let network = item.key.toLowerCase();
                const urlString = item.url.toLowerCase();

                // Si el key es un número o desconocido, adivinamos leyendo el enlace
                if (!isNaN(network) || network === 'desconocida') {
                  if (urlString.includes('facebook') || urlString.includes('fb.')) network = 'facebook';
                  else if (urlString.includes('instagram')) network = 'instagram';
                  else if (urlString.includes('twitter') || urlString.includes('x.com')) network = 'twitter';
                  else if (urlString.includes('youtube') || urlString.includes('youtu.be')) network = 'youtube';
                  else if (urlString.includes('tiktok')) network = 'tiktok';
                }
                
                // Usamos el ícono del diccionario o un ícono genérico de Link como fallback
                const IconComponent = SOCIAL_ICONS[network] || <Icons.Link size={24} />;

                return (
                  <a 
                    key={index} 
                    href={item.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full border border-[#D72638] bg-white/30 flex items-center justify-center hover:bg-white hover:-translate-y-1 transition-all duration-300 text-[#D72638]"
                  >
                    {IconComponent}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-[#0D1B2A]/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#0D1B2A]">
          <p>© 2026 Partido del Buen Gobierno. Todos los derechos reservados.</p>
          <Link to="/diputados" className="hover:text-[#0D1B2A] transition-colors flex items-center gap-2">
            <Icons.ArrowLeft size={16} /> Volver a todos los candidatos
          </Link>
        </div>
      </div>
    </footer>
  );
}