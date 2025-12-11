import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Home from './pages/Home'
import SpatialMap from './pages/SpatialMap'
import Chronology from './pages/Chronology'
import HistoryCorridor from './pages/HistoryCorridor'
import QingDynasty from './pages/QingDynasty'
import JapaneseColonial from './pages/JapaneseColonial'
import Prehistoric from './pages/Prehistoric'
import PostWar from './pages/PostWar'
import Exhibits from './pages/Exhibits'
import ExhibitDetail from './pages/ExhibitDetail'
import SiteDetail from './components/SiteDetail'
import References from './pages/References'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/spatial-map" element={<SpatialMap />} />
          <Route path="/chronology" element={<Chronology />} />
          <Route path="/history-corridor" element={<HistoryCorridor />} />
          <Route path="/history/prehistoric" element={<Prehistoric />} />
          <Route path="/history/qing-dynasty" element={<QingDynasty />} />
          <Route path="/history/japanese-colonial" element={<JapaneseColonial />} />
          <Route path="/history/post-war" element={<PostWar />} />
          <Route path="/exhibits" element={<Exhibits />} />
          <Route path="/exhibit/:id" element={<ExhibitDetail />} />
          <Route path="/site/:id" element={<SiteDetail />} />
          <Route path="/references" element={<References />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
