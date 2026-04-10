import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Home from './pages/Home'
// import Voluntarios from './pages/Voluntarios'
import Navbar from './components/layout/Navbar'
import PlanGobiernoPage  from './pages/PlanDeGobierno'
import CoquitoChat from './components/shared/ChatWidget'

import DiputadosPage from './components/Diputados/DisputadosPage'
import DiputadoPage from './components/Diputados/Diputado/DiputadoPage'
import PromoBanner from './components/home/PromoBanner'
// import BannerCierreCampana from './components/home/EventBanner'

// 1. IMPORTAMOS LA NUEVA VISTA DE SENADORES
import SenadoresPage from './components/Senadores/SenadoresPage' // Ajusta la ruta según donde hayas guardado el archivo

const MainLayout = () => {
  return (
    <>
      <PromoBanner/>
      {/* <BannerCierreCampana/> */}
      <Navbar />
      <Outlet /> 
      <CoquitoChat />
    </>
  )
}

// Renombramos DiputadosLayout a CandidatosLayout para mayor claridad
const CandidatosLayout = () => {
  return (
    <>
      {/* No ponemos el Navbar aquí */}
      <Outlet /> 
      <CoquitoChat /> 
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- GRUPO 1: Páginas que SÍ tendrán Navbar --- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/plan-de-gobierno" element={<PlanGobiernoPage />} />
          {/* <Route path="/voluntarios" element={<Voluntarios />} /> */}
        </Route>

        {/* --- GRUPO 2: Páginas de Candidatos (SIN Navbar) --- */}
        <Route element={<CandidatosLayout />}>
          <Route path="/diputados" element={<DiputadosPage />} />
          <Route path="/diputados/:slug" element={<DiputadoPage />} />
          
          {/* 2. AGREGAMOS LA RUTA DE SENADORES */}
          <Route path="/senadores" element={<SenadoresPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}