import React, { useState } from 'react';
import styled from 'styled-components';
import Switcher from 'components/Switcher';

import DealersList from './DelaersList'

const Dealers = () => {
  const [pageState, setPageState] = useState(1);

  return (
    <MainWrapper>
      <Switcher
        currentState={pageState}
        setState={setPageState}
        statesArray={['Инвентарь Дилеров', 'Список Дилеров', 'Список Баеров']}
      />

      {pageState === 1 && <DealersList />} 
      




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
  color: yellow;
`;
