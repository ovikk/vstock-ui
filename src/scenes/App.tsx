import React from "react";
import styled from "styled-components";
import LeftMenu from "components/LeftMenu";

const App = () => {
  return (
    <AppWrapper>
      <LeftMenu />
      <span>Lol kek</span>
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.background};

  height: 100%;
  width: 100%;
  display: flex;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  font-family: 'Roboto'
`;

export default App;
