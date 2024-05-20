import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ListProduct from './pages/product/ListProduct'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header title='SIIN' />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ListProduct />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
