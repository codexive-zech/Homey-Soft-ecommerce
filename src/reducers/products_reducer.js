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

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  } // return all the copy state and change sidebar state to open
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  } // return all the copy state and change sidebar state to open
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, productLoading: true };
  } // return all the copy state and change loading state for product fetching
  if (action.type === GET_PRODUCTS_SUCCESS) {
    const featured_products = action.payload.filter(
      (product) => product.featured === true
    );
    return {
      ...state,
      products: action.payload,
      featuredProducts: featured_products,
      productLoading: false,
    };
  } // return all the copy state and filter out featured products from the api, return all products as well
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, productLoading: false, productError: true };
  } // return all the copy state and change loading and error state for product fetching errors
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return { ...state, singleProductLoading: true, singleProductError: false };
  } // return all the copy state and change loading and error state for single product fetching
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      singleProduct: action.payload,
      singleProductLoading: false,
    };
  } // return all the copy state and change state of single product to fetched data and single product loading state
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return { ...state, singleProductError: true, singleProductLoading: false };
  } // return all the copy state and change loading and error state for single product fetching

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
