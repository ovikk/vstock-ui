import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIconInit from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import AutoComplete from 'scenes/Inventory/AddSneaker/AutoComplete';
import moment from 'moment';
import Api from 'Api';
import {
  fetchOwnInventoryItems,
  fetchOwnSoldInventoryItems,
} from './inventoryActions';
import { showSnackbar } from 'components/Snackbar/snackbarActions';
import Spinner from 'components/Spinner';
import { DatePicker } from '@material-ui/pickers';
import { currencies, isItemPublicSelections, sizes } from 'Util.js';

const SellSneakerModal = ({ onClose, data }) => {
  const { ownInventoryId } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();

  const [sneakerData, setSneakerData] = useState(data);

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

  const renderDatePicker = (gridArea, title, dataKey) => {
    return (
      <MainInfoInputWrapper gridArea={gridArea}>
        <MainInfoInputTitle>{title}</MainInfoInputTitle>
        <CustomDatePicker
          format="DD/MM/yyyy"
          value={sneakerData[dataKey]}
          onChange={(date) => {
            const newData = { ...sneakerData };
            newData[dataKey] = date;
            setSneakerData(newData);
          }}
        />
      </MainInfoInputWrapper>
    );
  };

  const onAddItemClick = async () => {
    const { sell_price, sell_date, sell_source } = sneakerData;
    const data = {
      inventory_id: ownInventoryId,
      sell_price: sell_price !== '' ? parseFloat(sneakerData.sell_price) : 0,
      sell_date: moment(sell_date).toISOString(),
      sell_source: sell_source,
      currency: 'RUB',
      status: 1,
    };

    let response;

    response = await Api.editItem({ ...data, id: sneakerData.id });

    if (!response.error) {
      dispatch(fetchOwnInventoryItems());
      dispatch(fetchOwnSoldInventoryItems());
      dispatch(showSnackbar('Предмет перемещен в Продано'));
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
          <TitleText>
            {sneakerData.name} {sneakerData.size_title}
          </TitleText>
          <IconButton
            style={{ height: '100%' }}
            component="span"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </TopTitleWrapper>

        <MainInfoWrapper>
          <MainInfoInputsWrapper>
            {renderMainSelect('a', 'Валюта', 'currency', ['RUB'])}
            {renderMainInput('b', 'Цена продажи', 'sell_price', true)}
            {renderDatePicker('c', 'Дата продажи', 'sell_date')}
            {renderMainInput('d', 'Покупатель', 'sell_source')}
          </MainInfoInputsWrapper>
        </MainInfoWrapper>

        <AddButton disabled={!sneakerData.sell_price} onClick={onAddItemClick}>
          Продано
        </AddButton>
      </MainWrapper>
    </Dialog>
  );
};

export default SellSneakerModal;

const MainWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.modalBackground};
  width: 550px;
  height: 350px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px 30px 0px 30px;
`;

const MainInfoWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const MainInfoInputsWrapper = styled.div`
  flex: 6;
  display: grid;
  grid-template:
    'a b c' auto
    'd d d' auto / 1fr 1fr 1fr;
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
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleText = styled.span`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.textColor};
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

const CustomDatePicker = styled(DatePicker)`
  && {
    color: ${({ theme }) => theme.colors.textColor};
  }
`;
