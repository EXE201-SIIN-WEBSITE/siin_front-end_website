import { Link } from 'react-router-dom'
import { product } from '~/types/product.type'

export default function Item({ item }: { item: product }) {
  return (
    <div className='flex flex-col items-center gap-5 '>
      <Link to={`/productdetail/${item.id}`}>
        <div className='py-2 border-[1.5px] border-solid border-black'>
          <img className='w-56 h-56' src={item.coverImage} alt={item.name} />
        </div>
        <p className='h'>{item.name}</p>
        <p>{item.price}đ</p>
      </Link>
    </div>
  )
}
