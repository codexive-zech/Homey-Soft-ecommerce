import React from "react";
import styled from "styled-components";
import Product from "./Product";

const GridView = ({ allFilteredProducts }) => {
  return (
    <Wrapper>
      <div className="products-container">
        {/* iterating over all the filtered products array */}
        {allFilteredProducts.map((products) => {
          return <Product key={products.id} {...products} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default GridView;
