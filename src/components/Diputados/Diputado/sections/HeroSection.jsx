
const HeroSection = () => {
  return (
    <section id="inicio" className="bg-primary min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary-foreground/70">
              Candidato al Senado
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight text-primary-foreground">
              RICARDO
              <br />
              <span className="text-cta">MÉNDEZ</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-md leading-relaxed">
              Abogado, MBA en Políticas Públicas. 15 años trabajando por la justicia social y el desarrollo comunitario. 
              <strong className="text-primary-foreground"> Un gobierno cercano, transparente y eficiente.</strong>
            </p>
            {/* <div className="flex items-center gap-4 pt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full border-2 border-primary-foreground/30 flex items-center justify-center text-primary-foreground/70 hover:bg-primary-foreground hover:text-primary transition-all"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div> */}
          </div>
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <img
              alt="Ricardo Méndez - Candidato al Senado"
              width={800}
              height={1024}
              className="w-72 md:w-96 lg:w-[28rem] drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;