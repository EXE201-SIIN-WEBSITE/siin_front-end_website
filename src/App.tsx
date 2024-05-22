import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import TopSeller from './pages/product/TopSeller'
import ProductSeller from './components/ProductSeller'
import ProductGift from './components/ProductGift'
import ListItem from './components/ListItem'

function App() {
  return (
    <div className='flex flex-col items-center min-h-screen'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<TopSeller />}>
          <Route index element={<Navigate to='topSeller' />} />
          <Route path='topSeller' element={<ProductSeller />} />
          <Route path='gift' element={<ProductGift />} />
        </Route>

        <Route path='/sell' element={<ListItem title='sell' />} />
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
