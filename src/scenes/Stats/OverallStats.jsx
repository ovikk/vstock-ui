import React from 'react';
import styled from 'styled-components';

const OverallStats = ({ turnover, item_count }) => {
  return (
    <MainWrapper>
      <StatWrapper>
        <StatTitle>Цена Инвентаря</StatTitle>
        <StatValue>{turnover.buys.toLocaleString()}₽</StatValue>
      </StatWrapper>

      <StatWrapper>
        <StatTitle>Товары в инвентаре</StatTitle>
        <StatValue>{item_count.active}</StatValue>
      </StatWrapper>
    </MainWrapper>
  );
};

export default OverallStats;

const MainWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const StatWrapper = styled.div`
  height: 80px;
  margin: 0px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StatTitle = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.lighterBackground};
`;

const StatValue = styled.div`
  font-size: 36px;
  color: ${({ theme }) => theme.colors.textColor};
`;
