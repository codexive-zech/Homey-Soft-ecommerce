import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, amount, color, singleProduct } = action.payload;
    const tempCartItem = state.cart.find((item) => item.id === id + color);
    if (tempCartItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.maxStock) {
            newAmount = cartItem.maxStock;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newCartItem = {
        id: id + color,
        name: singleProduct.name,
        color,
        amount,
        price: singleProduct.price,
        image: singleProduct.images[0].url,
        maxStock: singleProduct.stock,
      };
      return { ...state, cart: [...state.cart, newCartItem] };
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const { id } = action.payload;
    const deleteItem = state.cart.filter((item) => item.id !== id);
    return { ...state, cart: deleteItem };
  }
  if (action.type === CLEAR_CART) {
    const clearingCart = [];
    return { ...state, cart: clearingCart };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
