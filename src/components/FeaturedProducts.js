import React from "react";
import { useProductsContext } from "../context/products_context";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";

const FeaturedProducts = () => {
  const { productLoading, productError, featuredProducts } =
    useProductsContext();
  if (productLoading) {
    return <Loading />;
  } // display loading component when data is still fetching

  if (productError) {
    return <Error />;
  } // display error component when data is not found
  return (
    <Wrapper className="section">
      <div className="title">
        <h2>Featured Products</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {/* iterate over the featured products state and display all 6 product */}
        {featuredProducts?.slice(0, 6).map((featured) => {
          return <Product key={featured.id} {...featured} />;
        })}
      </div>
      <Link to="/products" className="btn">
        All Products
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
