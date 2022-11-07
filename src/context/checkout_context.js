import React, { useContext, useReducer } from "react";
import reducer from "../reducers/checkout_reducer";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const CheckoutContext = React.createContext();

export const CheckoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleCheckoutInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    dispatch({ type: "CHECKOUT_INPUT", payload: { name, value } });
  };

  return (
    <CheckoutContext.Provider value={{ ...state, handleCheckoutInput }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckoutContext = () => {
  return useContext(CheckoutContext);
};
