import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout'
import FirstPage from './pages/index/index'
import Tab from './pages/tab/index'
import TabPage from './pages/tab/index'
import ArtistPage from './pages/artist'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="h-screen w-full flex items-center justify-center bg-red-500" style={{ backgroundColor: 'var(--safron-mango-light)' }}>
        <Layout>
          <Routes>
            <Route path="/" element={<FirstPage />} />
            <Route path="/tab" element={<Tab />} />
            <Route path="/tab/:id" element={<TabPage />} />
            <Route path="/artist/:id" element={<ArtistPage propArtist={undefined} />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  )
}

export default App
