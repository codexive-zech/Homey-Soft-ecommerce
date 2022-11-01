import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

const getCartItems = () => {
  const result = localStorage.getItem("e-cart");
  return result ? JSON.parse(result) : [];
};
const initialState = {
  cart: getCartItems(),
  totalItem: 0,
  totalAmount: 0,
  shippingFee: 534,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, singleProduct) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { id, color, amount, singleProduct },
    });
  }; // using the approach because it must not exceed the stock

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  const removeCartItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: { id } });
  };
  const toggleAmount = () => {};

  useEffect(() => {
    localStorage.setItem("e-cart", JSON.stringify(state.cart));
  }, [state.cart]);
  return (
    <CartContext.Provider
      value={{ ...state, addToCart, clearCart, removeCartItem, toggleAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
