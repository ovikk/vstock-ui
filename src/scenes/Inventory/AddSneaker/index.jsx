import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Api from 'Api';
import moment from 'moment';
import {
  fetchOwnInventoryItems,
  fetchOwnSoldInventoryItems,
} from '../inventoryActions';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIconInit from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { DatePicker } from '@material-ui/pickers';
import InputMask from 'react-input-mask';
import AutoComplete from 'scenes/Inventory/AddSneaker/AutoComplete';
import { showSnackbar } from 'components/Snackbar/snackbarActions';
import { currencies, isItemPublicSelections } from 'Util.js';
import SneakerPlaceholder from 'assets/sneaker_placeholder.svg';
import { SizeInput } from './SizeInput';
import { ImagesForm } from './ImagesForm';

const initSneakerData = {
  image_url: '',
  style_id: '',
  colorway: '',
  brand: '',
  buy_price: '',
  sell_price: '',
  sell_source: '',
  currency: 'RUB',
  is_item_public: isItemPublicSelections[0],
  status: false,
  buy_date: new Date(),
  sell_date: new Date(),
  comment: '',
  buy_source: '',
};

const sortSizes = (sizes) => [...sizes].sort((a, b) => {
  if (a.us * 1 > b.us * 1) return 1;
  if (a.us * 1 < b.us * 1) return -1;
  return 0;
})

const AddSneakerModal = ({ onClose, isEdit, editSneakerData }) => {
  const [sneakerData, setSneakerData] = useState(
    isEdit ? { ...editSneakerData, buy_date: moment(editSneakerData.buy_date) } : { ...initSneakerData }
  );
  const [itemName, setItemName] = useState(isEdit ? editSneakerData.name : '');
  const [sizeValue, setSizeValue] = useState(isEdit ? editSneakerData.size_id : -1);
  const [sizeChart, setSizeChart] = useState(isEdit ? sortSizes(editSneakerData.sizes) : undefined);
  const [images, setImages] = React.useState(isEdit ? [...editSneakerData.gallery] : []);

  const { ownInventoryId } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();

  const renderMainInput = (gridArea, title, dataKey, isNumber = false, disabled = false) => {
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
          placeholder={title}
          type={isNumber ? 'number' : 'text'}
          disabled={disabled}
        />
      </MainInfoInputWrapper>
    );
  };

  const renderMainSelect = (gridArea, title, dataKey, selectData) => {
    return (
      <MainInfoInputWrapper gridArea={gridArea}>
        <MainInfoInputTitle>{title}</MainInfoInputTitle>
        <MainSelect
          value={sneakerData[dataKey]}
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

  const renderCheckMark = (gridArea, title, dataKey) => {
    return (
      <MainInfoInputWrapper gridArea={gridArea}>
        <MainInfoInputTitle>{title}</MainInfoInputTitle>

        <Checkbox
          checked={sneakerData[dataKey]}
          color="primary"
          onChange={(e) => {
            const newData = { ...sneakerData };
            newData[dataKey] = e.target.checked;
            setSneakerData(newData);
          }}
        />
      </MainInfoInputWrapper>
    );
  };

  const renderDatePicker = (gridArea, title, dataKey) => {
    return (
      <MainInfoInputWrapper gridArea={gridArea}>
        <MainInfoInputTitle>{title}</MainInfoInputTitle>
        <DateInput
          value={(typeof sneakerData[dataKey] !== 'string') ? moment(sneakerData[dataKey]).format("DD/MM/YYYY") : sneakerData[dataKey]}
          onChange={(date) => {
            const newData = { ...sneakerData };
            if (!date.target.value.includes("_")) {
              newData[dataKey] = moment(date.target.value, "DD/MM/YYYY")
            }
            else {
              newData[dataKey] = date.target.value;
            }
            setSneakerData(newData);
          }}
        />
      </MainInfoInputWrapper>
    );
  };

  const rednerSizeChart = (gridArea) => {
    return (
      <MainInfoInputWrapper gridArea={gridArea}>
        <SizeInput sizes={sizeChart} placeholder='Размер US' initialSelected={sizeValue} onSelect={setSizeValue} />
      </MainInfoInputWrapper>
    );
  };

  const setSneakerDataFromAutoComplete = async (data) => {
    const { brand_name, colorway, style_id, image_url, retail_price, sizes } = data;
    setSneakerData((data) => ({
      ...data,
      brand: brand_name,
      colorway,
      style_id,
      image_url,
      buy_price: retail_price,
      currency: 'RUB',
      name: itemName,
    }));
    setSizeChart(sizes ? sortSizes(sizes) : []);
  };

  const onAddItemClick = async () => {
    const {
      style_id,
      is_item_public,
      brand,
      sell_price,
      buy_price,
      currency,
      status,
      buy_date,
      sell_date,
      sell_source,
      buy_source,
      comment,
      gallery: oldGallery
    } = sneakerData;

    console.log({ sizeChart, sizeValue });

    for (let i = 0; i < (oldGallery || []).length; i++) {
      const image = oldGallery[i];
      let wasDeleted = true;
      for (let j = 0; j < images.length && wasDeleted; j++) {
        const newImage = images[j];
        if (image.id === newImage.id) {
          wasDeleted = false;
        }
      }

      if (wasDeleted) {
        // TODO: вынести в отдельный файл апи
        fetch('https://api.trackstock.io/api/v1/item/images/delete', {
          method: 'POST',
          body: JSON.stringify({
            "id": sneakerData.id,
            "gallery": [
              {
                "id": image.id
              }
            ]
          }),
          credentials: 'include',
        });
      }
    }

    const formData = new FormData();
    let hasNewFiles = false;

    for (let i = 0; i < images.length; ++i) {
      if (!images[i].id) {
        formData.append('images', images[i].file);
        hasNewFiles = true;
      }
    }

    let tempGallery = [];
    if (hasNewFiles) {
      // TODO: вынести в отдельный файл апи
      const response = await fetch('https://api.trackstock.io/api/v1/item/images', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const data = await response.json();
      if (data.data) { tempGallery = data.data; }
    }
    const newGallery = [];
    let tempGalleryIndex = 0;
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (!!image.id) { newGallery.push(image); }
      else { newGallery.push(tempGallery[tempGalleryIndex++]); }
    }


    const data = {
      inventory_id: ownInventoryId,
      style_id,
      is_item_public: is_item_public === isItemPublicSelections[0],
      name: itemName,
      brand,
      sell_price: sell_price !== '' ? parseFloat(sell_price) : 0,
      buy_price: buy_price !== '' ? parseFloat(buy_price) : 0,
      currency,
      size_title: sizeChart.find((s) => s.id === sizeValue).title,
      size_id: sizeValue,
      status: status ? 1 : 0,
      buy_date: moment(buy_date).toISOString(),
      sell_date: moment(sell_date).toISOString(),
      sell_source,
      buy_source,
      comment,
      gallery: newGallery,
    };

    let response;

    if (isEdit) {
      response = await Api.editItem({ ...data, id: sneakerData.id });
    } else {
      response = await Api.addItemToInventory(data);
    }

    if (!response.error) {
      dispatch(fetchOwnInventoryItems());
      dispatch(fetchOwnSoldInventoryItems());
      setSneakerData({ ...initSneakerData });
      dispatch(showSnackbar(isEdit ? 'Предмет обновлен' : 'Предмет добавлен'));
      onClose();
    }
  };

  return (
    <Dialog
      onClose={onClose}
      open={true}
      maxWidth="lg"
      PaperProps={{
        style: { borderRadius: 25 },
      }}
    >
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
          inputValue={itemName}
          setInputValue={setItemName}
          isEdit={isEdit}
        />

        <MainInfoWrapper>
          <ImageWrapper>
            {sneakerData.image_url ? (
              <SneakerImage src={sneakerData.image_url} />
            ) : (
                <SneakerImage src={SneakerPlaceholder} />
              )}
          </ImageWrapper>

          <ImagesForm values={images || []} onChange={setImages} />

          <MainInfoInputsWrapper>
            {renderMainInput('a', 'Артикул', 'style_id', false, true)}
            {renderMainInput('b', 'Цвет', 'colorway', false, true)}

            {renderMainInput('c', 'Цена покупки', 'buy_price', true)}
            {renderMainSelect('d', 'Валюта', 'currency', ['RUB'])}

            {rednerSizeChart('e')}
            {renderMainInput('f', 'Бренд', 'brand', false, true)}
            {renderDatePicker('g', 'Дата покупки', 'buy_date')}

            {renderCheckMark('h', 'Товар Продан', 'status')}

            {sneakerData.status &&
              renderMainInput('i', 'Цена продажи', 'sell_price', true)}
            {sneakerData.status &&
              renderDatePicker('j', 'Дата продажи', 'sell_date')}

            {sneakerData.status &&
              renderMainInput('k', 'Покупатель', 'sell_source')}

            {/* {renderMainSelect(
              'k',
              'Приватность',
              'is_item_public',
              isItemPublicSelections
            )} */}
          </MainInfoInputsWrapper>
        </MainInfoWrapper>

        <AdditionalInfoInputWrapper>
          {renderMainInput('a', 'Комментарий', 'comment')}
          {renderMainInput('b', 'Источник', 'buy_source')}
        </AdditionalInfoInputWrapper>

        <AddButton
          disabled={
            !sneakerData.style_id || itemName.length < 2 || sizeValue === -1
          }
          onClick={onAddItemClick}
        >
          {isEdit ? 'Редактировать' : 'Добавить'}
        </AddButton>
      </MainWrapper>
    </Dialog>
  );
};

export default AddSneakerModal;

const MainWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.modalBackground};
  width: 1000px;
  height: 820px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px 30px 0px 30px;
`;

const MainInfoWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const ImageWrapper = styled.div`
  width: 400px;
  height: 390px;
  background-color: ${({ theme }) => theme.colors.darkBackground};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SneakerImage = styled.img`
  height: auto;
  width: 90%;
  border-radius: 10px;
`;

const AddPhotoWrapper = styled.div`
  height: 390px;
  width: 100px;
  margin: 0px 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const DeleteCustomImage = styled.div`
  cursor: pointer;
  position: absolute;
  height: 25px;
  width: 25px;
  top: 0;
  right: 0;
`;

const CustomImageWrapper = styled.div`
  height: 100px;
  margin-bottom: 10px;
  width: 100%;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.darkBackground};
  position: relative;
`;

const CustomSneakerImagePlaceholder = styled.img`
  height: auto;
  width: 100%;
  transform: rotate(30deg);
`;

const CustomSneakerImage = styled.img`
  height: 90%;
  width: auto;
  max-width: 90%;
`;

const CameraWrapper = styled.div`
  height: 100px;
  width: 100%;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CameraIcon = styled.img`
  height: auto;
  width: 60%;
`;

const MainInfoInputsWrapper = styled.div`
  width: 500px;
  display: grid;
  grid-template:
    'a b b' auto
    'c d d' auto
    'e f g' auto
    'h i j'
    'k k .' auto / 1fr 1fr 1fr;
`;

const AdditionalInfoInputWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template:
    'a a a a a' auto
    'b b c . .' auto / 1fr 1fr 1fr 1fr 1fr;
`;

const MainInfoInputWrapper = styled.div`
  box-sizing: border-box;
  padding: 15px 40px 15px 0px;
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

  ::placeholder {
    font-size: 1rem;
    color: #8a8e98;
  }
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

const RemoveImageIcon = styled(CloseIconInit)`
  && {
    color: ${({ theme }) => theme.colors.textColor};
  }
`;

const AddButton = styled(Button)`
  && {
    margin-top: auto;
    width: calc(100% + 60px);
    margin-left: -30px;
    height: 60px;
    font-size: 16px;

    background-color: ${({ theme }) => theme.colors.approveColor};

    :hover {
      background-color: pink;
    }
  }
`;

const CustomDatePicker = styled(DatePicker)`
  && {
    color: ${({ theme }) => theme.colors.textColor};
  }
`;

const DateInput = (props) => (
  <InputMask mask="99/99/9999" value={props.value} onChange={props.onChange} maskChar="_">
    {(inputProps) => <Input {...inputProps} type="text" placeholder='ДД/ММ/ГГГГ' />}
  </InputMask>
)
