import React from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import Input from 'components/Input'
import Api from 'Api';

const productConditions = [
  { "id": 10, "title": "Новая с биркой" },
  { "id": 9, "title": "Новая без бирки" },
  { "id": 8, "title": "Есть дефекты" },
  { "id": 7, "title": "Надевалась один раз" },
  { "id": 6, "title": "Надевалась несколько раз" }
]

const escrowAllowedRef = [
  { "id": 1, "title": "Безопасная сделка включена", "escrowAllowed": true },
  { "id": 2, "title": "Безопасная сделка отключена", "escrowAllowed": false }
]

const deliveryRef = [
  { "id": 1, "title": "Личная встреча" },
  { "id": 2, "title": "Личная встреча и доставка почтой" }
]

export const TheMarketForm = ({ item, onClose }) => {
  const [price, setPrice] = React.useState(0)
  const [description, setDescription] = React.useState(item.description)
  const [deliveryPrice, setDeliveryPrice] = React.useState(item && item.deliveryPrice || 0)
  const [city, setCity] = React.useState(item.city_name)
  const [mailDelivery, setMailDelivery] = React.useState(true)
  const [productCondition, setProductConditions] = React.useState(10)
  const [secure, setSecure] = React.useState(true)

  const handleChange = (event) => {
    setProductConditions(event.target.value);
  }

  const onAddItemClick = () => {
    const itemCopy = { ...item };
    itemCopy.price = price;
    if (mailDelivery) {
      itemCopy.deliveryId = 2;
    }
    else {
      itemCopy.deliveryId = 1;
    }

    if (secure) {
      itemCopy.escrowAllowed = true;
    }
    else {
      itemCopy.escrowAllowed = false;
    }

    itemCopy.conditionId = productCondition;
    itemCopy.description = description;

    console.log('model', itemCopy)
    Api.publishItem('tm', item.item_id, itemCopy).then(() => onClose())
  }

  return (
    <div>
      <P>
        {`${item.model} `}
        <Size>{item.size_title}</Size>
      </P>

      <table>
        <tbody>
          <tr>
            <TD colSpan={2}>
              <Label id="demo-simple-select-label">Состояние</Label>
              <StyledSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productCondition}
                onChange={handleChange}
              >
                {productConditions.map(x => (
                  <MenuItem key={x.id} value={x.id}>{x.title}</MenuItem>
                ))}
              </StyledSelect>
            </TD>
          </tr>
          <tr>
            <TD>
              <Input inputValue={price} title='Цена продажи' setInputValue={setPrice} />
            </TD>
            <TD>
              <Input inputValue={deliveryPrice} title='Цена доставки' setInputValue={setDeliveryPrice} disabled />
            </TD>
          </tr>
          <tr>
            <TD>
              <Input inputValue={item.city_name} title='Ваш город' setInputValue={setCity} disabled />
            </TD>
            <TD>
              <div>
                <Label>
                  Доставка почтой
                </Label>
              </div>
              <Checkbox
                checked={mailDelivery}
                color="primary"
                onChange={(e) => {
                  if (secure) {
                    setMailDelivery(e.target.checked);
                  }
                }}
              />
            </TD>
          </tr>
          <tr>
            <TD>
              {/* TODO: update setter */}
              <Input inputValue={item.country_name} title='Ваша страна' setInputValue={setCity} disabled />
            </TD>
            <TD>
              <div>
                <Label>
                  Безопасная сделка
                </Label>
              </div>
              <Checkbox
                checked={secure}
                color="primary"
                onChange={(e) => {
                  setSecure(e.target.checked);
                  if (!e.target.checked) {
                    setMailDelivery(false);
                  }
                }}
              />
            </TD>
          </tr>
          <tr>
            <td colSpan={2}>
              <Textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder='Комментарий' />
            </td>
          </tr>
        </tbody>
      </table>

      <SubmitButton onClick={onAddItemClick}>
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

const StyledSelect = styled(Select)`
  && {
    width: 100%;

    color: ${({ theme }) => theme.colors.textColor};

    &:before {
      border-color: ${({ theme }) => theme.colors.secondaryBackground};
    }

    &:after {
      border-color: ${({ theme }) => theme.colors.secondaryBackground};
    }

    svg {
      fill: ${({ theme }) => theme.colors.secondaryBackground};
    }
  }
`;

const Label = styled.div`
  font-size: 18px;
  margin-bottom: 5px;
  // color: #394974;
  color: ${({ theme }) => theme.colors.secondaryColor};
  -webkit-transition: all 350ms;
  transition: all 350ms;
`;

const TD = styled.td`
  padding-top: 20px;
  padding-bottom: 20px;

  :not(:first-child) {
    padding-left: 26px;
  }

  :not(:last-child) {
    padding-right: 26px;
  }
`;

const P = styled.p`
  margin-top: 30px;
  font-size: 1.5rem;
`;

const Size = styled.span`
  color: gray;
`;

const Textarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  height: 80px;
  background: transparent;
  color: white;
  border-color: #394974;
  border-width: 2px;
  padding: 10px 20px;
  resize: none;
`;
