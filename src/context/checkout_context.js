import React, { useContext, useReducer } from "react";
import reducer from "../reducers/checkout_reducer";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
}; // initialing all the state

const CheckoutContext = React.createContext(); // creating a context api

export const CheckoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState); // init the useReducer hook for use
  const handleCheckoutInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    dispatch({ type: "CHECKOUT_INPUT", payload: { name, value } });
  }; // handling the checkout input

  return (
    <CheckoutContext.Provider
      value={{ ...state, handleCheckoutInput }}
      // returning states and function props to be used in components
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckoutContext = () => {
  return useContext(CheckoutContext);
};
