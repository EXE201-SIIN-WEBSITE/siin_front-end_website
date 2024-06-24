import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from '../Logo'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '~/redux/containers/store'
import { getUserIdByToken, getUserInfo } from '~/redux/actions/user.actions'
import { logout } from '~/redux/actions/auth.action'

const Header = () => {
  const [isProductsHovered, setIsProductsHovered] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)
  const userData = useSelector((state: RootState) => state.user.user)
  const dispatch = useAppDispatch()
  const [, setLoading] = useState(true)
  const navigate = useNavigate()
  const fixedAvatar =
    'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2116175301.1719100800&semt=ais_user'
  useEffect(() => {
    const fetchUserData = async () => {
      const tokenInLocalStorage = localStorage.getItem('token') || ''

      if (tokenInLocalStorage) {
        try {
          const action = await dispatch(getUserIdByToken(tokenInLocalStorage))
          const userId = action.payload as number

          if (userId) {
            await dispatch(getUserInfo(userId))
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [dispatch])

  useEffect(() => {
    if (userData && userData.id) {
      setLoading(false)
    }
  }, [userData])

  console.log('User DATA: ', userData)

  const getItemNumberCart = () => {
    const cartItemsString = localStorage.getItem('cartItems')
    if (cartItemsString) {
      const cartItems = JSON.parse(cartItemsString)
      setCartItemCount(cartItems.length)
    } else {
      setCartItemCount(0)
    }
  }

  useEffect(() => {
    getItemNumberCart() //first time

    const handleCartUpdated = () => {
      getItemNumberCart()
    }
    window.addEventListener('cartUpdated', handleCartUpdated)

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdated)
    }
  }, [])

  const handleLogout = () => {
    dispatch(logout())
      .then(() => {
        // Clear user-related state or conditions if needed
        setIsDropdownOpen(false)
        // Navigate to login page immediately
        navigate('/login', { replace: true })
      })
      .catch((error) => {
        console.error('Logout error:', error)
      })
  }

  const renderUserLink = () => {
    if (userData && userData.fullName) {
      return (
        <div className='relative'>
          <img
            src={userData.avatar || fixedAvatar}
            alt='User Avatar'
            className='w-10 h-10 rounded-full cursor-pointer'
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && (
            <div className='absolute right-0 z-10 w-48 mt-2 bg-white rounded-md shadow-lg'>
              <div className='py-2'>
                <span className='block px-4 py-2 text-sm text-gray-700'>{userData.fullName}</span>
                <NavLink
                  to='/profile'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Hồ sơ
                </NavLink>
                <button
                  onClick={handleLogout}
                  className='block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100'
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      )
    } else {
      return (
        <NavLink className='text-white hover:text-gray-400 sm:text-[20px] text-[24px]' to={'/login'}>
          <i className='fa-solid fa-circle-user'></i>
        </NavLink>
      )
    }
  }

  return (
    <header className='w-full text-white bg-black'>
      <div className='container flex items-center justify-around mx-auto'>
        <div className='flex justify-center basis-2/12'>
          <Logo />
        </div>

        <nav className='relative flex items-center justify-end basis-8/12'>
          <div className='flex items-center w-full justify-evenly'>
            <NavLink
              to={'/'}
              className='text-white hover:text-gray-400 size-7 sm:text-[20px] lg:text-[24px] text-nowrap'
            >
              Trang chủ
            </NavLink>
            <NavLink
              onMouseEnter={() => setIsProductsHovered(true)}
              onMouseLeave={() => setIsProductsHovered(false)}
              to={'products'}
              className='text-white hover:text-gray-400 size-7 hover:scale-105 translate-x-1 sm:text-[20px] lg:text-[24px] text-nowrap relative'
            >
              Sản Phẩm
              {isProductsHovered && (
                <div className='absolute left-0 z-10 py-2 text-white md:h-[112px] bg-black rounded-md md:w-[105px] top-full'>
                  <Link to='/sell' className='block px-4 py-2 hover:bg-white hover:text-black'>
                    SELL
                  </Link>
                  <Link to='/buy' className='block px-4 py-2 hover:bg-white hover:text-black'>
                    DIY
                  </Link>
                </div>
              )}
            </NavLink>
            <NavLink
              to={'customize'}
              className='text-white hover:text-gray-400 size-7 sm:text-[20px] lg:text-[24px] text-nowrap'
            >
              Customize
            </NavLink>
          </div>
        </nav>

        <div className='flex gap-4 sm:justify-around lg:justify-evenly basis-2/12'>
          <NavLink className='relative text-white hover:text-gray-400 sm:text-[20px] text-[24px]' to={'cart'}>
            <i className='fa-solid fa-cart-shopping hover:text-gray-400 sm:text-[20px] text-[24px]'></i>
            {cartItemCount > 0 && (
              <span className='absolute flex items-center justify-center w-5 h-4 text-xs text-center bg-red-500 rounded-full top-5 left-5'>
                {cartItemCount}
              </span>
            )}
          </NavLink>

          {renderUserLink()}
          {/* <NavLink className='text-white hover:text-gray-400 sm:text-[20px] text-[24px]' to={'login'}>
            <i className='fa-solid fa-circle-user'></i> 
          </NavLink> */}
        </div>
      </div>
    </header>
  )
}

export default Header
