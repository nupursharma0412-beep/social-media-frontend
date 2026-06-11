import React from "react";
import styled from 'styled-components';

const Loading = () => {
  return (
   <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    width: 5.4em;
    height: 5.4em;
    border: 0.4em solid rgb(84, 84, 84);
    border-left-color: #a23ffc;
    border-radius: 45%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }`;

export default Loading;