import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";

const AddToCart = ({ singleProduct }) => {
  const { id, stock, colors } = singleProduct; // destructing single product property
  const { addToCart } = useCartContext(); // passing in states and functionality
  const [mainColor, setMainColor] = useState(colors[0]); // define color state for single product
  const [amount, setAmount] = useState(1); // define amount state

  const increaseAmount = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1; // increment amount
      // checking if the amount is bigger than the available stock
      if (tempAmount > stock) {
        tempAmount = stock; //
      } // amount should be available stock
      return tempAmount;
    });
  };

  const decreaseAmount = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1; // decrement amount
      // checking if the amount is less than the one
      if (tempAmount < 1) {
        tempAmount = 1;
      } // amount should be one
      return tempAmount;
    });
  };
  return (
    <Wrapper>
      <div className="colors">
        <span>Color : </span>
        <div>
          {/* iterate over the color state from the fetched API url */}
          {colors.map((color, index) => {
            return (
              <button
                key={index}
                style={{ backgroundColor: `${color}` }}
                className={`${
                  mainColor === color ? "active color-btn" : "color-btn"
                }`}
                onClick={() => setMainColor(color)}
              >
                {/* checking if the mainColor state is same as fetched color  */}
                {mainColor === color ? <FaCheck /> : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          amount={amount}
          increaseAmount={increaseAmount}
          decreaseAmount={decreaseAmount}
        />
        <Link
          to="/cart"
          className="btn"
          onClick={() => addToCart(id, mainColor, amount, singleProduct)}
        >
          Add To Cart
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;

// recovery Code for Auth0 : V32WGLY1236ZY3LXGA1RC8GF
