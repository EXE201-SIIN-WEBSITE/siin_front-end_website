import { useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { login, register } from '~/redux/actions/auth.action'
import { useAppDispatch } from '~/redux/containers/store'

type FormValues = {
  email: string
  password: string
  username?: string
  confirmPassword?: string
}

const SignInSignUp = () => {
  const [isSignIn, setIsSignIn] = useState(true)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // const { user, loading } = useSelector((state: RootState) => state.auth)
  const [error, setError] = useState('')

  const { register: registerSignIn, handleSubmit: handleSubmitSignIn } = useForm<FormValues>()

  const { register: registerSignUp, handleSubmit: handleSubmitSignUp, watch } = useForm<FormValues>()

  // const onSubmitSignIn: SubmitHandler<FormValues> = (data) => {
  //   setError('')
  //   const resultAction = dispatch(login({ email, password }));
  //   console.log('data', data)
  //   dispatch(login({ email: data.email, password: data.password }))
  //   if (login.fulfilled.match(resultAction)) {
  //     navigate('/');
  //   } else {
  //     setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.');
  //   }
  // }

  const onSubmitSignIn: SubmitHandler<FormValues> = async (data) => {
    setError('')
    try {
      const resultAction = await dispatch(login({ email: data.email, password: data.password }))

      if (login.fulfilled.match(resultAction)) {
        navigate('/')
      } else {
        setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.')
      }
    } catch (error) {
      setError('Đăng nhập thất bại. Vui lòng thử lại sau.')
      console.error('Login error:', error)
    }
  }

  const onSubmitSignUp: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await dispatch(register(data))
      if (register.fulfilled.match(res)) {
        navigate('/')
      } else {
        toast.error('Đăng ký thất bại. Vui lòng kiểm tra lại thông tin đăng ký.')
      }
    } catch (error) {
      toast.error('Đăng ký thất bại. Vui lòng thử lại sau.')
    }
  }

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    Object.entries(errors).forEach(([, error]) => {
      const errorMessage = error?.message
      errorMessage && toast.error(errorMessage)
    })
  }

  const handleSwitch = () => {
    setIsSignIn(!isSignIn)
  }
  const password = watch('password')

  // useEffect(() => {
  //   if (!userData && localStorage.getItem('token')) {
  //     console.log('Fetching user data after logout');
  //   }
  // }, [userData]);

  // if (user && !loading) {
  //   navigate('/');
  //   return null;
  // }

  return (
    <div className='flex justify-center my-[50px] '>
      <ToastContainer />
      <div className='relative w-[45%] h-[500px] flex items-center box-border border-black rounded-md overflow-hidden '>
        <div
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ${
            isSignIn ? 'transform translate-x-0' : 'transform -translate-x-full'
          }`}
        >
          <div className='grid flex-col justify-center h-full grid-cols-2 col-span-1 py-10 bg-black rounded-md'>
            <div className='hidden col-span-1 md:block'>
              <img
                className='md: ml-8 md:mt-[30px] md:w-[250px] md:h-[288px] rounded-r-xl flex'
                src='https://res.cloudinary.com/wolfandbadger/image/upload/f_auto,q_auto:best,c_pad,h_800,w_800/products/venus-bracelet-with-onxy-zircons__da29f2540ee78ece22ea092570b1320d'
              />
            </div>
            <div className='col-span-1 '>
              <img className='w-[80x] h-[100px]' src='/assets/LOGO123.png' alt='' />
              <h2 className='text-2xl text-white'>Đăng nhập</h2>
              <form onSubmit={handleSubmitSignIn(onSubmitSignIn, onError)}>
                <input
                  className='mt-[20px] px-1 py-2 w-[90%] rounded-md'
                  type='text'
                  {...registerSignIn('email', {
                    required: 'Email không được bỏ trống',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Email không đúng định dạng'
                    }
                  })}
                  placeholder='Nhập email'
                />
                <input
                  className='mt-[20px] px-1 py-2 w-[90%] rounded-md'
                  type='password'
                  {...registerSignIn('password', { required: 'Cần nhập password' })}
                  placeholder='Nhập mật khẩu'
                />

                <button
                  // onClick={handleLogin}
                  type='submit'
                  className='mt-[25px] text-white items-center border px-3 py-1 border-white rounded-lg hover:bg-white hover:text-black '
                >
                  Đăng nhập
                </button>
                {error && <p className='mt-[10px] text-red-500'>{error}</p>}
              </form>
            </div>
          </div>
        </div>
        <div
          className={`absolute top-0 right-0 w-full h-full transition-transform duration-500 ${
            isSignIn ? 'transform translate-x-full' : 'transform translate-x-0'
          }`}
        >
          <div className='flex flex-col items-center justify-center h-full gap-4 px-10 bg-black rounded-md shadow-md'>
            <img className='h-[100px]' src='/assets/LOGO123.png' alt='' />
            <form
              className='flex flex-col items-center w-full gap-4'
              onSubmit={handleSubmitSignUp(onSubmitSignUp, onError)}
            >
              <input
                className='w-full px-1 py-2 rounded-md md:w-1/2'
                type='text'
                {...registerSignUp('username', { required: 'Tên người dùng không được bỏ trống' })}
                placeholder='Nhập tên người đùng'
              />
              <input
                className='w-full px-1 py-2 rounded-md md:w-1/2'
                type='text'
                {...registerSignUp('email', {
                  required: 'Email không được bỏ trống',
                  pattern: { value: /^\S+@\S+$/i, message: 'Email không đúng định dạng' }
                })}
                placeholder='Nhập email'
              />
              <input
                className='w-full px-1 py-2 rounded-md md:w-1/2'
                type='password'
                {...registerSignUp('password', { required: 'Mật khẩu không được bỏ trống' })}
                placeholder='Nhập mật khẩu'
              />
              <input
                className='w-full px-1 py-2 rounded-md md:w-1/2'
                type='password'
                {...registerSignUp('confirmPassword', {
                  required: 'Xác nhận mật khẩu không được bỏ trống',
                  validate: (value) => value === password || 'Mật khẩu không khớp'
                })}
                placeholder='Xác nhận mật khẩu'
              />
              <button
                type='submit'
                className='items-center w-2/4 px-3 py-1 text-sm text-white border border-white rounded-md md:text-xl md:w-1/4'
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
        <button
          className={`absolute bottom-0 left-0 w-full py-2 text-center transition-all duration-500 bg-black text-white italic hover:scale-105 rounded-b-md mb-2 text-sm md:text-xl`}
          onClick={handleSwitch}
        >
          {isSignIn ? 'Bạn chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập ngay'}
        </button>
      </div>
    </div>
  )
}

export default SignInSignUp
