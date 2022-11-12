import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  const { id } = useParams(); // getting the id of the url
  const {
    singleProductLoading,
    singleProductError,
    singleProduct,
    fetchSingleProduct,
  } = useProductsContext(); // passing in states  and functionality
  const navigate = useNavigate();

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
    // eslint-disable-next-line
  }, [id]); // fetch and re-render fetched data any time the id params changes

  useEffect(() => {
    if (singleProductError) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } // if the is an error and the single product API url is invalid redirect to home
    // eslint-disable-next-line
  }, [singleProductError]); // re-render whenever the single product error state changes

  if (singleProductLoading) {
    return <Loading />;
  } // display loading component when the product data is still fetching

  if (singleProductError) {
    return <Error />;
  } // display error component when the product data is not found (invalid URL)

  const {
    company,
    description,
    id: sku,
    images,
    name,
    price,
    reviews,
    stars,
    stock,
  } = singleProduct; // destructuring the single product object that was fetched from the API url
  return (
    <Wrapper>
      <PageHero title={name} singleProduct />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          Back To Products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <div className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available:</span>
              {stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <p className="info">
              <span>Sku:</span>
              {sku}
            </p>
            <p className="info">
              <span>Company:</span>
              {company}
            </p>
            <hr />
            {stock > 0 ? <AddToCart singleProduct={singleProduct} /> : null}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
