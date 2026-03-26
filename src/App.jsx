import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Voluntarios from './pages/Voluntarios'
import Navbar from './components/layout/Navbar'
import WhatsAppBubble from './components/shared/WhatsAppBubble'
import PlanGobiernoPage  from './pages/PlanDeGobierno'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <WhatsAppBubble />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plan-de-gobierno" element={<PlanGobiernoPage />} />
        <Route path="/voluntarios" element={<Voluntarios />} />
      </Routes>
    </BrowserRouter>
  )
}
