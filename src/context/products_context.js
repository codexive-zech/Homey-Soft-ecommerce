import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const initialState = {
  isSidebarOpen: false,
  productLoading: false,
  products: [],
  featuredProducts: [],
  productError: false,
  singleProductLoading: false,
  singleProductError: false,
  singleProduct: {},
}; // initialing all the state

const ProductsContext = React.createContext(); //creating context api

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState); // init the useReducer hook for use

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  }; // opens sidebar
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  }; // close sidebar

  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(url);
      const products = response.data;

      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  }; // getting all products data from the API url

  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios.get(url);
      const singleProduct = response.data;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  }; // getting single product data from the API url

  useEffect(() => {
    fetchProducts(url);
  }, []); // re-render the fetching of all products data on initial window load

  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }} // returning states and function props to be used in components
    >
      {children}
    </ProductsContext.Provider>
  );
};

// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
