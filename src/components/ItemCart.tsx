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
    <div className='grid grid-cols-3 gap-5 mb-3 justify-evenly'>
      <div className='flex justify-center col-span-1 basis-1/3'>
        <img
          className='object-contain w-48 h-48 rounded-lg shadow-xl dark:shadow-gray-800'
          src={item.image}
          alt={item.name}
        />
      </div>
      <div className='col-span-1 gap-2'>
        <h1 className='text-xl font-bold'>{item.name}</h1>
        <h3 className='mt-3'>Số lượng: {item.quantity}</h3>
        <div className='flex gap-2 mt-3'>
          <button onClick={onDecrease} className='px-[14px] py-2 bg-black text-white rounded'>
            -
          </button>
          <button onClick={onIncrease} className='px-3 py-2 text-white bg-black rounded'>
            +
          </button>
        </div>
      </div>
      <div className='col-span-1 gap-2 mt-2 price'>
        <h1 className='text-xl text-nowrap'>Đơn giá</h1>
        <p className='mt-3'>{formatPriceToVND(item.price)}</p>
        <button onClick={onRemove} className='px-3 py-2 mt-4 text-white bg-red-500 rounded'>
          Xóa
        </button>
      </div>
    </div>
  )
}

export default ItemCart
