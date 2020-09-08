import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import theme from 'theme';
import Swither from 'components/Switcher';
import SearchInput from 'components/SearchInput';
import ListWithShadows from 'components/ListWithShadows';

import Sneaker from './Sneaker';
import AddSneakerModal from './AddSneaker';
import SellSneakerModal from './SellSneakerModal';

import { useLocation, useHistory } from 'react-router-dom';

import {
  fetchOwnInventoryItems,
  fetchOwnSoldInventoryItems,
} from './inventoryActions';

import { currencies, isItemPublicSelections } from 'Util.js';

const pageStates = { own: 0, sold: 1 };

const Inventory = () => {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const pageQuery = query.get('page');
  const [pageState, setPageState] = useState(pageStates[pageQuery] || 0);

  useEffect(() => {
    history.push(`/app/inventory?page=${pageStates[pageState] || 0}`);
    if (pageState === 0) {
      items === undefined && dispatch(fetchOwnInventoryItems());
      history.push('/app/inventory?page=own');
    }
    if (pageState === 1) {
      soldItems === undefined && dispatch(fetchOwnSoldInventoryItems());
      history.push('/app/inventory?page=sold');
    }
  }, [pageState]);

  const [showAddSneakerModal, setShowAddSneakerModal] = useState(false);

  const [showEditSneakerModal, setShowEditSneakerModal] = useState(false);
  const [editSneakerData, setEditSneakerData] = useState({});

  const [showSellSneakerModal, setShowSellSneakerModal] = useState(false);
  const [sellSneakerData, setSellSneakerData] = useState({});

  const dispatch = useDispatch();

  const { items, soldItems } = useSelector((state) => state.inventory);

  const onSellClick = (item) => {
    const { name, size_title, sell_price, sell_source, currency, product, id } = item;

    setSellSneakerData({
      id,
      name,
      size_title,
      sell_price,
      sell_source,
      currency,
      product
    });

    setShowSellSneakerModal(true);
  };

  const onEditClick = (item) => {
    const {
      product,
      id,
      currency,
      sell_price,
      buy_price,
      name,
      is_item_public,
      size_id,
      status,
      buy_date,
      sell_date,
      sell_source,
      comment,
      buy_source,
      style_id,
      gallery,
    } = item;
    
    const editSneakerData = {
      id,
      name: name || '',
      image_url: product.image_url,
      style_id: style_id,
      colorway: product.colorway || '',
      brand: product.brand_name || '',
      size_id: size_id || -1,
      sizes: product.sizes, 
      buy_price: buy_price || '',
      sell_price: sell_price || '',
      currency: currency || currencies[0],
      status: !!status,
      sell_source,
      buy_date,
      sell_date,
      comment,
      buy_source,
      gallery,
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

  const renderItemList = (itemArray) => {
    if (itemArray === undefined) return <div>Spinner</div>;

    if (!itemArray) return null;

    itemArray.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return itemArray.map((item, index) => (
      <Sneaker key={item.id} item={item} onEditClick={onEditClick} onSellClick={onSellClick}/>
    ));
  };

  return (
    <MainWrapper>
      {(showAddSneakerModal || showEditSneakerModal) && (
        <AddSneakerModal
          onClose={() =>
            showAddSneakerModal
              ? setShowAddSneakerModal(false)
              : setShowEditSneakerModal(false)
          }
          isEdit={showEditSneakerModal}
          editSneakerData={(showEditSneakerModal && editSneakerData) || null}
        />
      )}

      {showSellSneakerModal && (
        <SellSneakerModal
          onClose={() => setShowSellSneakerModal(false)}
          data={sellSneakerData}
        />
      )}

      <Swither
        currentState={pageState}
        setState={setPageState}
        statesArray={['Инвентарь', 'Продажи']}
      />

      <TopBarWrapper>
        <SearchInput placeholder="Что ищем?" />

        {/* TODO: */}
        <GroupButton onClick={() => setShowAddSneakerModal(true)}>
          Группировка
        </GroupButton>

        <AddButton onClick={() => setShowAddSneakerModal(true)}>
          Добавить
          <AddIcon style={AddIconStyle} />
        </AddButton>
      </TopBarWrapper>

      <ListWithShadows>
        {renderItemList(pageState === 0 ? items : soldItems)}
      </ListWithShadows>
    </MainWrapper>
  );
};

export default Inventory;

const GroupButton = styled.button`
  outline: none;
  border-radius: 40px;
  width: 200px;
  height: 40px;
  text-align: left; 
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.mainColor};
  /* background-color: ${({ theme }) => theme.colors.background}; */
  background-color: inherit;
  font-family: ${({ theme }) => theme.font};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textColor};
  transition: 250ms;
  margin-left: 50px;
  cursor: pointer;
  padding: 0 20px 2px;
  &:hover {
    color: ${({ theme }) => theme.colors.textColor};
    box-shadow: ${({ theme }) =>
      `0 0.1em 0.1em -0.05em ${theme.colors.mainColor}`};
    transform: translateY(-0.25em);
  }
`;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px 20px 10px 30px;
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
  display: flex;
  align-items: center;
`;
const AddButton = styled.button`
  outline: none;
  border-radius: 40px;
  margin-left: 50px;
  width: 200px;
  height: 42px;
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

const AddIconStyle = {
  height: '70%',
  width: 'auto',
  marginTop: '2px',
  color: theme.colors.approveColor,
};
