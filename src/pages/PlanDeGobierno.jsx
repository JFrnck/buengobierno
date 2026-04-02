import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Target, Leaf, TrendingUp, Sun, HeartPulse, 
  Map, Globe, Flag, CheckCircle2, Zap 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. DATOS INTEGRALES DEL PLAN (PDF OFICIAL)
// ==========================================
const AXES_DATA = [
  {
    id: 'eje1',
    number: '1',
    title: 'Diversidad y Territorio',
    subtitle: 'Integración territorial sostenible',
    icon: Map,
    vision: 'Un Perú integrado que reconoce su diversidad cultural, lingüística y ecológica como fortaleza, impulsando desarrollo equilibrado entre costa, sierra y selva con descentralización real y ordenamiento territorial efectivo.',
    description: 'Proponemos un modelo de desarrollo que parte del reconocimiento de la riqueza territorial del Perú. Con infraestructura estratégica, integración ferroviaria, ordenamiento territorial y coordinación multinivel vinculante, conectaremos las regiones y reduciremos brechas históricas de inequidad, creando territorios funcionales y macrorregiones competitivas.',
    objectives: [
      "Desarrollo equilibrado costa–sierra–selva con enfoque territorial y sostenible.",
      "Red ferroviaria: Marcona–Andahuaylas, Trujillo–Barranca, Chancay–Ica, Lambayeque–Cajamarca y Cerro de Pasco–Pucallpa–Cruzeiro do Sul.",
      "Ordenamiento territorial y zonificación económico-ecológica con criterios técnicos en todo el país.",
      "Descentralización real con capacidades institucionales subnacionales reforzadas y meritocracia regional.",
      "Coordinación multinivel vinculante con Agendas Territoriales Multianuales consensuadas.",
      "Mancomunidades, agencias regionales de desarrollo y consorcios intermunicipales operativos."
    ],
    actions: [
      { label: 'Reforma fiscal subnacional', detail: 'FONCOMUN rediseñado con criterios de equidad y eficiencia, coparticipación del IGV, transferencias condicionadas a resultados y autonomía fiscal regional para fortalecer la inversión pública territorial.' },
      { label: 'Sistema de información territorial', detail: 'Plataforma nacional que integra en tiempo real datos de planificación, brechas de inversión, riesgos de desastres y estadísticas regionales para la toma de decisiones descentralizada y transparente.' },
      { label: 'Territorios funcionales', detail: 'Macrorregiones basadas en criterios geoeconómicos, conectividad y especialización productiva, eliminando duplicidades de funciones entre niveles de gobierno con marcos claros de competencias presupuestales.' },
      { label: 'Profesionalización subnacional', detail: 'Meritocracia, formación continua y certificación de competencias para funcionarios regionales y municipales, con escuelas regionales de formación pública e incentivos vinculados al desempeño medible.' }
    ],
    stats: [
      { value: 5, label: 'Corredores ferroviarios', suffix: '' },
      { value: 25, label: 'Planes territoriales', suffix: '' },
      { value: 100, label: 'Coordinación multinivel', suffix: '%' }
    ],
    isDark: false
  },
  {
    id: 'eje2',
    number: '2',
    title: 'Estado y Gobernabilidad',
    subtitle: 'Reforma integral del Estado',
    icon: Flag,
    vision: '"Integridad para gobernar, gobernar para transformar." Al 2031, el Perú tendrá instituciones íntegras y confiables donde la corrupción sea reducida sustantivamente mediante un Estado profesional, digital, eficiente y orientado al bien común.',
    description: 'Reformaremos integralmente el Estado con meritocracia, transparencia y eficiencia. Fortaleceremos los entes reguladores y el equilibrio entre poderes, derogaremos las leyes pro-crimen en 30 días, combatiremos de frente la corrupción con inteligencia artificial y tecnología, y promoveremos la participación ciudadana activa en el control del gasto público.',
    objectives: [
      "Reforma integral del Estado: meritocracia, descentralización, transparencia y eficiencia institucional.",
      "Fortalecimiento de entes reguladores y equilibrio real entre los poderes del Estado peruano.",
      "Derogación inmediata de leyes pro-crimen y lucha frontal contra la corrupción en los primeros 30 días.",
      "Reforma del sistema de partidos políticos y financiamiento transparente de la democracia representativa.",
      "Ciudadanía vigilante con portal 'Vigila tu Obra', observatorios regionales y denuncia anónima blindada.",
      "Plataforma 'Estado Íntegro Perú 2031': contratos, obras y presupuesto 100% digitales y trazables."
    ],
    actions: [
      { label: 'Carrera directiva pública', detail: 'Carrera Directiva Pública obligatoria, eliminación de rotación política en cargos operativos, evaluación anual de capacidades y escuelas regionales de formación para el servicio civil profesional.' },
      { label: 'Transparencia presupuestal total', detail: 'Registro Único de Obras y Compras del Perú (RUOCP), auditoría digital continua, contrataciones 100% abiertas por defecto y trazabilidad completa en tiempo real.' },
      { label: 'Justicia anticorrupción efectiva', detail: 'Fiscalías anticorrupción regionales con presupuesto protegido, recuperación automática de activos, nulidad de contratos corruptos y procedimientos disciplinarios rápidos.' },
      { label: 'Centro Nacional de Integridad', detail: 'Órgano autónomo en PCM con monitoreo permanente, inteligencia artificial para detección de riesgos y dashboard nacional público de integridad.' }
    ],
    stats: [
      { value: 30, label: 'Días para derogar leyes', suffix: '' },
      { value: 100, label: 'Transparencia en compras', suffix: '%' },
      { value: 0, label: 'Tolerancia a la corrupción', suffix: '' }
    ],
    isDark: true
  },
  {
    id: 'eje3',
    number: '3',
    title: 'Economía para el Bienestar',
    subtitle: 'Del extractivismo a la diversificación',
    icon: TrendingUp,
    vision: 'Una economía diversificada, resiliente e inclusiva con crecimiento mínimo del 5% del PBI anual, menor desigualdad, informalidad ≤ 50%, pobreza ≤ 20% y un Fondo Soberano de Riqueza para inversión estratégica de largo plazo.',
    description: 'Transitaremos del modelo extractivo a una economía diversificada e inclusiva. Apostaremos por la industrialización sostenible, la ciencia, tecnología e innovación (CTI), la formalización con incentivos reales para MYPE y el desarrollo de clústeres regionales en agroindustria, turismo, energías limpias y tecnología digital como motores del crecimiento territorial.',
    objectives: [
      "Crecimiento económico sostenido e inclusivo: PBI ≥ 5% anual y pobreza ≤ 20% al 2031.",
      "Diversificación: petroquímica, metalmecánica, agroindustria, turismo y economía digital nacional.",
      "Reducción de informalidad a ≤ 50% con incentivos, protección social y acompañamiento técnico a MYPE.",
      "Inversión en I+D ≥ 1% del PBI con fortalecimiento de SUNEDU y el sistema nacional de CTI.",
      "Fondo Soberano de Riqueza con gobernanza autónoma, técnica y transparente para proyectos estratégicos.",
      "Clústeres regionales en agroindustria, turismo, energías limpias y tecnologías digitales descentralizados."
    ],
    actions: [
      { label: 'Fondo Soberano de Riqueza', detail: 'Gobernanza autónoma, técnica y transparente para gestionar ingresos por recursos naturales y activos del Estado, financiando proyectos estratégicos interregionales.' },
      { label: 'Programa Nacional de Productividad', detail: 'Integra reformas laborales, tributarias e innovación con enfoque territorial para MYPE y trabajadores autoempleados, con certificación de competencias.' },
      { label: 'Formalización integral MYPE', detail: 'Registro Nacional + crédito + protección social (salud ocupacional, vejez) + acompañamiento técnico con incentivos tributarios temporalmente acotados.' },
      { label: 'APP y Obras por Impuestos', detail: 'Relanzamiento con modelos transparentes y articulación BCR–MEF–PRODUCE para coherencia macro-productiva, fiscalización digital y priorización.' }
    ],
    stats: [
      { value: 5, label: 'Crecimiento min. PBI', suffix: '%' },
      { value: 50, label: 'Meta max. informalidad', suffix: '%' },
      { value: 20, label: 'Meta max. pobreza 2031', suffix: '%' }
    ],
    isDark: false
  },
  {
    id: 'eje4',
    number: '4',
    title: 'Transición Energética',
    subtitle: 'Soberanía energética verde y Medioambiente',
    icon: Leaf,
    vision: 'Al 2030, el Perú contará con un sector energético seguro, sostenible, diversificado y resiliente, que garantice acceso universal y asequible a la energía limpia, con independencia progresiva de los combustibles fósiles importados.',
    description: 'Alcanzaremos la independencia energética mediante solar, eólica e hidrógeno verde. Implementaremos el Polo Petroquímico del Sur (Marcona–Ilo), mini redes solares en la Amazonía, reduciremos emisiones GEI en 25%, eliminaremos subsidios fósiles ineficientes y crearemos un impuesto al carbono destinado a la protección del bosque amazónico.',
    objectives: [
      "Energías renovables al 30% de la matriz eléctrica al 2030: solar, eólica, biomasa y geotérmica.",
      "Hidrógeno verde, electromovilidad y almacenamiento energético como industrias estratégicas nacionales.",
      "Reducción de emisiones GEI del sector energético en 25% respecto a los niveles de 2025.",
      "Cobertura eléctrica rural 100% con mini redes solares en Amazonía y redes inteligentes (smart grids).",
      "Polo Petroquímico Marcona–Ilo y gas natural como insumo industrial (fertilizantes, plásticos, derivados).",
      "Impuesto al carbono de fósiles destinado a protección amazónica y eliminación de subsidios fósiles."
    ],
    actions: [
      { label: 'Transición energética estructural', detail: 'Incentivos fiscales y regulatorios para RER-NC (solar, eólica, biomasa, geotérmica), redes inteligentes, generación distribuida e implementación de mini redes.' },
      { label: 'Polo Petroquímico del Sur', detail: 'Implementación del Polo Marcona–Ilo, uso del gas natural como insumo industrial, Zonas Geográficas Determinadas (ZGD) y clústeres manufactureros.' },
      { label: 'Recuperación de ecosistemas', detail: 'Lucha contra deforestación y contaminación, econegocios, impuesto a emisiones de carbono fósil destinado a protección del bosque amazónico.' },
      { label: 'I+D en energía limpia', detail: 'Investigación en hidrógeno verde, flotas eléctricas de transporte público, electrificación fluvial amazónica y alianzas con universidades.' }
    ],
    stats: [
      { value: 30, label: 'Matriz Renovable', suffix: '%' },
      { value: 25, label: 'Reducción GEI', suffix: '%' },
      { value: 100, label: 'Cobertura rural', suffix: '%' }
    ],
    isDark: true
  },
  {
    id: 'eje5',
    number: '5',
    title: 'Educación y Salud',
    subtitle: 'Derechos universales garantizados',
    icon: HeartPulse,
    vision: '"Por un Perú educado, equitativo, científico y diverso" con salud universal e intercultural. Al 2031, el Perú contará con un sistema prestacional único, atención primaria fortalecida y cobertura efectiva en todo el territorio.',
    description: 'Garantizaremos educación inclusiva, intercultural y científica centrada en el pensamiento crítico, la equidad de género y la creatividad. En salud, consolidaremos un sistema único con Historia Clínica Electrónica interoperable, telemedicina, aseguramiento con solo DNI, medicamentos genéricos accesibles y erradicación de la corrupción en el sistema sanitario.',
    objectives: [
      "Trayectorias educativas completas y flexibles desde primera infancia hasta educación superior universal.",
      "Carrera docente meritocrática con formación continua, evaluación de desempeño e incentivos salariales.",
      "Sistema prestacional único e integrado: MINSA, EsSalud, fuerzas armadas y sector privado articulados.",
      "Anemia infantil < 10%, inmunizaciones 100% y estrategias territoriales contra enfermedades prevenibles.",
      "Historia Clínica Electrónica Única interoperable y aseguramiento universal efectivo con solo DNI.",
      "Telemedicina para zonas rurales, Sistema Único de Emergencia Nacional y atención domiciliaria activa."
    ],
    actions: [
      { label: 'Educación para el siglo XXI', detail: 'Currículo reformado con pensamiento crítico, interculturalidad y tecnología. Universalización de la educación superior con SUNEDU fortalecida y formación técnica.' },
      { label: 'PLAN Cobertura Completa', detail: 'Eliminación de barreras geográficas, afiliación automática al SIS, tarifario único nacional, Historia Clínica Electrónica y reducción del gasto de bolsillo.' },
      { label: 'Infraestructura sanitaria', detail: 'EESS de primer nivel funcionando más de 12h con médico por perfil epidemiológico, unidades móviles, atención comunitaria y repotenciamiento de telemedicina.' },
      { label: 'Medicamentos accesibles', detail: 'Incentivos para genéricos nacionales, compras corporativas con OPS/OMS y UNOPS, observatorio de precios y eliminación del monopolio farmacéutico.' }
    ],
    stats: [
      { value: 10, label: 'Meta max. Anemia', suffix: '%' },
      { value: 100, label: 'Cobertura Salud', suffix: '%' },
      { value: 100, label: 'Inmunizaciones', suffix: '%' }
    ],
    isDark: false
  },
  {
    id: 'eje6',
    number: '6',
    title: 'Amazonía, Sierra y Mar',
    subtitle: 'Motores estratégicos del desarrollo',
    icon: Sun,
    vision: 'La Amazonía, la sierra y el mar peruano como pilares del desarrollo sostenible al 2031: bosque en pie, bioeconomía activa, derechos indígenas garantizados, agro moderno y soberanía alimentaria consolidada.',
    description: 'Consolidaremos un modelo amazónico de desarrollo que mantiene el bosque en pie, intensifica sosteniblemente las áreas deforestadas e impulsa la bioeconomía. Modernizaremos el agro con agua, asistencia técnica y asociatividad. Garantizaremos la pesca sostenible, la titulación del 24% del territorio amazónico pendiente y la soberanía alimentaria nacional.',
    objectives: [
      "Bosque amazónico en pie: bioeconomía, ecoturismo, productos no maderables y servicios ecosistémicos.",
      "Gobernanza indígena amazónica y titulación del 24% del territorio pendiente de reconocimiento formal.",
      "Pesca sostenible, ordenamiento del mar peruano y soberanía alimentaria como política de Estado.",
      "Agro modernizado: agua, asistencia técnica, asociatividad, tecnificación y Agrobanco reformado.",
      "Minería con sostenibilidad, gobernanza y prosperidad compartida con comunidades; cero minería ilegal.",
      "Cadenas de valor: cacao, café, frutales nativos, con trazabilidad, certificación y mercados globales."
    ],
    actions: [
      { label: 'Plan Nacional Amazónico', detail: 'FONDESAM para inversiones estratégicas, monitoreo satelital, titulación de comunidades nativas, delimitación de la frontera forestal y compromisos de la Declaración de Belém.' },
      { label: 'Modernización agraria integral', detail: 'Reconceptualización de Agrobanco, acceso al riego, asistencia técnica especializada, digitalización agraria, cadenas de valor sostenibles y liderazgo de la mujer rural.' },
      { label: 'Pesca sostenible', detail: 'Ordenamiento pesquero, infraestructura portuaria sostenible, soberanía sobre el mar peruano y seguridad alimentaria con apoyo a comunidades artesanales.' },
      { label: 'Minería responsable', detail: 'Altos estándares ambientales, consulta previa fortalecida, valor compartido territorial, erradicación de la minería ilegal y remediación de pasivos ambientales.' }
    ],
    stats: [
      { value: 9, label: 'Regiones amazónicas', suffix: '' },
      { value: 24, label: 'Territorio a titular', suffix: '%' },
      { value: 100, label: 'Soberanía Alimentaria', suffix: '%' }
    ],
    isDark: true
  }
];

// ==========================================
// 2. COMPONENTE HERO
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
    <section ref={containerRef} className="relative min-h-screen bg-[#F5C800] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-5%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full bg-[#E0B400] opacity-30 mix-blend-multiply pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full z-10 grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <div className="hero-badge inline-flex items-center gap-2 mb-6">
            <span className="w-6 sm:w-8 h-1 bg-[#D72638]" />
            <span className="text-[#D72638] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase">
              Plan de Gobierno 2026-2031
            </span>
          </div>
          <h1 className="flex flex-col hero-title font-black text-[#1A1A1A] leading-[1] tracking-[-0.03em] text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-6 sm:mb-8 break-words">
            <span className="text-[#D72638]">NUESTRO</span>
            <span className="text-white drop-shadow-md">PACTO</span>
            <span className="text-[#D72638]">SOCIAL</span>
          </h1>
          <p className="hero-text text-[#1A1A1A]/80 font-medium text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-6 max-w-xl">
            El PBG 2026–2031 plantea transformar el Perú hacia un modelo de desarrollo equitativo, sostenible, territorialmente equilibrado y libre de corrupción.
          </p>
          <p className="hero-text text-[#1A1A1A]/80 font-medium text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 max-w-xl">
            Mediante un Estado profesional, transparente y orientado al bienestar, reemplazamos el enfoque extractivista por un nuevo pacto social centrado en las personas y la naturaleza.
          </p>
        </div>

        {/* Navegación Interactiva */}
        <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
          <h3 className="text-[#F5C800] font-bold text-lg sm:text-xl mb-4 sm:mb-6 tracking-wide uppercase">Ejes Estratégicos</h3>
          <ul className="space-y-3 sm:space-y-4">
            {AXES_DATA.map((eje, i) => (
              <li key={i} className="nav-item">
                <a href={`#${eje.id}`} className="group flex items-center justify-between text-white/70 hover:text-white transition-colors duration-300 pb-2 sm:pb-3 border-b border-white/10 hover:border-[#D72638]">
                  <span className="font-medium text-base sm:text-lg leading-tight"><span className="text-[#D72638] mr-2 font-black">{eje.number}.</span> {eje.title}</span>
                  <span className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 text-[#D72638] shrink-0 ml-2">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="scroll-indicator absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 w-8 h-12 border-2 border-[#1A1A1A]/30 rounded-full flex justify-center p-1 hidden sm:flex">
        <div className="w-1.5 h-3 bg-[#D72638] rounded-full" />
      </div>
    </section>
  );
};

// ==========================================
// 3. COMPONENTE BASE PARA EJES (REUTILIZABLE Y DETALLADO)
// ==========================================
const EjeSection = ({ data }) => {
  const { id, number, title, subtitle, icon: Icon, vision, description, objectives, actions, stats, isDark } = data;
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo(sectionRef.current.querySelector('.eje-num'), 
      { opacity: 0, x: -50, rotation: -10 }, 
      { opacity: 0.1, x: 0, rotation: 0, duration: 1, ease: 'back.out(1.5)' }
    )
    .fromTo(sectionRef.current.querySelectorAll('.eje-header, .eje-vision, .eje-desc'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
      "-=0.5"
    )
    .fromTo(sectionRef.current.querySelectorAll('.eje-obj, .eje-act'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
      "-=0.4"
    );

    sectionRef.current.querySelectorAll('.stat-val').forEach((el) => {
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const obj = { v: 0 };
      
      gsap.to(obj, {
        v: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => { el.textContent = Math.round(obj.v) + suffix },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      });
    });

  }, { scope: sectionRef });

  const bgClass = isDark ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#1A1A1A]';
  const accentClass = isDark ? 'text-[#F5C800]' : 'text-[#D72638]';
  const accentBg = isDark ? 'bg-[#F5C800]' : 'bg-[#D72638]';
  const cardBg = isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10';
  const quoteBorder = isDark ? 'border-[#F5C800]' : 'border-[#D72638]';

  return (
    <section ref={sectionRef} id={id} className={`py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-20 relative overflow-hidden ${bgClass}`}>
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Número Gigante de Fondo (Oculto en pantallas muy pequeñas para evitar desbordes) */}
        <div className="eje-num absolute -top-10 -right-10 text-[10rem] sm:text-[15rem] lg:text-[20rem] font-black leading-none pointer-events-none select-none hidden sm:block" style={{ opacity: 0 }}>
          0{number}
        </div>

        {/* Encabezado */}
        <div className="eje-header flex flex-col md:flex-row md:items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className={`p-4 sm:p-5 rounded-2xl self-start md:self-auto shrink-0 ${accentBg}`}>
            <Icon className={isDark ? 'text-[#1A1A1A]' : 'text-white'} size={32} />
          </div>
          <div>
            <h4 className={`font-bold tracking-[0.1em] sm:tracking-[0.2em] text-xs sm:text-sm mb-2 uppercase break-words ${accentClass}`}>EJE 0{number} — {subtitle}</h4>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none break-words">{title}</h2>
          </div>
        </div>

        {/* Visión y Descripción + Stats */}
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 mb-12 sm:mb-16 items-start">
          <div className="lg:col-span-8">
            <blockquote className={`eje-vision border-l-4 pl-4 sm:pl-6 mb-4 sm:mb-6 ${quoteBorder}`}>
              <p className="text-lg sm:text-xl md:text-2xl font-bold leading-snug italic opacity-90 break-words">
                "{vision}"
              </p>
            </blockquote>
            <p className="eje-desc text-base sm:text-lg opacity-75 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Estadísticas - Corregido para evitar desbordamiento horizontal */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4">
            {stats.map((st, j) => (
              <div key={j} className={`p-4 sm:p-5 rounded-2xl border ${cardBg} flex flex-col justify-center items-start`}>
                <div 
                  className={`stat-val font-black text-3xl sm:text-4xl md:text-5xl leading-none mb-1 sm:mb-2 ${accentClass}`}
                  data-target={st.value}
                  data-suffix={st.suffix}
                >
                  0{st.suffix}
                </div>
                <p className="text-xs sm:text-sm font-semibold opacity-60 uppercase tracking-wide break-words w-full">
                  {st.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dos Columnas: Objetivos y Acciones */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          
          {/* Columna Objetivos */}
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Target className={accentClass} size={24} />
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide break-words">Objetivos Estratégicos</h3>
            </div>
            <div className="flex flex-col gap-3 sm:gap-4">
              {objectives.map((obj, idx) => (
                <div key={idx} className={`eje-obj p-4 sm:p-5 rounded-xl border ${cardBg} flex items-start gap-3 sm:gap-4 hover:-translate-y-1 transition-transform duration-300`}>
                  <CheckCircle2 className={`shrink-0 mt-0.5 sm:mt-1 ${accentClass}`} size={18} />
                  <p className="font-medium text-sm sm:text-base leading-relaxed opacity-90 break-words">{obj}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Columna Líneas de Acción */}
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Zap className={accentClass} size={24} />
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide break-words">Líneas de Acción</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {actions.map((act, idx) => (
                <div key={idx} className={`eje-act p-4 sm:p-5 rounded-xl border ${cardBg} flex flex-col hover:-translate-y-1 transition-transform duration-300`}>
                  <div className="flex items-start gap-2 mb-2 sm:mb-3">
                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-1.5 shrink-0 ${accentBg}`} />
                    <h5 className="font-black text-xs sm:text-sm uppercase tracking-wide leading-tight break-words">
                      {act.label}
                    </h5>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed opacity-75 break-words">
                    {act.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

// ==========================================
// 4. LISTADO DE EJES
// ==========================================
const EjesList = () => {
  return (
    <>
      {AXES_DATA.map((eje, idx) => (
        <EjeSection key={idx} data={eje} />
      ))}
    </>
  );
};

// ==========================================
// 5. COMPROMISOS ESTRATÉGICOS Y META 2031
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
    <section ref={sectionRef} className="py-16 sm:py-24 bg-[#D72638] text-white px-4 sm:px-6 md:px-12 lg:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
        
        {/* Compromisos */}
        <div>
          <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <Globe className="text-[#F5C800] shrink-0" size={28} />
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight break-words">Compromisos Estratégicos</h2>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {[
              "Integración regional: Alianza del Pacífico, Comunidad Andina, APEC y adhesión a la OCDE.",
              "Inversión sostenida en CTI, infraestructura y energías limpias.",
              "Participación ciudadana activa en el control y evaluación de políticas públicas.",
              "Enfoques transversales: género, interculturalidad, sostenibilidad climática y digitalización estatal."
            ].map((text, i) => (
              <div key={i} className="comp-card bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl flex items-start gap-3 sm:gap-4 hover:bg-white/20 transition-colors">
                <Target className="text-[#F5C800] shrink-0 mt-0.5 sm:mt-1" size={18} />
                <p className="font-medium text-sm sm:text-lg leading-snug break-words">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Meta Final 2031 */}
        <div className="meta-box bg-[#F5C800] rounded-3xl sm:rounded-[3rem] p-6 sm:p-10 md:p-14 text-[#1A1A1A] shadow-2xl relative overflow-hidden transform transition-transform">
          <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-white/30 rounded-full blur-3xl pointer-events-none" />
          
          <h3 className="text-[#D72638] font-black text-xl sm:text-2xl tracking-widest uppercase mb-3 sm:mb-4">Meta Final 2031</h3>
          <p className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight mb-6 sm:mb-8 break-words">
            Construir un Perú justo, competitivo, verde e inclusivo, donde el crecimiento económico, la igualdad social y el respeto ambiental vayan de la mano.
          </p>
          <div className="h-1 w-16 sm:w-20 bg-[#D72638] mb-6 sm:mb-8" />
          <p className="text-base sm:text-xl font-medium leading-relaxed opacity-90 break-words">
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
    <main className="bg-[#1A1A1A] font-sans selection:bg-[#D72638] selection:text-[#F5C800]">
      <HeroPresentation />
      <EjesList />
      <CompromisosMeta />
    </main>
  );
}