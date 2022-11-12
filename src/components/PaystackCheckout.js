import React from "react";
import styled from "styled-components";
import { useCheckoutContext } from "../context/checkout_context";
import PaystackPop from "@paystack/inline-js";
import { useCartContext } from "../context/cart_context";

const CheckoutForm = () => {
  const { name, email, phone, address, handleCheckoutInput } =
    useCheckoutContext(); // passing in states and functionality
  const { totalAmounts } = useCartContext(); // passing in states and functionality

  const handlePayment = (e) => {
    e.preventDefault();
    const paystack = new PaystackPop(); // create a new instance for paystack popup UI
    paystack.newTransaction({
      key: "pk_test_bbf8a22d3fbb78b217cd7f8ace2d4bb455feed57",
      name,
      amount: totalAmounts,
      email,
      phone,
      address,
      onSuccess(transaction) {
        const message = `Payment Complete!. Reference is ${transaction.reference}`;
        alert(message);
      },
      onCancel() {
        alert("You Have Cancel The Transaction");
      },
    });
  };

  return (
    <form>
      <h5>Fill Details To Make Payment</h5>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleCheckoutInput}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleCheckoutInput}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={phone}
          onChange={handleCheckoutInput}
        />
      </div>
      <div>
        <label htmlFor="address">House Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={handleCheckoutInput}
        />
      </div>
      <button type="button" className="btn" onClick={handlePayment}>
        Make Payment
      </button>
    </form>
  );
};

const PaystackCheckout = () => {
  return (
    <Wrapper>
      <CheckoutForm />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  form {
    width: 30vw;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
    margin: 3rem;
  }
  input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    font-size: 16px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  /* Buttons and links */
  button {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
    margin-top: 1rem;
  }
  button:hover {
    filter: contrast(115%);
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  @media screen and (max-width: 600px) {
    form {
      width: 80vw;
    }
  }
`;

export default PaystackCheckout;

// pk_test_bbf8a22d3fbb78b217cd7f8ace2d4bb455feed57
