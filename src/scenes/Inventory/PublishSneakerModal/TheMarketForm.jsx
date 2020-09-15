import React from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const TheMarketForm = ({ item }) => {
  const onAddItemClick = () => { }

  return (
    <div>
      {item.name}
      <SubmitButton disabled onClick={onAddItemClick}>
        Разместить
      </SubmitButton>
    </div>
  )
}

const SubmitButton = styled(Button)`
  && {
    margin-top: 50px;
    width: calc(100% + 60px);
    margin-left: -30px;
    height: 80px;
    font-size: 16px;

    background-color: ${({ theme }) => theme.colors.approveColor};

    :hover {
      background-color: pink;
    }

    :disabled {
      background-color: #A3A3A3;
      color: white;
    }
  }
`;
