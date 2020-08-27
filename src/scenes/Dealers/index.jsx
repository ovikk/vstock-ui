import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Switcher from 'components/Switcher';

import DealersInventory from './DealersInventory';
import DealersList from './DelaersList';
import BuyersList from './BuyersList';

import { useLocation, useHistory } from 'react-router-dom';

const pageStates = { dealersInventory: 0, dealers: 1, buyers: 2 };

const Dealers = () => {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const pageQuery = query.get('page');
  const [pageState, setPageState] = useState(pageStates[pageQuery] || 0);

  useEffect(() => {
    if (pageState === 0) {
      history.push('/app/dealers?page=dealersInventory');
    }

    if (pageState === 1) {
      history.push('/app/dealers?page=dealers');
    }

    if (pageState === 2) {
      history.push('/app/dealers?page=buyers');
    }
  }, [pageState]);

  return (
    <MainWrapper>
      <Switcher
        currentState={pageState}
        setState={setPageState}
        statesArray={['Инвентарь Дилеров', 'Список Дилеров', 'Список Баеров']}
      />
      {pageState === 0 && <DealersInventory />}
      {pageState === 1 && <DealersList />}
      {pageState === 2 && <BuyersList />}
    </MainWrapper>
  );
};

export default Dealers;

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
