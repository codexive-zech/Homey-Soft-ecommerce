import React from "react";
import styled from "styled-components";
import { PageHero, PaystackCheckout } from "../components";
// extra imports
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { cart } = useCartContext(); // passing in states and functionality
  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page">
        {/* display when the cart item length is less than one */}
        {cart.length < 1 ? (
          <div className="empty">
            <h2>Your cart is empty</h2>
            <Link to="/products" className="btn">
              See Products
            </Link>
          </div>
        ) : (
          <PaystackCheckout />
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
