import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import MainLayout from './components/layout/MainLayout'

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
const QRCodePage = lazy(() => import('./pages/QRCodePage'))

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

function App() {
  // Hack: Force reload on first visit to fix potential initialization issues
  // This is a "simple solution" requested to ensure 3D context loads correctly
  if (!sessionStorage.getItem('has_forced_reload')) {
    sessionStorage.setItem('has_forced_reload', 'true');
    window.location.reload();
    return null; // Render nothing while reloading
  }

  return (
    <Router>
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
            <Route path="/admin/qrcode" element={<QRCodePage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App

