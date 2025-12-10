import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout'
import FirstPage from './pages/index/index'
import Tab from './pages/song/index'
import TabPage from './pages/song/index'
import ArtistPage from './pages/artist'
import ScrollToTop from './components/ScrollToTop'
import { AuthProvider } from './context/AuthContext'
import Favorites from './pages/user/favorites'
import { FavoritesProvider } from './context/FavoritesContext'
import SubmitPage from './pages/submit'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <FavoritesProvider>
          <div className="h-screen w-full flex items-center justify-center bg-red-500" style={{ backgroundColor: 'var(--safron-mango-light)' }}>
            <Layout>
              <Routes>
                <Route path="/" element={<FirstPage />} />
                <Route path="/song" element={<Tab />} />
                <Route path="/song/:id" element={<TabPage />} />
                <Route path="/artist/:id" element={<ArtistPage propArtist={undefined} />} />
                <Route path="/user/favorites" element={
                  <Favorites />
                } />
                <Route path="/submit" element={<SubmitPage />} />
              </Routes>
            </Layout>
          </div>
        </FavoritesProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
