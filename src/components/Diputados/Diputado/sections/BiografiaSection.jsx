

const BiografiaSection = () => {
  return (
    <section id="biografia" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-cta mb-4">
            Conóceme
          </p>
          <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
            De la comunidad,
            <br />
            <span className="text-cta">para la comunidad.</span>
          </h2>
          <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
            <p>
              Nacido y criado en el corazón de Santiago, Ricardo Méndez conoce de primera mano los retos que enfrenta nuestra provincia. Hijo de una maestra y un comerciante, aprendió desde joven el valor del trabajo honesto y el servicio a los demás.
            </p>
            <p>
              Graduado con honores en Derecho por la Universidad Autónoma de Santo Domingo y con una Maestría en Políticas Públicas de la Universidad de Columbia, ha dedicado más de 15 años a la defensa legal de comunidades vulnerables y a la construcción de proyectos de desarrollo local.
            </p>
            <p>
              Como regidor y luego director de la Oficina de Desarrollo Comunitario, lideró programas que beneficiaron a más de 50,000 familias en educación, salud y empleo. Hoy busca llevar esa misma visión al Senado de la República.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black text-cta">15+</p>
              <p className="text-sm text-muted-foreground mt-1 font-medium">Años de servicio</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black text-cta">50K</p>
              <p className="text-sm text-muted-foreground mt-1 font-medium">Familias beneficiadas</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black text-cta">120+</p>
              <p className="text-sm text-muted-foreground mt-1 font-medium">Proyectos ejecutados</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiografiaSection;