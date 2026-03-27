import HeroSection from '../components/home/HeroSection'
import MarqueeBar from '../components/home/MarqueeBar'
import CardsSection from '../components/home/CardsSection'
import PlanSection from '../components/home/PlanSection'
import MediaSection from '../components/home/MediaSection'
import FormSection from '../components/home/FormSection'
import VoteSection from '../components/home/VoteSection'
import Footer from '../components/layout/Footer'
import VotingComponent from '../components/home/VotingComponent'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <MarqueeBar />
      <CardsSection />
      <PlanSection />
      <MediaSection />
      {/* <VoteSection /> */}
      <VotingComponent/>
      {/* <FormSection /> */}
      <Footer />
    </main>
  )
}
