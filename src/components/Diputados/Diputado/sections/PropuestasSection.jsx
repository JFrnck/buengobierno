
import { Shield, GraduationCap, Briefcase, Heart, Leaf } from "lucide-react";

const propuestas = [
  {
    icon: Shield,
    title: "Seguridad Ciudadana",
    desc: "Implementar tecnología de vigilancia inteligente y fortalecer la policía comunitaria para reducir la criminalidad en un 40%.",
  },
  {
    icon: GraduationCap,
    title: "Educación de Calidad",
    desc: "Becas completas para estudiantes de escasos recursos, digitalización de las aulas y formación docente continua.",
  },
  {
    icon: Briefcase,
    title: "Empleo y Emprendimiento",
    desc: "Crear un fondo de microcréditos sin intereses para jóvenes emprendedores y atraer inversión extranjera a la provincia.",
  },
  {
    icon: Heart,
    title: "Salud para Todos",
    desc: "Ampliar la cobertura del seguro de salud, construir 3 nuevos centros de atención primaria y equipar hospitales con tecnología moderna.",
  },
  {
    icon: Leaf,
    title: "Medio Ambiente",
    desc: "Programa de reforestación masiva, protección de cuencas hidrográficas y transición hacia energías limpias en edificios públicos.",
  },
];

const PropuestasSection = () => {
  return (
    <section id="propuestas" className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-cta mb-4">
            El Plan
          </p>
          <h2 className="text-3xl md:text-5xl font-black leading-tight">
            Propuestas concretas,
            <br />
            resultados reales.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {propuestas.map((p) => (
            <div
              key={p.title}
              className="bg-background rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow border border-border group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                <p.icon size={24} className="text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-3">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropuestasSection;