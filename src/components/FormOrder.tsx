import React, { useEffect, useRef } from 'react'
import '../components/animation/formOrder.css'

interface FormOrderProps {
  toggleFormOrder: () => void
}

const FormOrder: React.FC<FormOrderProps> = ({ toggleFormOrder }) => {
  const elModal = useRef<HTMLDivElement>(null)

  const handleClickOutside = (e: MouseEvent) => {
    if (elModal.current && !elModal.current.contains(e.target as Node)) {
      toggleFormOrder()
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='animate-slide-in bg-[#e4e4e4]' ref={elModal}>
      <form className='w-[500px] h-[560px] bg-[#e4e4e4]'>
        <div className='mb-4'>
          <label htmlFor='name' className='block mb-2 font-bold text-gray-700'>
            Họ và tên:
          </label>
          <input type='text' id='name' name='name' className='w-full px-3 py-2 border border-gray-300 rounded-md' />
        </div>

        <div className='mb-4'>
          <label htmlFor='email' className='block mb-2 font-bold text-gray-700'>
            Email:
          </label>
          <input type='email' id='email' name='email' className='w-full px-3 py-2 border border-gray-300 rounded-md' />
        </div>

        <div className='mb-4'>
          <label htmlFor='phone' className='block mb-2 font-bold text-gray-700'>
            Số điện thoại:
          </label>
          <input type='tel' id='phone' name='phone' className='w-full px-3 py-2 border border-gray-300 rounded-md' />
        </div>

        <div className='mb-4'>
          <label htmlFor='location' className='block mb-2 font-bold text-gray-700'>
            Địa chỉ:
          </label>
          <select id='location' name='location' className='w-full px-3 py-2 border border-gray-300 rounded-md'>
            <option value='location1'>Địa chỉ 1</option>
            <option value='location2'>Địa chỉ 2</option>
            <option value='location3'>Địa chỉ 3</option>
          </select>
        </div>

        <button type='submit' className='px-4 py-2 text-white bg-black rounded-md hover:bg-blue-600'>
          Xác nhận
        </button>
      </form>
    </div>
  )
}

export default FormOrder
