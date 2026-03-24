import HeroVoluntarios from '../components/voluntarios/HeroVoluntarios'
import VoluntariosInfo from '../components/voluntarios/VoluntariosInfo'
import GaleriaSection from '../components/voluntarios/GaleriaSection'
import PersonerosSection from '../components/voluntarios/PersonerosSection'
import MeetingsSection from '../components/voluntarios/MeetingsSection'
import EventosSection from '../components/voluntarios/EventosSection'
import VoluntariosForm from '../components/voluntarios/VoluntariosForm'
import Footer from '../components/layout/Footer'

export default function Voluntarios() {
  return (
    <main>
      <HeroVoluntarios />
      <VoluntariosInfo />
      <GaleriaSection title="Voluntarios en acción" tag="Galería Voluntarios" />
      <PersonerosSection />
      <GaleriaSection title="Personeros en las urnas" tag="Galería Personeros" />
      <MeetingsSection />
      <EventosSection />
      <VoluntariosForm />
      <Footer />
    </main>
  )
}
