import React, { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import { Scrollbars } from 'react-custom-scrollbars';
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
          Мой инветнарь
        </StockSwitcherTab>
        <StockSwitcherTab
          style={{ justifyContent: 'flex-end' }}
          isSelected={stockState === 1}
          onClick={() => setStockState(1)}
        >
          Дилерский инветнарь
        </StockSwitcherTab>
      </StockSwithcerWrapper>

      <TopBarWrapper>
        <SearchWrapper>
          <SearchIcon style={SearchIconStyle} />
          <SearchInput placeholder="Что ищем?" />
        </SearchWrapper>

        <AddButton>
          Добавить
          <AddIcon style={AddIconStyle} />
        </AddButton>
      </TopBarWrapper>

      <ItemListWrapper>
        <ShadowTop />

        <ItemWrapper>kek</ItemWrapper>
        <ItemWrapper>kek</ItemWrapper>
        <ItemWrapper>kek</ItemWrapper>
        <ItemWrapper>kek</ItemWrapper>
        <ItemWrapper>kek</ItemWrapper>
        <ItemWrapper>kek</ItemWrapper>
        <ItemWrapper>kek</ItemWrapper>
        <ItemWrapper>kek</ItemWrapper>
        <ShadowBottom />
      </ItemListWrapper>
    </MainWrapper>
  );
};

export default Stock;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px 20px 10px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: hidden;
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
      : props.theme.colors.secondaryColor};

  color: ${(props: any) =>
    props.isSelected
      ? props.theme.colors.textColor
      : props.theme.colors.secondaryColor};

  transition: 200ms cubic-bezier(0, 0, 0.2, 1) 100ms;

  cursor: pointer;
`;

const TopBarWrapper = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  margin-left: 30px;
  display: flex;
  align-items: center;
`;

const SearchWrapper = styled.div`
  width: 520px;
  height: 100%;
  border-width: 2px;
  border-style: solid;
  border-radius: 40px;
  border-color: ${({ theme }) => theme.colors.secondaryColor};
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
`;

const SearchIconStyle = {
  color: theme.colors.secondaryColor,
  marginLeft: 10,
  height: '70%',
  width: 'auto',
};

const SearchInput = styled.input`
  padding: 0px 10px;
  outline: none;
  border: none;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textColor};
  font-family: ${({ theme }) => theme.font};
  font-size: 18px;
  ::placeholder {
    color: ${({ theme }) => theme.colors.secondaryColor};
    font-family: ${({ theme }) => theme.font};
    font-size: 18px;
  }
`;

const AddButton = styled.button`
  outline: none;
  border-radius: 40px;
  margin-left: 50px;
  width: 200px;
  height: calc(100% + 2px);
  padding: 0px 20px 2px 20px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.approveColor};
  background-color: ${({ theme }) => theme.colors.background};

  font-family: ${({ theme }) => theme.font};
  font-size: 18px;
  line-height: 20px;

  color: ${({ theme }) => theme.colors.approveColor};

  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: 250ms;

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.textColor};
    box-shadow: ${({ theme }) =>
      `0 0.5em 0.5em -0.45em ${theme.colors.approveColor}`};
    transform: translateY(-0.25em);
  }
`;

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
  padding-left: 30px;
  overflow-y: scroll;
  margin-top: 10px;
`;

const ItemWrapper = styled.div`
  width: calc(100% - 100px);
  background-color: ${({ theme }) => theme.colors.lightBackground};
  border-radius: 10px;
  height: 150px;
  margin-bottom: 25px;
`;

const AddIconStyle = {
  height: '70%',
  width: 'auto',
  marginTop: '2px',
};
