import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Voluntarios from './pages/Voluntarios'
import Navbar from './components/layout/Navbar'
import PlanGobiernoPage  from './pages/PlanDeGobierno'
import CoquitoChat from './components/shared/ChatWidget'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <CoquitoChat />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plan-de-gobierno" element={<PlanGobiernoPage />} />
        <Route path="/voluntarios" element={<Voluntarios />} />
      </Routes>
    </BrowserRouter>
  )
}
