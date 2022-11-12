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
    let max_price = action.payload.map((products) => products.price); // iterating over all price
    max_price = Math.max(...max_price); // getting the max price
    return {
      ...state,
      allProducts: [...action.payload],
      allFilteredProducts: [...action.payload], // copying value and not referring to same place in the memory
      filters: {
        ...state.filters,
        maxPrice: max_price,
        price: max_price,
      }, // updating the filter state values
    };
  } // functionality for fetching product and setting the maximum price
  if (action.type === SET_GRIDVIEW) {
    return { ...state, gridView: true };
  } // return all the copy state and change grid view state
  if (action.type === SET_LISTVIEW) {
    return { ...state, gridView: false };
  } // return all the copy state and change grid view state
  if (action.type === UPDATE_SORT) {
    return { ...state, productSort: action.payload };
  } // return all the copy state and change the product sort state based on the payload value
  if (action.type === SORT_PRODUCTS) {
    const { allFilteredProducts, productSort } = state; // destructure state values needed
    let tempProducts = [...allFilteredProducts]; // copy all the filtered product
    // checking the product sort state value
    if (productSort === "price-lowest") {
      tempProducts = tempProducts.sort((currentProduct, nextProduct) => {
        // checking to see if the curr prod price is less than the next prod price, do not swap position
        if (currentProduct.price < nextProduct.price) {
          return -1;
        }
        // checking to see if the curr prod price is bigger than the next prod price, do swap position
        if (currentProduct.price > nextProduct.price) {
          return 1;
        }
        return 0; // do nothing
      });
    } // iterate over all the copied products
    if (productSort === "price-highest") {
      tempProducts = tempProducts.sort((currentProduct, nextProduct) => {
        // checking to see if the next prod price is less than the curr prod price , do not swap position
        if (nextProduct.price < currentProduct.price) {
          return -1;
        }
        // checking to see if the next prod price is bigger than the curr prod price , do swap position
        if (nextProduct.price > currentProduct.price) {
          return 1;
        }
        return 0; // do nothing
      });
    } // iterate over all the copied products
    if (productSort === "name-a") {
      tempProducts = tempProducts.sort((currentProduct, nextProduct) => {
        // comparing the curr prod name to the next prod name
        return currentProduct.name.localeCompare(nextProduct.name);
      });
    } // iterate over all the copied products
    if (productSort === "name-z") {
      tempProducts = tempProducts.sort((currentProduct, nextProduct) => {
        // comparing the next prod name to the curr prod name
        return nextProduct.name.localeCompare(currentProduct.name);
      });
    } // iterate over all the copied products
    return { ...state, allFilteredProducts: tempProducts }; // return all the copy state and all filtered product state to the sorted products value
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload; // destruct payload properties
    return { ...state, filters: { ...state.filters, [name]: value } }; // return all the copy state and all filter state alongside handling form input changes
  }

  if (action.type === FILTER_PRODUCTS) {
    const { allProducts } = state; // destructing the state
    const { text, categories, companies, colors, price, shipping } =
      state.filters; // destructuring all filter state value

    let tempProducts = [...allProducts]; // getting a copy of all default products

    // checking if they is any value in the text filter state
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      }); // filtering over all products and return only prods starting with that text
    }
    // checking the categories state to see if it not 'all'
    if (categories !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.category === categories;
      }); // filter out only products whose categories state value is same with the category in the product fetched API
    }
    // checking the companies state to see if it not 'all'
    if (companies !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.company === companies;
      }); // filter out only products whose companies state value is same with the company in the product fetched API
    }

    // checking the colors state to see if it not 'all'
    if (colors !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((col) => col === colors);
      }); // filter over all product and find each product based on the color
    }

    // price
    tempProducts = tempProducts.filter((product) => {
      return product.price <= price;
    }); // filter out all products whose price state value is less than the fetched API products price

    // shipping
    if (shipping) {
      tempProducts = tempProducts.filter((product) => {
        return product.shipping === true;
      });
    } // filter out only products which has free shipping from the fetched API
    return { ...state, allFilteredProducts: tempProducts }; // return all the copy of the state values and update the filter products based on the filtering
  } // functionality for filtering products
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        categories: "all",
        companies: "all",
        colors: "all",
        price: state.filters.maxPrice,
        shipping: false,
      },
    }; // return all the state value and filter state value to default
  } // functionality for clearing filtered option back to default state
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
