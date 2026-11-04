import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CommunityProvider } from './context/CommunityContext'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ScrollTop } from './components/ScrollTop'
import { About } from './pages/About'
import { Challenges } from './pages/Challenges'
import { Community } from './pages/Community'
import { Contact } from './pages/Contact'
import { Faq } from './pages/Faq'
import { Home } from './pages/Home'
import { Members } from './pages/Members'
import { NotFound } from './pages/NotFound'
import { Solution } from './pages/Solution'
import { SolutionDetails } from './pages/SolutionDetails'

function App() {
  return <CommunityProvider>
    <BrowserRouter>
      <ScrollTop />
      <Header />
      <main className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/integrantes" element={<Members />} />
          <Route path="/solucao" element={<Solution />} />
          <Route path="/solucao/:id" element={<SolutionDetails />} />
          <Route path="/desafios" element={<Challenges />} />
          <Route path="/comunidade" element={<Community />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  </CommunityProvider>
}

export default App
