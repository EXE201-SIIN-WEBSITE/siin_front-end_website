import React from 'react'
import { CartItem } from '~/types/product.type'

interface ItemCartProps {
  item: CartItem
  
  onIncrease: () => void
  onDecrease: () => void
  onRemove: () => void
}

const ItemCart: React.FC<ItemCartProps> = ({ item, onIncrease, onDecrease, onRemove }) => {
  const formatPriceToVND = (price: number): string => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ₫`
  }

  return (
    <div className='grid grid-cols-3 gap-5 justify-evenly mb-3'>
      <div className='col-span-1 flex justify-center basis-1/3'>
        <img
          className='object-contain w-48 h-48 rounded-lg shadow-xl dark:shadow-gray-800'
          src={item.image}
          alt={item.name}
        />
      </div>
      <div className='col-span-1 gap-2'>
        <h1 className='font-bold text-xl'>{item.name}</h1>
        <h3 className='mt-3'>Số lượng: {item.quantity}</h3>
        <div className='flex gap-2 mt-3'>
          <button onClick={onDecrease} className='px-[14px] py-2 bg-black text-white rounded'>
            -
          </button>
          <button onClick={onIncrease} className='px-3 py-2 bg-black text-white rounded'>
            +
          </button>
        </div>
      </div>
      <div className='col-span-1 gap-2 price mt-2'>
        <h1 className='text-nowrap text-xl'>Giá Tiền</h1>
        <p className='mt-3'>{formatPriceToVND(item.price * item.quantity)}</p>
        <button onClick={onRemove} className='px-3 py-2 bg-red-500 text-white rounded mt-4'>
          Xóa
        </button>
      </div>
    </div>
  )
}

export default ItemCart
