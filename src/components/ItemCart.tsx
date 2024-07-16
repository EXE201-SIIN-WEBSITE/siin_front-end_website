import React, { useEffect, useState } from 'react';
import { getProductMaterialDetail } from '~/redux/actions/material.action';

import { getProductDetail } from '~/redux/actions/product.action';
import { useAppDispatch } from '~/redux/containers/store';
import { CartItem, product } from '~/types/product.type';

interface ItemCartProps {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const ItemCart: React.FC<ItemCartProps> = ({ item, onIncrease, onDecrease, onRemove }) => {
  const dispatch = useAppDispatch();
  const [productDetail, setProductDetail] = useState<product | null>(null);
  const [productMateDetail, setProductMateDetail] = useState<product | null>(null);
  const productId = item.productId;
  const productMaId = item.productMaterialId;

  console.log("pro mate id: ", productMaId);
  

  const formatPriceToVND = (price: number | undefined): string => {
    if (price === undefined) {
      return '0 ₫';
    }
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ₫`;
  };
  

  useEffect(() => {
    if (productId !== undefined) {
      dispatch(getProductDetail(productId)).then((action: any) => {
        if (action.payload) {          
          setProductDetail(action.payload);
          
        }
      });
    }

    if (productMaId !== undefined) {
      dispatch(getProductMaterialDetail(productMaId)).then((action: any) => {
        if (action.payload) {          
          setProductMateDetail(action.payload);
          
        }
      });

      
    }
  }, [dispatch, productId, productMaId]);
  
// console.log("produc mate detail: ", productMateDetail);


  
const itemPrice = productMateDetail?.price !== undefined ? productMateDetail?.price : productDetail?.price;

  return (
    <div className="grid grid-cols-3 gap-5 mb-3 justify-evenly">
      <div className="flex justify-center col-span-1 basis-1/3">
        <img
          className="object-contain w-48 h-48 rounded-lg shadow-xl dark:shadow-gray-800"
          src={productDetail?.coverImage || item.image}
          alt={productDetail?.name || item.name}
        />
      </div>
      <div className="col-span-1 gap-2">
        <h1 className="mt-[30px] md:mt-0 md:text-xl font-bold">{productDetail?.name || item.name}</h1>
        <h3 className="mt-3">Số lượng: {item.quantity}</h3>
        <div className="flex gap-2 mt-3">
          <button onClick={onDecrease} className="px-[14px] py-2 bg-black text-white rounded">
            -
          </button>
          <button onClick={onIncrease} className="px-3 py-2 text-white bg-black rounded">
            +
          </button>
        </div>
      </div>
      <div className="col-span-1 gap-2 mt-2 price">
        <h1 className="mt-[20px] md:mt-0 text-xl text-nowrap">Đơn giá</h1>
        <p>{formatPriceToVND(itemPrice) || productMateDetail?.price}</p>
        <button onClick={onRemove} className="px-3 py-2 mt-4 text-white bg-red-500 rounded">
          Xóa
        </button>
      </div>
    </div>
  );
};

export default ItemCart;
