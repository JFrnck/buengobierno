import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Voluntarios from './pages/Voluntarios'
import Navbar from './components/layout/Navbar'
import PlanGobiernoPage  from './pages/PlanDeGobierno'
import CoquitoChat from './components/shared/ChatWidget'

// Importamos las nuevas páginas
import DiputadosPage from './components/Diputados/DisputadosPage'
import DiputadoPage from './components/Diputados/Diputado/DiputadoPage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <CoquitoChat />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plan-de-gobierno" element={<PlanGobiernoPage />} />
        <Route path="/voluntarios" element={<Voluntarios />} />
        
        {/* Ruta para el listado general */}
        <Route path="/diputados" element={<DiputadosPage />} />
        
        {/* Ruta dinámica para el perfil individual usando :slug */}
        <Route path="/diputados/:slug" element={<DiputadoPage />} />
      </Routes>
    </BrowserRouter>
  )
}