import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import TopSeller from './pages/product/TopSeller'
import ProductSeller from './components/ProductSeller'
import ProductGift from './components/ProductGift'
import ListItem from './components/ListItem'
import CustomizeProduct from './pages/CustomizeProduct'

function App() {
  return (
    <>
      <Header />
      <body className='w-full'>
        {' '}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<TopSeller />}>
            <Route index element={<Navigate to='topSeller' />} />
            <Route path='topSeller' element={<ProductSeller />} />
            <Route path='gift' element={<ProductGift />} />
          </Route>

          <Route path='/sell' element={<ListItem title='sell' />} />
          <Route path='/buy' element={<ListItem title='buy' />} />

          <Route path='/customize' element={<CustomizeProduct />} />

          <Route path='*' element={<div>404 Not Found</div>} />
        </Routes>
      </body>

      <Footer />
    </>
  )
}

export default App
