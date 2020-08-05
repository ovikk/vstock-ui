import React, { useState } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import CloseIconInit from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import AutoComplete from 'scenes/Inventory/AutoComplete';
import Api from 'Api';

import theme from 'theme';
import Sneaker from './Sneaker';

const testItems = [
  'YEEZY BOOST',
  'NIKE JORDAN',
  'LOL KEK',
  'NIKE JORDAN',
  'YEEZY BOOST',
];

const AddSneakerModal = ({ showModal, onClose }) => {
  const [sneakerData, setSneakerData] = useState({
    image_url: '',
    style_id: '',
    colorway: '',
    brand: '',
  });

  const renderMainInput = (gridArea, title, dataKey) => {
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
        />
      </MainInfoInputWrapper>
    );
  };

  console.log({ sneakerData });

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
          returnFunction={(e) => setSneakerData(e)}
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
            {renderMainInput('c', 'Цена покупки')}
            {renderMainInput('d', 'Цена доставки')}
            {renderMainInput('e', 'Валюта')}
            {renderMainInput('f', 'Бренд', 'brand')}
            {renderMainInput('g', 'Размер')}
          </MainInfoInputsWrapper>
        </MainInfoWrapper>
        <button
          style={{ marginTop: 'auto' }}
          disabled={!sneakerData.style_id || !sneakerData.name}
          onClick={async () => {
            await Api.addItemToInventory({
              inventory_id: 1,
              ...sneakerData,
            });
          }}
        >
          Добавить
        </button>
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
  /* margin-top: 20px; */
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
