import React, { useState } from 'react';
import styled from 'styled-components';
import theme from 'theme';

const Stock = () => {
  const [stockState, setStockState] = useState(0);

  return (
    <MainWrapper>
      <StockSwithcerWrapper>
        <StockSwitcherTab
          isSelected={stockState === 0}
          onClick={() => setStockState(0)}
        >
          Мой инвентарь
        </StockSwitcherTab>
        <StockSwitcherTab
          style={{ justifyContent: 'flex-end' }}
          isSelected={stockState === 1}
          onClick={() => setStockState(1)}
        >
          Дилерский инвентарь
        </StockSwitcherTab>
      </StockSwithcerWrapper>
    </MainWrapper>
  );
};

export default Stock;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 40px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
`;

const StockSwithcerWrapper = styled.div`
  height: 50px;
  display: flex;
  margin-left: 30px;
`;

const StockSwitcherTab: any = styled.div`
  width: 250px;
  display: flex;
  align-items: center;
  font-size: 22px;
  border-bottom-style: solid;
  border-bottom-width: 3px;
  padding: 0px 5px;

  border-bottom-color: ${(props: any) =>
    props.isSelected
      ? props.theme.colors.mainColor
      : props.theme.colors.nonFocusedTextColor};

  color: ${(props: any) =>
    props.isSelected
      ? props.theme.colors.textColor
      : props.theme.colors.nonFocusedTextColor};

  transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 100ms;

  cursor: pointer;
`;
