import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let max_price = action.payload.map((products) => products.price);
    max_price = Math.max(...max_price);
    return {
      ...state,
      allProducts: [...action.payload],
      allFilteredProducts: [...action.payload], // copying value and not referring to same place in the memory
      filters: {
        ...state.filters,
        maxPrice: max_price,
        price: max_price,
      },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, gridView: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, gridView: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, productSort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    const { allFilteredProducts, productSort } = state;
    let tempProducts = [...allFilteredProducts];
    if (productSort === "price-lowest") {
      tempProducts = tempProducts.sort((currentProduct, nextProduct) => {
        if (currentProduct.price < nextProduct.price) {
          return -1;
        }
        if (currentProduct.price > nextProduct.price) {
          return 1;
        }
        return 0;
      });
    }
    if (productSort === "price-highest") {
      tempProducts = tempProducts.sort((currentProduct, nextProduct) => {
        if (nextProduct.price < currentProduct.price) {
          return -1;
        }
        if (nextProduct.price > currentProduct.price) {
          return 1;
        }
        return 0;
      });
    }
    if (productSort === "name-a") {
      tempProducts = tempProducts.sort((currentProduct, nextProduct) => {
        return currentProduct.name.localeCompare(nextProduct.name);
      });
    }
    if (productSort === "name-z") {
      tempProducts = tempProducts.sort((currentProduct, nextProduct) => {
        return nextProduct.name.localeCompare(currentProduct.name);
      });
    }
    return { ...state, allFilteredProducts: tempProducts };
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    console.log("Filtering Product");
    return { ...state };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
