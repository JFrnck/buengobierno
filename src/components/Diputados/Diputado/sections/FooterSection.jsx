import React, { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";


const FooterSection = () => {
  const [email, setEmail] = useState("");

  return (
    <footer id="contacto" className="bg-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Newsletter */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-background mb-2">
              Mantente informado
            </h3>
            <p className="text-background/60 text-sm mb-4">
              Recibe actualizaciones de la campaña directamente en tu email.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/10 border-background/20 text-background placeholder:text-background/40 rounded-full"
              />
              <Button className="bg-cta hover:bg-cta/90 text-cta-foreground font-bold rounded-full px-6 shrink-0">
                Suscribir
              </Button>
            </form>
          </div>

          {/* Social */}
          {/* <div>
            <h3 className="text-xl font-bold text-background mb-4">Síguenos</h3>
            <div className="flex gap-3">
              {[Instagram, Twitter, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center text-background/60 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div> */}
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-background/40">
            <p>
              Pagado por el Comité de Campaña de Ricardo Méndez al Senado. RNC: 000-000000-0
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-background/70 transition-colors">Contacto</a>
              <a href="#" className="hover:text-background/70 transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-background/70 transition-colors">Términos</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;