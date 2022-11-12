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
}; // get cart item selected from the local storage
const initialState = {
  cart: getCartItems(),
  totalItems: 0,
  totalAmounts: 0,
  shippingFee: 534,
}; // initialing all the state

const CartContext = React.createContext(); // creating a context api

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState); // init the useReducer hook for use

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
  }; // functionality to remove item from the cart
  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  }; // functionality for toggling of amount in the cart item
  useEffect(() => {
    localStorage.setItem("e-cart", JSON.stringify(state.cart));
    dispatch({ type: COUNT_CART_TOTALS });
  }, [state.cart]); // re-render when the set cart item selected to the local storage
  return (
    <CartContext.Provider
      value={{ ...state, addToCart, clearCart, removeCartItem, toggleAmount }} // returning states and function props to be used in components
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
