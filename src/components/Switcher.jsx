import React from 'react';
import styled from 'styled-components';

const Switcher = ({ currentState, setState, statesArray }) => {
  const getJustfify = (index, length) => {
    if (index === 0) return 'flex-start';
    if (index === length - 1) return 'flex-end';
    return 'center';
  };

  return (
    <StockSwithcerWrapper>
      {statesArray.map((stateName, index) => (
        <StockSwitcherTab
          key={index}
          isSelected={currentState === index}
          onClick={() => setState(index)}
          style={{ justifyContent: getJustfify(index, statesArray.length) }}
        >
          {stateName}
        </StockSwitcherTab>
      ))}
    </StockSwithcerWrapper>
  );
};

export default Switcher;

const StockSwithcerWrapper = styled.div`
  height: 50px;
  display: flex;
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
