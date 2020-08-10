import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import CloseIconInit from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import AutoComplete from 'scenes/Inventory/AutoComplete';
import Api from 'Api';
import { fetchOwnInventoryItems } from './inventoryActions';

import theme from 'theme';
import Sneaker from './Sneaker';

const currencies = ['USD', 'RUB'];

const AddSneakerModal = ({ showModal, onClose }) => {
  const [sneakerData, setSneakerData] = useState({
    image_url: '',
    style_id: '',
    colorway: '',
    brand: '',
    buy_price: '',
    sell_price: '',
    size: '',
    currency: 'USD',
  });

  const dispatch = useDispatch();

  const renderMainInput = (gridArea, title, dataKey, isNumber = false) => {
    return (
      <MainInfoInputWrapper gridArea={gridArea}>
        <MainInfoInputTitle>{title}</MainInfoInputTitle>
        <Input
          value={sneakerData[dataKey]}
          onChange={(e) => {
            const newData = { ...sneakerData };
            newData[dataKey] = e.target.value;
            setSneakerData(newData);
          }}
          placeholder="-"
          type={isNumber ? 'number' : 'text'}
        />
      </MainInfoInputWrapper>
    );
  };

  const rencerMainSelect = (gridArea, title, dataKey, selectData) => {
    return (
      <MainInfoInputWrapper gridArea={gridArea}>
        <MainInfoInputTitle>{title}</MainInfoInputTitle>
        <MainSelect
          value={sneakerData.currency}
          onChange={(e) => {
            const newData = { ...sneakerData };
            newData[dataKey] = e.target.value;
            setSneakerData(newData);
          }}
        >
          {selectData.map((d, i) => (
            <MenuItem value={d} key={i}>
              {d}
            </MenuItem>
          ))}
        </MainSelect>
      </MainInfoInputWrapper>
    );
  };

  const setSneakerDataFromAutoComplete = (data) => {
    console.log(data);

    const {
      brand,
      colorway,
      style_id,
      image_url,
      retail_price,
      make,
      name,
    } = data;

    setSneakerData((data) => ({
      ...data,
      brand,
      colorway,
      style_id,
      image_url,
      buy_price: retail_price,
      name: make + ' ' + name,
    }));
  };

  const onAddItemClick = async () => {
    const response = await Api.addItemToInventory({
      inventory_id: 1,
      ...sneakerData,
      buy_price:
        sneakerData.buy_price !== '' ? parseFloat(sneakerData.buy_price) : 0,
      sell_price:
        sneakerData.sell_price !== '' ? parseFloat(sneakerData.sell_price) : 0,
    });

    if (!response.error) {
      dispatch(fetchOwnInventoryItems())
      onClose()
    }
  };

  return (
    <Dialog onClose={onClose} open={showModal} maxWidth="lg">
      <MainWrapper>
        <TopTitleWrapper>
          <TitleText>Добавить Предмет</TitleText>
          <IconButton
            style={{ height: '100%' }}
            component="span"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </TopTitleWrapper>

        <AutoComplete
          getFunction={Api.getSneakersSuggestions}
          returnFunction={(data) => setSneakerDataFromAutoComplete(data)}
        />

        <MainInfoWrapper>
          <ImageWrapper>
            {sneakerData.image_url && (
              <SneakerImage src={sneakerData.image_url} />
            )}
          </ImageWrapper>

          <MainInfoInputsWrapper>
            {renderMainInput('a', 'Артикул', 'style_id')}
            {renderMainInput('b', 'Цвет', 'colorway')}
            {renderMainInput('c', 'Цена покупки', 'buy_price', true)}
            {renderMainInput('d', 'Цена продажи', 'sell_price', true)}
            {rencerMainSelect('e', 'Валюта', 'currency', currencies)}
            {renderMainInput('f', 'Бренд', 'brand')}
            {renderMainInput('g', 'Размер', 'size')}
          </MainInfoInputsWrapper>
        </MainInfoWrapper>
        <AddButton
          disabled={!sneakerData.style_id || !sneakerData.name}
          onClick={onAddItemClick}
        >
          Добавить
        </AddButton>
      </MainWrapper>
    </Dialog>
  );
};

export default AddSneakerModal;

const MainWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.modalBackground};
  width: 1000px;
  height: 800px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px 20px;
`;

const MainInfoWrapper = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
`;

const ImageWrapper = styled.div`
  flex: 4;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
  border-radius: 10px;
  margin-right: 100px;
`;

const SneakerImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 10px;
`;

const MainInfoInputsWrapper = styled.div`
  flex: 5;
  height: 100%;
  display: grid;
  grid-template:
    'a b b' auto
    'c d e' auto
    'f g .' auto / 1fr 1fr 1fr;
`;

const MainInfoInputWrapper = styled.div`
  box-sizing: border-box;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-area: ${({ gridArea }) => gridArea};
`;

const MainInfoInputTitle = styled.span`
  color: ${({ theme }) => theme.colors.nonFocusedTextColor};
  font-size: 16px;
`;

const Input = styled.input`
  outline: none;
  background-color: inherit;
  font-family: ${({ theme }) => theme.font};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.textColor};
  /* height: 30px; */
  line-height: 30px;
  width: 100%;
  border: none;
  border-bottom: ${({ theme }) =>
    `2px solid ${theme.colors.secondaryBackground}`};

  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

const MainSelect = styled(Select)`
  && {
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

const TopTitleWrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleText = styled.span`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.nonFocusedTextColor};
`;

const CloseIcon = styled(CloseIconInit)`
  && {
    color: ${({ theme }) => theme.colors.nonFocusedTextColor};
  }
`;

const AddButton = styled(Button)`
  && {
    margin-top: auto;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.approveColor};

    :hover {
      background-color: pink;
    }
  }
`;
