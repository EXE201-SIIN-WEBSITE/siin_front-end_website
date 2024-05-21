import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import TopSeller from './pages/product/TopSeller'

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header title='SIIN' />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<TopSeller />} />
        </Routes>

      <Footer />
    </div>
  )
}

export default App
