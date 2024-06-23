import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { login } from '~/redux/actions/auth.action'
import { RootState, useAppDispatch } from '~/redux/containers/store'
import 'react-toastify/dist/ReactToastify.css'

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
  const { user } = useSelector((state: RootState) => state.auth)

  const {
    register: registerSignIn,
    handleSubmit: handleSubmitSignIn,
    formState: { errors: errorsSignIn }
  } = useForm<FormValues>()

  const { register: registerSignUp, handleSubmit: handleSubmitSignUp, watch } = useForm<FormValues>()

  const onSubmitSignIn: SubmitHandler<FormValues> = (data) => {
    console.log('data', data)
    dispatch(login({ email: data.email, password: data.password }))
  }

  const onSubmitSignUp: SubmitHandler<FormValues> = (data) => {
    console.log('data', data)

    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }
    toast.success('Sign up successful!')
  }

  const handleSwitch = () => {
    setIsSignIn(!isSignIn)
  }
  const password = watch('password')

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

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
              <form onSubmit={handleSubmitSignIn(onSubmitSignIn)}>
                <input
                  className='mt-[20px] px-1 py-2 w-[90%] rounded-md'
                  type='email'
                  {...registerSignIn('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Địa chỉ email không đúng định dạng' }
                  })}
                  placeholder='Nhập email'
                />
                {errorsSignIn.email && toast.error(errorsSignIn.email.message)}
                <input
                  className='mt-[20px] px-1 py-2 w-[90%] rounded-md'
                  type='password'
                  {...registerSignIn('password', { required: 'Cần nhập password' })}
                  placeholder='Nhập mật khẩu'
                />
                {errorsSignIn.password && toast.error(errorsSignIn.password.message)}

                <button
                  type='submit'
                  className='mt-[25px] text-white items-center border px-3 py-1 border-white rounded-lg hover:bg-white hover:text-black '
                >
                  Đăng nhập
                </button>
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
            <form className='flex flex-col items-center w-full gap-4' onSubmit={handleSubmitSignUp(onSubmitSignUp)}>
              <input
                className='w-full px-1 py-2 rounded-md md:w-1/2'
                type='text'
                {...registerSignUp('username', { required: 'Cần nhập tên người dùng' })}
                placeholder='Nhập tên người đùng'
              />
              <input
                className='w-full px-1 py-2 rounded-md md:w-1/2'
                type='email'
                {...registerSignUp('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Địa chỉ email không đúng định dạng' }
                })}
                placeholder='Nhập email'
              />
              <input
                className='w-full px-1 py-2 rounded-md md:w-1/2'
                type='password'
                {...registerSignUp('password', { required: 'Cần nhập tên người dùng' })}
                placeholder='Nhập mật khẩu'
              />
              <input
                className='w-full px-1 py-2 rounded-md md:w-1/2'
                type='password'
                {...registerSignUp('confirmPassword', {
                  required: 'Confirm Password is required',
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
