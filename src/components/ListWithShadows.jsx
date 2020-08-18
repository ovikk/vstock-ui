import React from 'react';
import styled from 'styled-components';

const ListWithShadows = ({ children }) => {
  return (
    <ItemListWrapper>
      <ShadowTop />

      {children}

      <ShadowBottom />
    </ItemListWrapper>
  );
};

export default ListWithShadows;

const ShadowTop = styled.div`
  content: '';
  position: sticky;
  z-index: 1;
  top: 0;
  pointer-events: none;
  background-image: linear-gradient(
    to top,
    rgba(0, 16, 34, 0),
    rgba(0, 16, 34, 1) 90%
  );
  height: 40px;
`;
const ShadowBottom = styled.div`
  content: '';
  position: sticky;
  z-index: 1;
  bottom: 0;
  pointer-events: none;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 16, 34, 0),
    rgba(0, 16, 34, 1) 90%
  );
  height: 40px;
`;

const ItemListWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  margin-top: 10px;
`;
