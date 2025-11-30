import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Home from './pages/Home'
import SpatialMap from './pages/SpatialMap'
import Chronology from './pages/Chronology'
import Exhibits from './pages/Exhibits'
import ExhibitDetail from './pages/ExhibitDetail'
import SiteDetail from './components/SiteDetail'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/spatial-map" element={<SpatialMap />} />
          <Route path="/chronology" element={<Chronology />} />
          <Route path="/exhibits" element={<Exhibits />} />
          <Route path="/exhibit/:id" element={<ExhibitDetail />} />
          <Route path="/site/:id" element={<SiteDetail />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
