import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  allProducts: [],
  allFilteredProducts: [],
  gridView: true,
  allFilteredProductsLoading: true,
  productSort: "price-lowest",
  filters: {
    text: "",
    categories: "all",
    companies: "all",
    colors: "all",
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false,
  },
}; // initialing all the state

const FilterContext = React.createContext(); //creating context api

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState); // init the useReducer hook for use

  const gridProducts = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  const listProducts = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = (e) => {
    // const name = e.target.name;
    const sortValue = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: sortValue });
  }; // functionality for sorting of products

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "categories") {
      value = e.target.textContent;
    }
    if (name === "colors") {
      value = e.target.dataset.colors;
    }
    if (name === "price") {
      value = Number(value);
    }
    if (name === "shipping") {
      value = e.target.checked;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  }; // functionality for sorting of products

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  }; // functionality for handling and updating of all filters for product display

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.productSort, state.filters]); // re-render the filter products and sorted product when the product, sort and filter state changes

  return (
    <FilterContext.Provider
      value={{
        ...state,
        gridProducts,
        listProducts,
        updateSort,
        updateFilters,
        clearFilters,
      }}
      // returning states and function props to be used in components
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
