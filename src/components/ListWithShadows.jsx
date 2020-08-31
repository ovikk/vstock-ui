import React from 'react';
import styled from 'styled-components';

const ListWithShadows = ({ children, colorstart, colorend }) => {
  return (
    <ItemListWrapper>
      <ShadowTop colorstart={colorstart} colorend={colorend} />
      {children}
      <ShadowBottom colorstart={colorstart} colorend={colorend} />
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

  background-image: ${({ colorstart, colorend }) => `linear-gradient(
    to top,
    ${colorstart || 'rgba(0, 16, 34, 0)'},
    ${colorend || 'rgba(0, 16, 34, 1)'} 90%
  )`};
  height: 20px;
`;
const ShadowBottom = styled.div`
  content: '';
  position: sticky;
  z-index: 1;
  bottom: 0;
  pointer-events: none;
  background-image: ${({ colorstart, colorend }) => `linear-gradient(
    to bottom,
    ${colorstart || 'rgba(0, 16, 34, 0)'},
    ${colorend || 'rgba(0, 16, 34, 1)'} 90%
  )`};
  height: 20px;
`;

const ItemListWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  margin-top: 10px;
`;
