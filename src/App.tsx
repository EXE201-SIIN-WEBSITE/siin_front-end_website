import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import TopSeller from './pages/product/TopSeller'
import ProductSeller from './components/ProductSeller'
import ProductGift from './components/ProductGift'

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header title='SIIN' />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<TopSeller />} >
          <Route  index element={<Navigate to="topSeller"/>}/>
          <Route path='topSeller' element={<ProductSeller/>}/>
          <Route path='gift' element={<ProductGift/>}/>

        </Route>
        
      </Routes>




      <Footer />
    </div>
  )
}

export default App
