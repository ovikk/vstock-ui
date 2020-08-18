import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import theme from 'theme';
import Switcher from 'components/Switcher';

import Sneaker from './Sneaker';
import AddSneakerModal from './AddSneaker';

import { fetchOwnInventoryItems } from './inventoryActions';

import { currencies, isItemPublicSelections } from 'Util.js';

const Inventory = () => {
  const [stockState, setStockState] = useState(0);
  const [showAddSneakerModal, setShowAddSneakerModal] = useState(false);
  const [showEditSneakerModal, setShowEditSneakerModal] = useState(false);

  const [editSneakerData, setEditSneakerData] = useState({});

  const dispatch = useDispatch();

  const { items, isFetchingItems } = useSelector((state) => state.inventory);

  const onEditClick = (item) => {
    const {
      sneaker,
      id,
      currency,
      size,
      sell_price,
      buy_price,
      brand,
      name,
      is_item_public,
    } = item;

    const editSneakerData = {
      id,
      name: name || '',
      image_url: sneaker.image_url,
      style_id: sneaker.style_id,
      colorway: sneaker.colorway || '',
      brand: brand || '',
      buy_price: buy_price || '',
      sell_price: sell_price || '',
      size: size || '',
      currency: currency || currencies[0],
      is_item_public:
        is_item_public !== undefined && is_item_public !== null
          ? is_item_public
            ? isItemPublicSelections[0]
            : isItemPublicSelections[1]
          : isItemPublicSelections[0],
    };

    setEditSneakerData(editSneakerData);
    setShowEditSneakerModal(true);
  };

  useEffect(() => {
    if (items === undefined) {
      dispatch(fetchOwnInventoryItems());
    }
  }, []);

  const renderItemList = () => {
    if (isFetchingItems) return <div>Spinner</div>;

    if (!items) return null;

    items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return items.map((item, index) => (
      <Sneaker key={item.id} item={item} onEditClick={onEditClick} />
    ));
  };

  return (
    <MainWrapper>
      {showAddSneakerModal && (
        <AddSneakerModal
          showModal={showAddSneakerModal}
          onClose={() => setShowAddSneakerModal(false)}
          isEdit={false}
        />
      )}

      {showEditSneakerModal && (
        <AddSneakerModal
          showModal={showEditSneakerModal}
          onClose={() => setShowEditSneakerModal(false)}
          editSneakerData={editSneakerData}
          isEdit={true}
        />
      )}

      <Switcher
        currentState={stockState}
        setState={setStockState}
        statesArray={['Мой инветнарь', 'Дилерский инветнарь']}
      />

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
