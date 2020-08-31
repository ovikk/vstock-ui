import React from 'react';
import styled from 'styled-components';
import ListWithShadows from 'components/ListWithShadows';

const BarStats = ({ items }) => {
  const itemCount = items.reduce((acc, curr) => (acc += curr.amount), 0);

  const sortedItems = items.sort((a, b) => b.amount - a.amount);

  const renderBar = (item) => {
    const percent = Math.ceil(item.amount / (itemCount / 100));

    return (
      <BarWrapper key={item.name}>
        <NameWrapper>{item.name}</NameWrapper>
        <Bar>
          <FilledPart percent={percent} />
          <PercentWrapper>{percent}%</PercentWrapper>
        </Bar>
      </BarWrapper>
    );
  };

  return (
    <MainWrapper>
      <ListWithShadows
        colorstart="rgba(21, 29, 49, 0)"
        colorend="rgba(21, 29, 49, 1)"
      >
        {sortedItems.map((item) => renderBar(item))}
      </ListWithShadows>
    </MainWrapper>
  );
};

export default BarStats;

const MainWrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
`;

const BarWrapper = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const NameWrapper = styled.div`
  width: 80px;
  color: ${({ theme }) => theme.colors.textColor};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Bar = styled.div`
  height: 100%;
  width: calc(100% - 80px);
  margin-left: 10px;
  background: #394974;
  border-radius: 8px;
  display: flex;
  position: relative;
`;

const FilledPart = styled.div`
  width: ${(props) => props.percent}%;
  height: 100%;
  background: linear-gradient(180deg, #56ccf2 0%, #2d9cdb 100%);
  border-radius: 8px;
`;

const PercentWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 0px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${({ theme }) => theme.colors.textColor};
`;

/* margin-left: auto;
  margin-right: 5px;
  height: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textColor}; */
