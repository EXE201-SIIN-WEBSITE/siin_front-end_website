import React from 'react'
import { product } from '~/dummyData/types/product.type'

interface ItemCartProps {
  item: product
}

const ItemCart: React.FC<ItemCartProps> = ({ item }) => {
  return (
    <div className='flex gap-5 justify-evenly'>
      <div className='flex justify-around basis-1/3'>
        <img
          className='object-contain w-48 h-48 rounded-lg shadow-xl dark:shadow-gray-800'
          src={item.img}
          alt={item.name}
        />
      </div>
      <div className='flex items-start justify-around detail-cart basis-2/3'>
        <div className='flex flex-col gap-2'>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <p>Số lượng: {item.quantity}</p>
        </div>
        <div className='flex flex-col items-start gap-2 price'>
          <h1 className='text-nowrap'>Giá Tiền</h1>
          <p>{item.price}</p>
        </div>
      </div>
    </div>
  )
}

export default ItemCart
