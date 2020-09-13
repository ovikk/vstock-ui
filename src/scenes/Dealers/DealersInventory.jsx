import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListWithShadows from 'components/ListWithShadows';
import { SneakersList } from 'components/SneakersList';
import { fetchDealersInventory } from './dealersActions';

const DealersInventory = () => {
  const dispatch = useDispatch();
  const { dealersItems } = useSelector((state) => state.dealers);

  useEffect(() => {
    if (dealersItems === undefined) {
      dispatch(fetchDealersInventory());
    }
  }, []);

  return <ListWithShadows>
    <SneakersList itemArray={dealersItems} readOnly/>
    </ListWithShadows>;
};

export default DealersInventory;
