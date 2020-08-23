import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import CloseIconInit from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import AutoComplete from 'scenes/Inventory/AddSneaker/AutoComplete';
import Api from 'Api';
import { fetchOwnInventoryItems } from '../inventoryActions';
import { showSnackbar } from 'components/Snackbar/snackbarActions';
import Spinner from 'components/Spinner';
import { currencies, isItemPublicSelections, sizes } from 'Util.js';

const initSneakerData = {
  image_url: '',
  style_id: '',
  colorway: '',
  brand_name: '',
  buy_price: '',
  sell_price: '',
  currency: currencies[0],
  is_item_public: isItemPublicSelections[0],
};

const AddSneakerModal = ({ showModal, onClose, isEdit, editSneakerData }) => {
  console.log({ editSneakerData });
  const [sneakerData, setSneakerData] = useState(
    isEdit ? { ...editSneakerData } : { ...initSneakerData }
  );
  const [itemName, setItemName] = useState(isEdit ? editSneakerData.name : '');
  const [sizeValue, setSizeValue] = useState(
    isEdit ? editSneakerData.size_id : -1
  );
  const [sizeChart, setSizeChart] = useState(undefined);
  const [sizeChartLoading, setSizeChartLoading] = useState(false);

  const { ownInventoryId } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sneakerData.style_id) {
      const getCharts = async () => {
        setSizeChartLoading(true);
        const request = await Api.getItemSizeChartByStyleId(
          sneakerData.style_id
        );
        if (!request.error) {
          setSizeChart(request.data ? request.data : []);
        }
        setSizeChartLoading(false);

        console.log({ request });
      };
      getCharts();
    }
  }, [sneakerData.style_id]);

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

  const rednerSizeChart = (gridArea) => {
    console.log({ sizeChart, sizeValue });
    return (
      <MainInfoInputWrapper gridArea={gridArea}>
        <MainInfoInputTitle>Размер</MainInfoInputTitle>
        {sizeChartLoading ? (
          <Spinner size={25} />
        ) : sizeChart === undefined ? (
          <SizePlaceholder>Введите артикул для сетки размеров</SizePlaceholder>
        ) : sizeChart.length === 0 ? (
          <SizePlaceholder>Нет размерной сетки</SizePlaceholder>
        ) : (
          <MainSelect
            style={{ width: '70%' }}
            value={sizeValue}
            onChange={(e) => {
              setSizeValue(e.target.value);
            }}
          >
            <MenuItem value={-1} disabled>
              Выберите размер
            </MenuItem>

            {sizeChart.map((d, i) => (
              <MenuItem value={d.id} key={i}>
                {d.title}
              </MenuItem>
            ))}
          </MainSelect>
        )}
      </MainInfoInputWrapper>
    );
  };

  const setSneakerDataFromAutoComplete = async (data) => {
    const {
      brand_name,
      colorway,
      style_id,
      image_url,
      retail_price,
      chart,
    } = data;

    setSneakerData((data) => ({
      ...data,
      brand_name,
      colorway,
      style_id,
      image_url,
      buy_price: retail_price,
      currency: currencies[1],
      name: itemName,
    }));
  };

  const onAddItemClick = async () => {
    const data = {
      inventory_id: ownInventoryId,
      ...sneakerData,
      name: itemName,
      buy_price:
        sneakerData.buy_price !== '' ? parseFloat(sneakerData.buy_price) : 0,
      sell_price:
        sneakerData.sell_price !== '' ? parseFloat(sneakerData.sell_price) : 0,
      is_item_public: sneakerData.is_item_public === isItemPublicSelections[0],
      size_id: sizeValue,
    };

    let response;

    if (isEdit) {
      response = await Api.editItem({ ...data, id: sneakerData.id });
    } else {
      response = await Api.addItemToInventory(data);
    }

    if (!response.error) {
      dispatch(fetchOwnInventoryItems());
      setSneakerData({ ...initSneakerData });
      dispatch(showSnackbar(isEdit ? 'Предмет обновлен' : 'Предмет добавлен'));
      onClose();
    }
  };

  return (
    <Dialog
      onClose={onClose}
      open={showModal}
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
            {sneakerData.image_url && (
              <SneakerImage src={sneakerData.image_url} />
            )}
          </ImageWrapper>

          <MainInfoInputsWrapper>
            {renderMainInput('a', 'Артикул', 'style_id')}
            {renderMainInput('b', 'Цвет', 'colorway')}
            {renderMainInput('c', 'Цена покупки', 'buy_price', true)}
            {renderMainInput('d', 'Цена продажи', 'sell_price', true)}
            {renderMainSelect('e', 'Валюта', 'currency', currencies)}
            {renderMainInput('f', 'Бренд', 'brand_name')}
            {rednerSizeChart('g')}
            {renderMainSelect(
              'h',
              'Приватность',
              'is_item_public',
              isItemPublicSelections
            )}
          </MainInfoInputsWrapper>
        </MainInfoWrapper>
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
  height: 800px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px 30px 0px 30px;
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
  flex: 6;
  height: 100%;
  display: grid;
  grid-template:
    'a b b' auto
    'c d e' auto
    'f g g'
    'h h .' auto / 1fr 1fr 1fr;
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

const SizePlaceholder = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textColor};
`;

const CloseIcon = styled(CloseIconInit)`
  && {
    color: ${({ theme }) => theme.colors.nonFocusedTextColor};
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
