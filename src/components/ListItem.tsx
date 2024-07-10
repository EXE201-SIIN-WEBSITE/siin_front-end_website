import Item from './Item'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '~/redux/containers/store'
import { useEffect, useRef, useState } from 'react'
import { getProducts2 } from '~/redux/actions/product.action'
import { product } from '~/types/product.type'

interface props {
  title: string
}

export default function ListItem({ title }: props) {
  const productData = useSelector((state: RootState) => state.product.productList)
  const totalPage = useSelector((state: RootState) => state.product.totalPage)
  // const currentPage = useSelector((state: RootState) => state.product.currentPage);
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const abortControllerRef = useRef(new AbortController())

  useEffect(() => {
    // Abort previous requests if any
    abortControllerRef.current.abort()

    // Create a new abort controller for the new request
    abortControllerRef.current = new AbortController()
    const signal = abortControllerRef.current.signal

    // Fetch new data based on the current page
    dispatch(getProducts2({ currentPage, signal }))

    // Cleanup function to abort the request on unmount
    return () => {
      abortControllerRef.current.abort()
    }
  }, [dispatch, currentPage])

  // useEffect(() => {
  //   const abortController = new AbortController()
  //   const signal = abortController.signal

  //   dispatch(getProducts({ signal }))

  //   return () => {
  //     abortController.abort()
  //   }
  // }, [dispatch])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  console.log('preo: ', productData)

  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={currentPage === i}
          className={`px-4 py-2 mx-1 rounded ${currentPage === i ? 'bg-black text-white' : 'bg-gray-100'} disabled:bg-black`}
        >
          {i}
        </button>
      )
    }
    return pageNumbers
  }

  console.log('SIZE: ', currentPage)
  console.log('SIZE: ', productData)

  return (
    <div className='flex flex-col w-[100%] my-[3%] justify-center'>
      <div className='flex items-center gap-2 title my-[2%]'>
        <svg xmlns='http://www.w3.org/2000/svg' height='48px' viewBox='0 -960 960 960' width='48px' fill='#000000'>
          <path d='M295-157v-652l512 326-512 326Z' />
        </svg>
        <span className='text-2xl font-bold'>{title.toLocaleUpperCase()}</span>
      </div>

      <div className='flex flex-wrap justify-center w-full gap-20'>
        {Array.isArray(productData) && productData.map((item: product) => <Item key={item.id} item={item} />)}
      </div>
      <div className='flex justify-center mt-4'>{renderPageNumbers()}</div>
    </div>
  )
}
