import React from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import { CartContent, PageHero } from "../components";

const CartPage = () => {
  const { cart } = useCartContext();
  if (cart.length < 1) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>Your Cart is Empty</h2>
          <Link to="/products" className="btn">
            Fill It Up
          </Link>
        </div>
      </Wrapper>
    );
  } // display when the cart item length is less than one
  return (
    <Wrapper className="page">
      <PageHero title="cart" />
      <CartContent />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
