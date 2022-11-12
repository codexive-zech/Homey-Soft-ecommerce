import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const AuthWrapper = ({ children }) => {
  const { isLoading, error } = useAuth0(); // destructuring all the state and functionality from Auth0
  if (isLoading) {
    return (
      <Wrapper>
        <h1>Loading...</h1>
      </Wrapper>
    );
  } // display loading component when it's loading
  if (error) {
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    );
  } // display error component when they is an error
  return <>{children}</>; // return the rest page when it's not loading or they is no error
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

export default AuthWrapper;
