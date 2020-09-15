import React from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Input from 'components/Input'
import Api from 'Api';

export const OutOfStockForm = ({ item }) => {
  const [price, setPrice] = React.useState(0)
  console.log(item)
  const onAddItemClick = () => { 
    const body = {
      name: item.name,
      size: item.size,
      price: price * 1
    }
    Api.publishItem('oos', item.item_id, body)
    console.log(body)
  }

  return (
    <div>
      <p>{item.name}</p>
      <p>{item.size}</p>

      <Input value={price} setInputValue={setPrice}/>

      <SubmitButton disabled={price <= 0} onClick={onAddItemClick}>
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
