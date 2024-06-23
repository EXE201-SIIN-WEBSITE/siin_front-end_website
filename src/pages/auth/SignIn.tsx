import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '~/redux/actions/auth.action'
import { RootState, useAppDispatch } from '~/redux/containers/store'

const SignInSignUp = () => {
  const [isSignIn, setIsSignIn] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const userData = useSelector((state: RootState) => state.user.user)
  const handleSwitch = () => {
    setIsSignIn(!isSignIn)
  }

  useEffect(() => {
    if (!userData && localStorage.getItem('token')) {
      console.log('Fetching user data after logout');
    }
  }, [userData]);

  const handleLogin = async () => {
    setError('')
    const resultAction = await dispatch(login({ email, password }));
  
    if (login.fulfilled.match(resultAction)) {
      navigate('/');
    } else {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.');
    }
  };
  
  if (user && !loading) {
    navigate('/');
    return null; 
  }

  return (
    <div className='flex justify-center my-[50px]'>
      <div className='relative w-[45%] h-[500px] flex items-center box-border border-black rounded-md overflow-hidden'>
        <div
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ${
            isSignIn ? 'transform translate-x-0' : 'transform -translate-x-full'
          }`}
        >
          <div className='grid grid-cols-2 col-span-1 bg-black  flex-col md:mt-[60px] p-[20px] h-full justify-center rounded-md'>
            <div className='col-span-1'>
              <img
                className='md: ml-8 md:mt-[30px] md:w-[250px] md:h-[288px] rounded-r-xl flex'
                src='https://res.cloudinary.com/wolfandbadger/image/upload/f_auto,q_auto:best,c_pad,h_800,w_800/products/venus-bracelet-with-onxy-zircons__da29f2540ee78ece22ea092570b1320d'
              />
            </div>
            <div className='col-span-1'>
              <img className='w-[80x] h-[100px]' src='/assets/LOGO123.png' alt='' />
              <h2 className='text-2xl text-white'>Đăng nhập</h2>
              <input
                className='mt-[20px] px-1 py-2 w-[90%] rounded-md'
                type='text'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Nhập tên đăng nhập'
              />
              <input
                className='mt-[20px] px-1 py-2 w-[90%] rounded-md'
                type='password'
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Nhập mật khẩu'
              />
              <br />
           
              <button
                onClick={handleLogin}
                className='mt-[25px] text-white items-center border px-3 py-1 border-white rounded-lg hover:bg-white hover:text-black '
              >
                Đăng nhập
              </button>  
              {error && <p className='mt-[10px] text-red-500'>{error}</p>}
          
              {/* {user && (
                <div>
                  <p>Login successful!</p>
                  <Link to='/'>Go to HomePage</Link>
                </div>
              )} */}
            </div>
          </div>
        </div>
        <div
          className={`absolute top-0 right-0 w-full h-full transition-transform duration-500 ${
            isSignIn ? 'transform translate-x-full' : 'transform translate-x-0'
          }`}
        >
          <div className='col-span-1 flex flex-col items-center p-[20px] h-full justify-center rounded-md'>
            <input
              className='mt-[10px] px-1 py-2 rounded-md w-[280px]'
              type='text'
              name='username'
              placeholder='Nhập tên đăng nhập'
            />
            <input
              className='mt-[10px] px-1 py-2 rounded-md w-[280px]'
              type='email'
              name='email'
              placeholder='Nhập email'
            />
            <input
              className='mt-[10px] px-1 py-2 rounded-md w-[280px]'
              type='password'
              name='password'
              placeholder='Nhập mật khẩu'
            />
            <input
              className='mt-[10px] px-1 py-2 rounded-md w-[280px]'
              type='password'
              name='confirm'
              placeholder='Nhập lại mật khẩu'
            />
            <button className='mt-[10px] text-white items-center border px-3 py-1 border-white rounded-md'>
              Đăng ký
            </button>
          </div>
        </div>
        <button
          className={`absolute bottom-0 left-0 w-full py-2 text-center transition-all duration-500 ${
            isSignIn
              ? 'bg-black text-white italic hover:scale-105 rounded-b-md mb-2'
              : 'bg-white text-black italic hover:scale-105 rounded-t-md mb-2'
          }`}
          onClick={handleSwitch}
        >
          {isSignIn ? 'Bạn chưa có tài khoản? Đăng ký ngay' : 'Đăng nhập ngay'}
        </button>
      </div>
    </div>
  )
}

export default SignInSignUp
