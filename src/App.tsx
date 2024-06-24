import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ProductGift from './components/ProductGift'
import ListItem from './components/ListItem'
import CustomizeProduct from './pages/CustomizeProduct'
import IntroPoduct from './pages/product/IntroPoduct'
import TopSeller from './components/TopSeller'
import ProductDetail from './pages/product/ProductDetail'
import Cart from './pages/Cart'
import SignIn from './pages/auth/SignIn'

function App() {
  // const location = useLocation()
  // const isLoginPath = location.pathname === '/login'
  return (
    <>
      {/* {!isLoginPath && <Header />} */}
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<SignIn />} />

        <Route path='/products' element={<IntroPoduct />}>
          <Route index element={<Navigate to='topSeller' />} />
          <Route path='topSeller' element={<TopSeller />} />
          <Route path='gift' element={<ProductGift />} />
        </Route>
        <Route path='/productdetail/:id' element={<ProductDetail />} />
        <Route path='/sell' element={<ListItem title='sell' />} />
        <Route path='/buy' element={<ListItem title='buy' />} />

        <Route path='/customize' element={<CustomizeProduct />} />
        <Route path='/cart' element={<Cart />} />

        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
      <Footer />
      {/* {!isLoginPath && <Footer />} */}
    </>
  )
}

export default App
