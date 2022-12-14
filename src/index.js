import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { CheckoutProvider } from "./context/checkout_context";
import { Auth0Provider } from "@auth0/auth0-react";
import { Toaster } from "react-hot-toast";

ReactDOM.render(
  <Auth0Provider
    domain="dev-i512nehz.us.auth0.com"
    clientId="qUYTVwHJxrFFDLcH2OEUMEBo2oKq29hc"
    redirectUri={window.location.origin}
    cacheLocation="localstorage" // store user token to local storage
  >
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <CheckoutProvider>
              <Toaster position="top-center" reverseOrder={false} />
              <App />
            </CheckoutProvider>
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
