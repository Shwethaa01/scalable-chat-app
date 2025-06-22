import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
// import conversation from "../assets/animation_lnhbqvxp.json";
import styled from "styled-components";

function NoSelectedContact() {
  return (
    <Container>
      {/* <Lottie animationData={conversation} loop={true} /> */}
      <h1>Welcome, !</h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #128c7e;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

export default NoSelectedContact;
