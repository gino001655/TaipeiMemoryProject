import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import MainLayout from './components/layout/MainLayout'
<<<<<<< HEAD

// 懶加載所有頁面組件
const Home = lazy(() => import('./pages/Home'))
const SpatialMap = lazy(() => import('./pages/SpatialMap'))
const Chronology = lazy(() => import('./pages/Chronology'))
const HistoryCorridor = lazy(() => import('./pages/HistoryCorridor'))
const QingDynasty = lazy(() => import('./pages/QingDynasty'))
const JapaneseColonial = lazy(() => import('./pages/JapaneseColonial'))
const Prehistoric = lazy(() => import('./pages/Prehistoric'))
const PostWar = lazy(() => import('./pages/PostWar'))
const Exhibits = lazy(() => import('./pages/Exhibits'))
const ExhibitDetail = lazy(() => import('./pages/ExhibitDetail'))
const SiteDetail = lazy(() => import('./components/SiteDetail'))
const References = lazy(() => import('./pages/References'))

// 載入指示器組件
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-stone-100">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-600 border-t-transparent mb-4"></div>
        <p className="text-stone-600 font-medium">載入中...</p>
      </div>
    </div>
  )
}
=======
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
import QRCodePage from './pages/QRCodePage'
>>>>>>> 777a2a321aa55a93d6bffe9450503069ecb92713

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <Suspense fallback={<LoadingFallback />}>
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
      </Suspense>
=======
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
          <Route path="/admin/qrcode" element={<QRCodePage />} />
        </Route>
      </Routes>
>>>>>>> 777a2a321aa55a93d6bffe9450503069ecb92713
    </Router>
  )
}

export default App

