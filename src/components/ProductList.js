import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { allFilteredProducts } = useFilterContext();
  return (
    <>
      <GridView allFilteredProducts={allFilteredProducts} />
      {/* <ListView /> */}
    </>
  );
};

export default ProductList;
