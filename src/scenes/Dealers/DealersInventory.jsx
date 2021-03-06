import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import theme from 'theme';
import SearchInput from 'components/SearchInput';
import ListWithShadows from 'components/ListWithShadows';

import DealerSneaker from './DealerSneaker';

import { fetchDealersInventory } from './dealersActions';

import { currencies, isItemPublicSelections } from 'Util.js';

const DealersInventory = () => {

  const dispatch = useDispatch();

  const { dealersItems } = useSelector((state) => state.dealers);

  useEffect(() => {
    if (dealersItems === undefined) {
      dispatch(fetchDealersInventory());
    }
  }, []);

  const renderItemList = () => {
    if (dealersItems === undefined) return <div>Spinner</div>;

    if (!dealersItems) return null;

    dealersItems.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return dealersItems.map((item, index) => (
      <DealerSneaker key={item.id} item={item} />
    ));
  };

  return <ListWithShadows>{renderItemList()}</ListWithShadows>;
};

export default DealersInventory;

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
