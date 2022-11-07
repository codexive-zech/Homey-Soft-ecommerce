import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  Home,
  About,
  Cart,
  Checkout,
  Products,
  SingleProduct,
  PrivateRoute,
  Error,
  AuthWrapper,
} from "./pages";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <PrivateRoute exact path="/checkout">
            <Checkout />
          </PrivateRoute>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/product/:id" children={<SingleProduct />} />
          <Route exact path="*">
            <Error />
          </Route>
        </Switch>
        <Footer />
        {/* <ToastContainer position="top-center" style={{ marginTop: "1rem" }} /> */}
      </Router>
    </AuthWrapper>
  );
}

export default App;
