import { CartItem } from "~/types/product.type";

const initialState: { cartItemList: CartItem[] } = {
  cartItemList: JSON.parse(localStorage.getItem('cartItems') || '[]')
};

const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'UPDATE_CART_ITEM_QUANTITY':
      const updatedCartItems = state.cartItemList.map((item, index) =>
        index === action.payload.index ? { ...item, quantity: item.quantity + action.payload.quantity } : item
      ).filter(item => item.quantity > 0);

      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      return { ...state, cartItemList: updatedCartItems };

    case 'REMOVE_CART_ITEM':
      const filteredCartItems = state.cartItemList.filter((_, index) => index !== action.payload);

      localStorage.setItem('cartItems', JSON.stringify(filteredCartItems));
      return { ...state, cartItemList: filteredCartItems };

    default:
      return state;
  }
};

export default cartReducer;
