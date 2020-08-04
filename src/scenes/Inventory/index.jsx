import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import theme from 'theme';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import Sneaker from './Sneaker';
import AddSneakerModal from './AddSneakerModal';

import { fetchOwnInventoryItems } from './inventoryActions';

const Inventory = () => {
  const [stockState, setStockState] = useState(0);
  const [showAddSneakerModal, setShowAddSneakerModal] = useState(true);

  const dispatch = useDispatch();

  const { items, isFetchingItems } = useSelector((state) => state.inventory);

  useEffect(() => {
    if (items === undefined) {
      dispatch(fetchOwnInventoryItems());
    }
  }, []);

  const renderItemList = () => {
    if (isFetchingItems) return <div>Spinner</div>;

    if (items === undefined) return null;

    return items.map((item, index) => <Sneaker key={index} item={item} />);
  };

  return (
    <MainWrapper>
      <AddSneakerModal
        showModal={showAddSneakerModal}
        onClose={() => setShowAddSneakerModal(false)}
      />

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

        <AddButton onClick={() => setShowAddSneakerModal(true)}>
          Добавить
          <AddIcon style={AddIconStyle} />
        </AddButton>
      </TopBarWrapper>

      <ItemListWrapper>
        <ShadowTop />

        {renderItemList()}

        <ShadowBottom />
      </ItemListWrapper>
    </MainWrapper>
  );
};

export default Inventory;

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
const StockSwitcherTab = styled.div`
  width: 250px;
  display: flex;
  align-items: center;
  font-size: 22px;
  border-bottom-style: solid;
  border-bottom-width: 3px;
  padding: 0px 5px;

  border-bottom-color: ${(props) =>
    props.isSelected
      ? props.theme.colors.mainColor
      : props.theme.colors.secondaryColor};

  color: ${(props) =>
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

  color: ${({ theme }) => theme.colors.textColor};

  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: 250ms;

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.textColor};
    box-shadow: ${({ theme }) =>
      `0 0.2em 0.2em -0.15em ${theme.colors.approveColor}`};
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
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px 20px 10px 30px;
`;
const ItemTopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 120px;
`;
const ItemImage = styled.img`
  height: 90%;
  width: auto;
`;
const ItemMainInfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 60%;
  align-self: center;
  margin: 0px 10px;
`;
const ItemMainInfoTop = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  align-items: center;
`;

const ItemName = styled.span`
  font-family: ${({ theme }) => theme.fontBold};
  color: ${({ theme }) => theme.colors.textColor};
  font-size: 30px;
  margin-right: 30px;
`;

const ItemLink = styled.span`
  color: ${({ theme }) => theme.colors.mainColor};
  text-decoration: underline;
  cursor: pointer;
`;

const ItemCost = styled.span`
  color: ${({ theme }) => theme.colors.textColor};
  font-size: 36px;
  font-family: ${({ theme }) => theme.fontBold};
  margin-left: auto;
`;

const ItemMainInfoBottom = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  justify-content: space-between;
  align-items: flex-end;
`;

const ItemMainInfoBottomSection = styled.div`
  width: 190px;
  display: flex;
  justify-content: space-around;
`;

const ItemMainInfoBottomTitle = styled.span`
  color: ${({ theme }) => theme.colors.secondaryColor};
  font-size: 18px;
  margin-right: 5px;
`;

const ItemMainInfoBottomText = styled.span`
  color: ${({ theme }) => theme.colors.textColor};
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemButtonsWrapper = styled.div`
  width: 300px;
  height: 100%;
  margin: 0px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ItemButton = styled.button`
  outline: none;
  border-radius: 40px;
  margin-left: 50px;
  width: 220px;
  height: 40px;
  text-align: center; 
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.mainColor};
  /* background-color: ${({ theme }) => theme.colors.background}; */
  background-color: inherit;
  font-family: ${({ theme }) => theme.font};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textColor};
  transition: 250ms;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.textColor};
    box-shadow: ${({ theme }) =>
      `0 0.1em 0.1em -0.05em ${theme.colors.mainColor}`};
    transform: translateY(-0.25em);
  }
`;

const ItemControls = styled.div`
  background-color: orange;
  height: 100%;
  width: 50px;
  margin: 0px 10px;
`;

const AddIconStyle = {
  height: '70%',
  width: 'auto',
  marginTop: '2px',
  color: theme.colors.approveColor,
};
