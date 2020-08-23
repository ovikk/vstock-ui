import React, { useState } from 'react';
import styled from 'styled-components';
import Switcher from 'components/Switcher';

import DealersInventory from './DealersInventory';
import DealersList from './DelaersList';
import BuyersList from './BuyersList';

const Dealers = () => {
  const [pageState, setPageState] = useState(0);

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
