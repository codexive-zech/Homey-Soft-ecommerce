import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { allFilteredProducts, gridView } = useFilterContext(); // passing in states and functionality

  if (allFilteredProducts.length < 1) {
    return <h5>Sorry, No Product Matches your search...</h5>;
  } // display this when the all filtered product returned is less than 1
  return (
    <>
      {/* display the all products view based on the grid view state*/}
      {gridView ? (
        <GridView allFilteredProducts={allFilteredProducts} />
      ) : (
        <ListView allFilteredProducts={allFilteredProducts} />
      )}
    </>
  );
};

export default ProductList;
