import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Target, Leaf, TrendingUp, Sun, HeartPulse, Map, Globe, Flag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. PRESENTACIÓN Y GUÍA DE NAVEGACIÓN
// ==========================================
const HeroPresentation = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1 } });
    
    tl.fromTo('.hero-badge', 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, delay: 0.2 }
    )
    .fromTo('.hero-title',
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1 }
    )
    .fromTo('.hero-text',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.2 },
      "-=0.5"
    )
    .fromTo('.nav-item',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, stagger: 0.1 },
      "-=0.5"
    );

    gsap.to('.scroll-indicator', {
      y: 15,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      duration: 1
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#F5C800] flex flex-col justify-center pt-20 pb-10 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-[#E0B400] opacity-30 mix-blend-multiply" />
      
      <div className="max-w-7xl mx-auto w-full z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="hero-badge inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-1 bg-[#D72638]" />
            <span className="text-[#D72638] font-bold text-sm tracking-[0.2em] uppercase">
              Plan de Gobierno 2026-2031
            </span>
          </div>
          <h1 className="flex flex-col hero-title font-black text-[#1A1A1A] leading-[1] tracking-[-0.03em] text-5xl md:text-7xl lg:text-8xl mb-8">
            <span className="text-[#D72638]">NUESTRO</span>
            <span className="text-white">PACTO</span>
            <span className="text-[#D72638]">SOCIAL</span>
          </h1>
          <p className="hero-text text-[#1A1A1A]/80 font-medium text-lg md:text-xl leading-relaxed mb-6">
            El PBG 2026–2031 plantea transformar el Perú hacia un modelo de desarrollo equitativo, sostenible, territorialmente equilibrado y libre de corrupción.
          </p>
          <p className="hero-text text-[#1A1A1A]/80 font-medium text-lg md:text-xl leading-relaxed mb-10">
            Mediante un Estado profesional, transparente y orientado al bienestar, reemplazamos el enfoque extractivista por un nuevo pacto social centrado en las personas y la naturaleza.
          </p>
        </div>

        {/* Navegación Interactiva */}
        <div className="bg-[#1A1A1A] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <h3 className="text-[#F5C800] font-bold text-xl mb-6 tracking-wide uppercase">Ejes Estratégicos</h3>
          <ul className="space-y-4">
            {[
              { id: 'eje1', title: 'Diversidad y Territorio' },
              { id: 'eje2', title: 'Estado y Gobernabilidad' },
              { id: 'eje3', title: 'Economía para el Bienestar' },
              { id: 'eje4', title: 'Transición Energética' },
              { id: 'eje5', title: 'Educación y Salud' },
              { id: 'eje6', title: 'Amazonía, Sierra y Mar' }
            ].map((eje, i) => (
              <li key={i} className="nav-item">
                <a href={`#${eje.id}`} className="group flex items-center justify-between text-white/70 hover:text-white transition-colors duration-300 pb-2 border-b border-white/10 hover:border-[#D72638]">
                  <span className="font-medium text-lg"><span className="text-[#D72638] mr-2 font-black">{i+1}.</span> {eje.title}</span>
                  <span className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 text-[#D72638]">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 w-8 h-12 border-2 border-[#1A1A1A]/30 rounded-full flex justify-center p-1">
        <div className="w-1.5 h-3 bg-[#D72638] rounded-full" />
      </div>
    </section>
  );
};

// ==========================================
// COMPONENTE BASE PARA EJES (REUTILIZABLE)
// ==========================================
const EjeSection = ({ id, number, title, icon: Icon, points, isDark }) => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo('.eje-num', 
      { opacity: 0, x: -50, rotation: -10 }, 
      { opacity: 0.1, x: 0, rotation: 0, duration: 1, ease: 'back.out(1.5)' }
    )
    .fromTo('.eje-header',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    )
    .fromTo('.eje-point',
      { opacity: 0, x: 30, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.6, stagger: 0.15 },
      "-=0.4"
    );
  }, { scope: sectionRef });

  const bgClass = isDark ? 'bg-white text-black' : 'bg-[#D72638] text-white';
  const accentClass = isDark ? 'text-black' : 'text-white';
  const cardClass = isDark ? 'bg-[#1A1A1A]/5 border-[#1A1A1A]/10' : 'bg-white/5 border-white/10';

  return (
    <section ref={sectionRef} id={id} className={`py-24 px-6 md:px-12 lg:px-20 relative overflow-hidden ${bgClass}`}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="eje-num absolute -top-10 -right-10 text-[15rem] font-black leading-none pointer-events-none select-none" style={{ opacity: 0 }}>
          0{number}
        </div>

        <div className="eje-header flex items-center gap-4 mb-12">
          <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#D72638]' : 'bg-[#F5C800]'}`}>
            <Icon className={isDark ? 'text-white' : 'text-[#D72638]'} size={32} />
          </div>
          <div>
            <h4 className={`font-bold tracking-[0.2em] text-sm mb-1 ${accentClass}`}>EJE ESTRATÉGICO 0{number}</h4>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">{title}</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {points.map((point, idx) => (
            <div key={idx} className={`eje-point p-6 rounded-2xl border ${cardClass} backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300`}>
              <div className="flex items-start gap-4">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${isDark ? 'bg-[#F5C800]' : 'bg-white'}`} />
                <p className="text-lg font-medium leading-relaxed opacity-90">{point}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 2-7. LOS 6 EJES ESTRATÉGICOS
// ==========================================
const EjesList = () => {
  return (
    <>
      <EjeSection 
        id="eje1" number="1" title="Diversidad y Territorio" icon={Map} isDark={false}
        points={[
          "Reconoce la diversidad cultural, lingüística y ecológica del país.",
          "Impulsa un desarrollo equilibrado entre costa, sierra y selva, con enfoque territorial y sostenible.",
          "Promueve la integración ferroviaria nacional, con proyectos como Marcona–Andahuaylas, Trujillo–Barranca, Chancay–Ica, Lambayeque–Cajamarca y Cerro de Pasco–Pucallpa–Cruzeiro do Sul.",
          "Fomenta el ordenamiento territorial y la descentralización efectiva."
        ]} 
      />
      <EjeSection 
        id="eje2" number="2" title="Estado y Gobernabilidad" icon={Flag} isDark={true}
        points={[
          "Reforma integral del Estado: meritocracia, descentralización, transparencia y eficiencia.",
          "Fortalecimiento de entes reguladores y equilibrio entre poderes.",
          "Lucha frontal contra la corrupción y el centralismo.",
          "Promueve la reforma del sistema de partidos políticos y la participación ciudadana."
        ]} 
      />
      <EjeSection 
        id="eje3" number="3" title="Economía para el Bienestar" icon={TrendingUp} isDark={false}
        points={[
          "Transición de un modelo extractivo a una economía diversificada e inclusiva.",
          "Apuesta por la industrialización sostenible, la ciencia, tecnología e innovación (CTI) y la formalización laboral.",
          "Creación de un Fondo Soberano de Riqueza para inversión estratégica a largo plazo.",
          "Objetivo: crecimiento del PBI ≥ 5 %, informalidad laboral ≤ 50 %, pobreza ≤ 20 %, e inversión en I+D ≥ 1 % del PBI."
        ]} 
      />
      <EjeSection 
        id="eje4" number="4" title="Transición Energética y Medioambiente" icon={Leaf} isDark={true}
        points={[
          "Independencia energética mediante fuentes renovables (solar, eólica, hidrógeno verde).",
          "Impuestos verdes, eliminación progresiva de subsidios fósiles y promoción de econegocios.",
          "Recuperación de ecosistemas y lucha contra la deforestación y contaminación.",
          "Educación ambiental y participación ciudadana en la gestión ecológica."
        ]} 
      />
      <EjeSection 
        id="eje5" number="5" title="Educación y Salud de Calidad" icon={HeartPulse} isDark={false}
        points={[
          "Educación inclusiva, equitativa y científica, centrada en el pensamiento crítico, la interculturalidad y la equidad de género.",
          "Fortalecimiento de la carrera docente y universalización de la educación superior.",
          "Salud universal con enfoque intercultural, digitalización del sistema sanitario y prevención de enfermedades.",
          "Metas: anemia infantil <10 %, cobertura de salud efectiva 100 %, y digitalización completa del sistema MINSA."
        ]} 
      />
      <EjeSection 
        id="eje6" number="6" title="Amazonía, Sierra y Mar" icon={Sun} isDark={true}
        points={[
          "Protección de la Amazonía y aprovechamiento sostenible de su biodiversidad.",
          "Política de tierras que combine utilidad pública e interés social respetando los derechos indígenas.",
          "Pesca sostenible y seguridad alimentaria, fortaleciendo la soberanía sobre el mar peruano."
        ]} 
      />
    </>
  );
};

// ==========================================
// 8. COMPROMISOS ESTRATÉGICOS Y META 2031
// ==========================================
const CompromisosMeta = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });

    tl.fromTo('.comp-card',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
    )
    .fromTo('.meta-box',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.7)' },
      "-=0.4"
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 bg-[#D72638] text-white px-6 md:px-12 lg:px-20 relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Compromisos */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Globe className="text-[#F5C800]" size={32} />
            <h2 className="text-4xl font-black tracking-tight">Compromisos Estratégicos</h2>
          </div>
          
          <div className="space-y-4">
            {[
              "Integración regional: Alianza del Pacífico, Comunidad Andina, APEC y adhesión a la OCDE.",
              "Inversión sostenida en CTI, infraestructura y energías limpias.",
              "Participación ciudadana activa en el control y evaluación de políticas públicas.",
              "Enfoques transversales: género, interculturalidad, sostenibilidad climática y digitalización estatal."
            ].map((text, i) => (
              <div key={i} className="comp-card bg-white/10 backdrop-blur-md p-5 rounded-2xl flex items-start gap-4">
                <Target className="text-[#F5C800] shrink-0 mt-1" size={20} />
                <p className="font-medium text-lg leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Meta Final 2031 */}
        <div className="meta-box bg-[#F5C800] rounded-[3rem] p-10 md:p-14 text-[#1A1A1A] shadow-2xl relative overflow-hidden transform transition-transform">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/30 rounded-full blur-3xl pointer-events-none" />
          
          <h3 className="text-[#D72638] font-black text-2xl tracking-widest uppercase mb-4">Meta Final 2031</h3>
          <p className="text-3xl md:text-4xl font-black leading-tight tracking-tight mb-8">
            Construir un Perú justo, competitivo, verde e inclusivo, donde el crecimiento económico, la igualdad social y el respeto ambiental vayan de la mano.
          </p>
          <div className="h-1 w-20 bg-[#D72638] mb-8" />
          <p className="text-xl font-medium leading-relaxed opacity-90">
            El PBG busca consolidar un nuevo contrato social que combine eficiencia estatal, desarrollo humano y sostenibilidad ambiental como pilares del Buen Gobierno.
          </p>
        </div>

      </div>
    </section>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL (EXPORT)
// ==========================================
export default function PlanGobiernoPage() {
  return (
    <main className="bg-[#1A1A1A] font-sans selection:bg-[#D72638] selection:text-white">
      <HeroPresentation />
      <EjesList />
      <CompromisosMeta />
    </main>
  );
}