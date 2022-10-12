import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { allFilteredProducts, gridView } = useFilterContext();

  if (allFilteredProducts.length < 1) {
    return <h5>Sorry, No Product Matches your search...</h5>;
  }
  return (
    <>
      {gridView ? (
        <GridView allFilteredProducts={allFilteredProducts} />
      ) : (
        <ListView allFilteredProducts={allFilteredProducts} />
      )}
    </>
  );
};

export default ProductList;
