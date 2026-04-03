import React, { useState, useMemo, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Users, MapPin, IdCard, User, X, 
  ChevronDown, Award, Search, Home 
} from "lucide-react";

// 1. IMPORTACIÓN DEL JSON DIRECTAMENTE EN EL COMPONENTE
import datosDiputados from "../../data/diputadosLista.json";
import Navbar from "../layout/Navbar";

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. HELPERS Y LÓGICA DE DATOS
// ==========================================

function getInitials(nombre = "") {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0] ?? "")
    .join("");
}

function toTitleCase(str = "") {
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const AVATAR_BG = ["#D72638", "#E63946", "#F5C800", "#FFB703", "#FFFFFF"];

function avatarBg(nombre = "") {
  return AVATAR_BG[nombre.charCodeAt(0) % AVATAR_BG.length];
}

// ==========================================
// 2. COMPONENTES VISUALES
// ==========================================

function Avatar({ nombre, imagen, large = false }) {
  const dim = large ? "w-20 h-20 text-3xl" : "w-14 h-14 text-lg";
  
  if (imagen) {
    return (
      <img 
        src={imagen} 
        alt={nombre} 
        className={`${dim} rounded-full object-cover flex-shrink-0 shadow-md border-2 border-gray-400`}
      />
    );
  }

  const bg = avatarBg(nombre);
  const textColor = (bg === "#F5C800" || bg === "#FFB703" || bg === "#FFFFFF") 
    ? "text-[#1A1A1A]" 
    : "text-white";
  
  const borderClass = bg === "#FFFFFF" ? "border-2 border-gray-600" : "";

  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center font-black tracking-widest flex-shrink-0 shadow-md ${borderClass}`}
      style={{ background: bg }}
    >
      <span className={textColor}>{getInitials(nombre)}</span>
    </div>
  );
}

function CandidateCard({ candidato, onSelect }) {
  const { posicion, nombre, sexo, imagen } = candidato;
  
  return (
    <button
      onClick={() => onSelect(candidato)}
      className="candidate-card group w-full text-left rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 focus:outline-none bg-white border border-gray-600 hover:border-[#D72638] shadow-sm hover:shadow-xl flex flex-col"
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-[#D72638] to-[#F5C800]" />
      <div className="p-5 flex flex-col items-center text-center gap-4 relative">
        <div className="absolute top-3 right-3 bg-[#D72638] text-white text-xs font-black px-2 py-1 rounded-md tracking-wider shadow-sm">
          N° {posicion}
        </div>
        
        <Avatar nombre={nombre} imagen={imagen} />
        
        <div className="w-full">
          <p className="text-[#1A1A1A] font-bold text-sm leading-tight mb-1 group-hover:text-[#D72638] transition-colors line-clamp-2">
            {toTitleCase(nombre)}
          </p>
          <p className="text-[#D72638] text-[10px] font-black uppercase tracking-[0.15em] mb-1">
            Diputado/a
          </p>
          <p className="text-gray-500 text-xs font-medium">
            {sexo === "F" ? "Mujer" : "Hombre"}
          </p>
        </div>
        
        <div className="w-full pt-3 mt-1 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-[#D72638] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1">
            <Search size={14} /> Ver Perfil
          </p>
        </div>
      </div>
    </button>
  );
}

function Modal({ candidato, onClose }) {
  if (!candidato) return null;
  const { posicion, nombre, sexo, dni, lugar_nacimiento, lugar_domicilio, imagen } = candidato;

  const rows = [
    { icon: IdCard, label: "DNI", value: dni },
    { icon: MapPin, label: "Lugar de nacimiento", value: lugar_nacimiento },
    { icon: Home, label: "Lugar de domicilio", value: lugar_domicilio || "No registrado" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-[2rem] overflow-hidden shadow-2xl bg-white border border-gray-100 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-2 w-full bg-gradient-to-r from-[#D72638] via-[#F5C800] to-[#D72638]" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-[#1A1A1A] hover:bg-gray-100 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-6">
            <Avatar nombre={nombre} imagen={imagen} large />
            <div>
              <p className="text-[#1A1A1A] font-black text-xl leading-tight mb-2">
                {toTitleCase(nombre)}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[#1A1A1A] bg-[#F5C800] text-xs font-black px-2.5 py-1 rounded-md shadow-sm">
                  N° {posicion}
                </span>
                <span className="text-[#D72638] text-xs font-bold uppercase tracking-wider">
                  Candidato/a
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-2 font-medium flex items-center gap-1">
                <User size={14} /> {sexo === "F" ? "Mujer" : "Hombre"}
              </p>
            </div>
          </div>

          <a 
            href={candidato.url} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-3 mb-8 px-4 py-3 rounded-xl bg-[#F5C800] border border-[#F5C800]/20 transition-colors cursor-pointer animate-pulse"
            >
            <Award className="text-[#D72638]" size={20} />
            <span className="text-[#1A1A1A] font-bold text-xs tracking-widest uppercase">
                Perfil JNE
            </span>
          </a>

          <div className="space-y-3">
            {rows.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 p-3 sm:p-4 rounded-xl bg-gray-50 border border-gray-100">
                <Icon className="text-[#D72638] shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.15em] mb-1">
                    {label}
                  </p>
                  <p className="text-[#1A1A1A] text-sm font-medium">
                    {toTitleCase(String(value))}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-100 hover:bg-[#D72638] hover:text-white text-[#1A1A1A] text-sm font-bold px-6 py-2.5 rounded-full transition-colors"
            >
              Cerrar Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. SECCIÓN DE DEPARTAMENTO Y ANIMACIÓN
// ==========================================

// ✅ CAMBIO 1: Recibimos `selectedDep` como prop para usarlo en el array de dependencias
function DepartamentoSection({ departamento, candidatos, onSelect, selectedDep }) {
  const sectionRef = useRef(null);

  // ✅ CAMBIO 2: Agregamos `selectedDep` al array de dependencias.
  // Esto obliga a GSAP a recalcular y reiniciar la animación cuando el filtro cambia.
  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll('.candidate-card'),
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.05, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 95%', // Ajustado a 95% para que dispare incluso si queda muy arriba
        }
      }
    );
  }, { scope: sectionRef, dependencies: [selectedDep] });

  return (
    <section ref={sectionRef} className="pt-8 pb-12 border-b border-gray-600 last:border-0">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-xl bg-[#F5C800] shadow-sm">
          <MapPin className="text-[#1A1A1A]" size={24} />
        </div>
        <div>
          <h2 className="text-[#1A1A1A] font-black text-2xl sm:text-3xl tracking-tight uppercase">
            {departamento}
          </h2>
          <p className="text-[#D72638] text-sm font-bold tracking-wider uppercase mt-1">
            {candidatos.length} candidato{candidatos.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {candidatos.map((c, i) => (
          <CandidateCard key={`${c.dni}-${i}`} candidato={c} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

// ==========================================
// 4. COMPONENTE PRINCIPAL (EXPORT)
// ==========================================

export default function DiputadosPBG() {
  const [selectedDep, setSelectedDep] = useState("TODOS");
  const [activeCandidate, setActiveCandidate] = useState(null);
  const heroRef = useRef(null);

  const departamentos = useMemo(() => datosDiputados.map((d) => d.departamento), []);
  
  const visible = useMemo(
    () => (selectedDep === "TODOS" ? datosDiputados : datosDiputados.filter((d) => d.departamento === selectedDep)),
    [selectedDep]
  );
  
  const total = useMemo(
    () => visible.reduce((acc, d) => acc + d.candidatos.length, 0),
    [visible]
  );

  // ✅ CAMBIO 3: Forzamos a ScrollTrigger a recalcular toda la página cuando el layout se achica/agranda
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100); // Pequeño retraso para asegurar que React ya pintó el nuevo DOM
    
    return () => clearTimeout(timeoutId);
  }, [selectedDep]);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1 } });
    
    tl.fromTo('.hero-badge', 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, delay: 0.2 }
    )
    .fromTo('.hero-title',
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1 }
    )
    .fromTo('.hero-text',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.2 },
      "-=0.5"
    );
  }, { scope: heroRef });

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#D72638] selection:text-[#F5C800]">

    <Navbar/>

      {/* Sección Hero */}
      <section ref={heroRef} className="relative bg-[#F5C800] pt-36 pb-20 px-4 sm:px-6 md:px-12 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#E0B400] opacity-40 mix-blend-multiply pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
          <div className="hero-badge inline-flex items-center gap-2 mb-6 bg-white px-4 py-2 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#D72638]" />
            <span className="text-[#1A1A1A] font-bold text-xs tracking-[0.2em] uppercase">
              Lista Parlamentaria
            </span>
          </div>
          
          <h1 className="hero-title flex flex-col font-black leading-[0.9] tracking-[-0.03em] text-5xl sm:text-7xl md:text-8xl mb-6">
            <span className="text-[#1A1A1A]">CANDIDATOS A</span>
            <span className="text-[#D72638] drop-shadow-sm">DIPUTADOS</span>
          </h1>
          
          <p className="hero-text text-[#1A1A1A]/80 font-bold text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Conoce a los representantes del pacto social que transformarán el Perú. Profesionales íntegros orientados al bienestar de sus regiones.
          </p>
        </div>
      </section>

      {/* Barra de Filtros */}
      <div className="sticky top-[73px] sm:top-[77px] z-30 bg-white/95 backdrop-blur-xl border-b border-gray-600 py-4 px-4 sm:px-6 md:px-12 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 justify-between items-center">
          
          <div className="relative w-full sm:w-80">
            <select
              value={selectedDep}
              onChange={(e) => setSelectedDep(e.target.value)}
              className="w-full appearance-none pl-5 pr-10 py-3 rounded-xl text-sm font-bold text-[#1A1A1A] bg-gray-50 border border-gray-600 focus:outline-none focus:border-[#F5C800] focus:ring-2 focus:ring-[#F5C800]/20 transition-all cursor-pointer shadow-sm"
            >
              <option value="TODOS">Todos los Departamentos</option>
              {departamentos.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#D72638]" size={18} />
          </div>

          <div className="bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-600 flex items-center gap-2 shadow-sm">
            <Users className="text-[#D72638]" size={18} />
            <span className="text-[#1A1A1A] font-bold text-sm">
              <span className="text-[#D72638]">{total}</span> CANDIDATOS MOSTRADOS
            </span>
          </div>

        </div>
      </div>

      {/* Contenido Principal (Grid de Candidatos) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 min-h-[50vh]">
        {visible.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <Search size={48} className="text-gray-400 mb-4" />
            <p className="text-gray-500 font-bold text-xl uppercase tracking-widest">
              Sin candidatos
            </p>
          </div>
        )}
        
        {visible.map(({ departamento, candidatos }) => (
          <DepartamentoSection
            key={departamento}
            departamento={departamento}
            candidatos={candidatos}
            onSelect={setActiveCandidate}
            selectedDep={selectedDep} // ✅ CAMBIO 4: Pasamos el filtro actual como prop
          />
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-600 py-12 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D72638] flex items-center justify-center shadow-sm">
              <Award className="text-white" size={16} />
            </div>
            <span className="text-[#1A1A1A] font-black text-sm tracking-widest uppercase">
              Partido del Buen Gobierno | 2026 - 2031
            </span>
          </div>
          <p className="text-gray-500 font-bold text-xs tracking-wider uppercase text-center sm:text-right">
            Elecciones Generales 2026<br className="sm:hidden" />
            <span className="hidden sm:inline"> • </span>
            Datos Oficiales del Padrón Electoral
          </p>
        </div>
      </footer>

      {/* Modal de Detalle */}
      <Modal candidato={activeCandidate} onClose={() => setActiveCandidate(null)} />
      
    </div>
  );
}