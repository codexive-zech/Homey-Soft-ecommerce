import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";
import toast from "react-hot-toast";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, amount, color, singleProduct } = action.payload; // destructing property from the returned payload
    const tempCartItem = state.cart.find((item) => item.id === id + color); // finding a temp cart item
    // checking if a cart item is found
    if (tempCartItem) {
      // iterate over all the cart state
      const tempCart = state.cart.map((cartItem) => {
        // checking if the cart item id is same as the created cart id (id+color)
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount; // increase the amount as long as that product is in the cart
          // checking if the newly updated amount is bigger than the max stock of the product in the cart
          if (newAmount > cartItem.maxStock) {
            newAmount = cartItem.maxStock; // the amount should be the max stock
          }
          return { ...cartItem, amount: newAmount }; // return all the copy of item in the cart state and the amount state
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart }; // return all the copy state and cart state
    } else {
      const newCartItem = {
        id: id + color,
        name: singleProduct.name,
        color,
        amount,
        price: singleProduct.price,
        image: singleProduct.images[0].url,
        maxStock: singleProduct.stock,
      }; // create a new cart item
      toast.success("Item Added to Cart");
      return { ...state, cart: [...state.cart, newCartItem] }; // return all the copy state and update the cart (copy all the prev cart item and add a new one if it does not exist )
    }
  } // functionality for adding product to the cart
  if (action.type === REMOVE_CART_ITEM) {
    const { id } = action.payload; // destructing property from the returned payload
    const deleteItem = state.cart.filter((item) => item.id !== id); // removing a cart item based on it id from the cart state
    toast.success("Item Removed From Cart");
    return { ...state, cart: deleteItem }; // return all the copy state and the cart state when cart item is removed
  } // functionality for removing product from the cart
  if (action.type === CLEAR_CART) {
    const clearingCart = []; // define an empty array
    toast.success("Cart Cleared Successfully");
    return { ...state, cart: clearingCart }; // return all the copy state and the cart state when cart item is cleared
  } // functionality for clearing product from the cart
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload; // destructing property from the returned payload
    const tempCartItem = state.cart.map((cartItem) => {
      // checking if the item in the cart id is same as the id created fro the cart item
      if (cartItem.id === id) {
        // checking if the button value is for increase
        if (value === "inc") {
          let newAmount = cartItem.amount + 1; // increase the amount to one (1) as that product is in the cart
          // checking if the newly updated amount is bigger than the max stock of the product in the cart
          if (newAmount > cartItem.maxStock) {
            newAmount = cartItem.maxStock; // the amount should be the max stock
          }
          toast.success("Item Quantity Increased");
          return { ...cartItem, amount: newAmount }; // return all the copy of item in the cart state and update the amount state
        }
        // checking if the button value is for decrease
        if (value === "dec") {
          let newAmount = cartItem.amount - 1; // decrease the amount by one (1) as that product is in the cart
          // checking if the newly updated amount is less than one (1) in the cart
          if (newAmount < 1) {
            newAmount = 1; // the amount should be one (1)
          }
          toast.success("Item Quantity Decreased");
          return { ...cartItem, amount: newAmount }; // return all the copy of item in the cart state and update the amount state
        }
      }
      return cartItem; // return back cart items if otherwise
    });
    return { ...state, cart: tempCartItem }; // return all the copy of the state and update the cart state
  } // functionality for toggle amount button (inc and dec) of each cart item
  if (action.type === COUNT_CART_TOTALS) {
    const { totalAmounts, totalItems } = state.cart.reduce(
      (total, currentItem) => {
        const { amount, price } = currentItem; // destructure the property for the current item
        total.totalItems += amount; // increase the total items in the cart based on the amount
        total.totalAmounts += amount * price; // increase the overall total amount based on the amount of items and the price
        return total; // always return
      },
      {
        totalItems: 0,
        totalAmounts: 0,
      } // return back an object
    );
    return { ...state, totalAmounts, totalItems }; // return all the copy of the state and update total amounts and items
  } // functionality for the summation of the cart bag count and the total amount of product price in the cart
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
