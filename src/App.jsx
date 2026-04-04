import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import Voluntarios from './pages/Voluntarios'
import Navbar from './components/layout/Navbar'
import PlanGobiernoPage  from './pages/PlanDeGobierno'
import CoquitoChat from './components/shared/ChatWidget'

import DiputadosPage from './components/Diputados/DisputadosPage'
import DiputadoPage from './components/Diputados/Diputado/DiputadoPage'
import PromoBanner from './components/home/PromoBanner'

// 1. Creamos un Layout para las páginas normales (CON Navbar)
const MainLayout = () => {
  return (
    <>
      {/* <PromoBanner/> */}
      <Navbar />
      <Outlet /> {/* Aquí adentro se renderizará Home, Voluntarios, etc. */}
      <CoquitoChat />
    </>
  )
}

// 2. Creamos un Layout para las páginas de Diputados (SIN Navbar)
const DiputadosLayout = () => {
  return (
    <>
      {/* No ponemos el Navbar aquí */}
      <Outlet /> {/* Aquí se renderizará DiputadosPage y DiputadoPage */}
      <CoquitoChat /> {/* Puedes dejar el chat si quieres que siga apareciendo */}
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
          <Route path="/voluntarios" element={<Voluntarios />} />
        </Route>

        {/* --- GRUPO 2: Páginas de Diputados (SIN Navbar) --- */}
        <Route element={<DiputadosLayout />}>
          <Route path="/diputados" element={<DiputadosPage />} />
          <Route path="/diputados/:slug" element={<DiputadoPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}