import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import theme from 'theme';

import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowDown from '@material-ui/icons/ExpandMore';
import ArrowUp from '@material-ui/icons/ExpandLess';
import CircularProgress from '@material-ui/core/CircularProgress';

import Api from 'Api';
import {
  fetchOwnInventoryItems,
  fetchOwnSoldInventoryItems,
} from './inventoryActions';
import { showSnackbar } from 'components/Snackbar/snackbarActions';

import stockXIcon from 'assets/stockX_icon.svg';
import goatIcon from 'assets/goat_icon.svg';
import outOfStockIcon from 'assets/outOfStock_icon.svg';

import { currencySymbols } from 'Util.js';

const Sneaker = ({ item, onEditClick, onSellClick }) => {
  const { product } = item;

  const isSold = item.status === 1;

  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const profitAmount = item.sell_price - item.buy_price;

  const [prices, setPrices] = useState(undefined);

  useEffect(() => {
    const handleRequest = async () => {
      const response = await Api.getItemPrice(item.id);
      if (!response.error) {
        setPrices(response.data);
      } else {
        setPrices({});
      }
    };

    if (isExpanded && prices === undefined) {
      handleRequest();
    }
  }, [isExpanded]);

  const dispatch = useDispatch();

  const renderCurrency = (currency) => {
    if (currency === 'USD') return ' $';
    return ' ₽';
  };

  const onEditIconClick = () => {
    onEditClick(item);
  };

  const onDeleteIconClick = () => {
    setIsDeleteClicked(true);
    setTimeout(async () => {
      const response = await Api.deleteItem(item.id);
      if (!response.error) {
        dispatch(fetchOwnInventoryItems());
        dispatch(fetchOwnSoldInventoryItems());
      }
      dispatch(showSnackbar('Предмет удален'));
    }, 600);
  };

  const renderMarketPrice = (marketKey) => {
    if (prices === undefined) {
      return <Spinner size={20} />;
    }

    if (prices[marketKey]) {
      return (
        <ItemMarketPriceText>
          {prices[marketKey].ask
            ? `${prices[marketKey].ask} ${
                currencySymbols[prices[marketKey].currency]
              }`
            : 'N/A'}
          &nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp;
          {prices[marketKey].bid
            ? `${prices[marketKey].bid} ${
                currencySymbols[prices[marketKey].currency]
              }`
            : 'N/A'}
        </ItemMarketPriceText>
      );
    }

    return (
      <ItemMarketPriceText>
        N/A&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp;N/A
      </ItemMarketPriceText>
    );
  };

  return (
    <ItemWrapper isDeleteClicked={isDeleteClicked}>
      <ItemTopWrapper>
        <ItemImageWrapper>
          <ItemImage
            src={
              product.image_url ||
              'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
            }
          />
        </ItemImageWrapper>

        <ItemMainInfoWrapper>
          <ItemMainInfoTop>
            <ItemName>{item.name}</ItemName>
            <ItemConstWrapper>
              <ItemCost>
                {isSold ? item.sell_price : item.buy_price}
                {renderCurrency(item.currency)}
              </ItemCost>
            </ItemConstWrapper>
          </ItemMainInfoTop>
          <ItemMainInfoBottom>
            <ItemMainInfoBottomSection>
              <ItemMainInfoBottomTitle>Размер</ItemMainInfoBottomTitle>
              <ItemMainInfoBottomText>{item.size_title}</ItemMainInfoBottomText>
            </ItemMainInfoBottomSection>

            {isSold ? (
              <ItemMainInfoBottomSection>
                <ItemMainInfoBottomTitle>Покупатель</ItemMainInfoBottomTitle>
                <ItemMainInfoBottomText>
                  {item.sell_source || '-'}
                </ItemMainInfoBottomText>
              </ItemMainInfoBottomSection>
            ) : (
              <ItemMainInfoBottomSection>
                <ItemMainInfoBottomTitle>Источник</ItemMainInfoBottomTitle>
                <ItemMainInfoBottomText>
                  {item.buy_source || '-'}
                </ItemMainInfoBottomText>
              </ItemMainInfoBottomSection>
            )}

            <ItemMainInfoBottomSection>
              <ItemMainInfoBottomTitle>Цвет</ItemMainInfoBottomTitle>
              <ItemMainInfoBottomText>
                {product.colorway}
              </ItemMainInfoBottomText>
            </ItemMainInfoBottomSection>

            {isSold && (
              <ItemProfit profit={profitAmount}>
                {profitAmount > 0 && '+'}
                {profitAmount}
                {renderCurrency(item.currency)}
              </ItemProfit>
            )}
          </ItemMainInfoBottom>
        </ItemMainInfoWrapper>

        {!isSold && (
          <ItemButtonsWrapper>
            <ItemButton onClick={() => onSellClick(item)}>Продано</ItemButton>
            <ItemButton>Разместить</ItemButton>
          </ItemButtonsWrapper>
        )}

        <ItemControls>
          <Tooltip title="Удалить">
            <IconButton onClick={onDeleteIconClick}>
              <CloseIcon style={ItemControlImageStyle} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Редактировать">
            <IconButton onClick={onEditIconClick}>
              <EditIcon style={ItemControlImageStyle} />
            </IconButton>
          </Tooltip>
        </ItemControls>
      </ItemTopWrapper>

      <ItemBottomWrapper>
        <ItemBottomDivider>
          {isExpanded && <Divider />}
          <IconButton
            onClick={() => setIsExpanded((d) => !d)}
            style={{ padding: 0 }}
          >
            {isExpanded ? (
              <ArrowUp style={DividerIconStyle} />
            ) : (
              <ArrowDown style={DividerIconStyle} />
            )}
          </IconButton>
          {isExpanded && <Divider />}
        </ItemBottomDivider>

        {isExpanded && (
          <ItemBottomInfoWrapper>
            <ItemBottomInfoSection>
              <ItemMainInfoBottomTitle>Артикул</ItemMainInfoBottomTitle>
              <ItemMainInfoBottomText>
                {product.style_id}
              </ItemMainInfoBottomText>
            </ItemBottomInfoSection>

            <ItemBottomInfoSection>
              <ItemBottomMarketIcon src={stockXIcon} />
              {renderMarketPrice('stockx')}
            </ItemBottomInfoSection>

            <ItemBottomInfoSection>
              <ItemBottomMarketIcon src={outOfStockIcon} />
              {renderMarketPrice('oos')}
            </ItemBottomInfoSection>

            <ItemBottomInfoSection>
              <ItemMainInfoBottomTitle>Дата Выхода</ItemMainInfoBottomTitle>
              <ItemMainInfoBottomText>
                {moment(product.release_date).format('L')}
              </ItemMainInfoBottomText>
            </ItemBottomInfoSection>

            <ItemBottomInfoSection>
              <ItemBottomMarketIcon src={goatIcon} />
              {renderMarketPrice('goat')}
            </ItemBottomInfoSection>
          </ItemBottomInfoWrapper>
        )}
      </ItemBottomWrapper>
    </ItemWrapper>
  );
};

export default Sneaker;

const ItemWrapper = styled.div`
  width: 97%;
  background-color: ${({ theme }) => theme.colors.lightBackground};
  border-radius: 25px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px 10px 0px 20px;

  margin-left: ${({ isDeleteClicked }) => (isDeleteClicked ? '100%' : '0px')};

  transition: margin-left 600ms ease-in-out;
`;

const ItemTopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 120px;
`;

const ItemImageWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 150px;
  height: auto;
  margin-right: 10px;
`;

const ItemMainInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 75%;
  align-self: center;
  margin: 0px 20px;
  flex: 1;
  width: 70%;
`;
const ItemMainInfoTop = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  align-items: center;
`;

const ItemName = styled.span`
  font-family: ${({ theme }) => theme.fontBold};
  color: ${({ theme }) => theme.colors.textColor};
  font-size: 25px;
  margin-right: 30px;
  width: 70%;
`;

const ItemLink = styled.span`
  color: ${({ theme }) => theme.colors.mainColor};
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 20px;
`;

const ItemConstWrapper = styled.div`
  margin-left: auto;
  min-width: 100px;
  display: flex;
  justify-content: flex-end;
`;

const ItemCost = styled.span`
  color: ${({ theme }) => theme.colors.textColor};
  font-size: 30px;
  font-family: ${({ theme }) => theme.fontBold};
`;

const ItemMainInfoBottom = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  margin-top: 20px;
`;

const ItemProfit = styled.span`
  font-size: 24px;
  color: ${({ theme, profit }) =>
    profit > 0 ? theme.colors.approveColor : theme.colors.errorColor};
  margin-left: auto;
`;

const ItemMainInfoBottomSection = styled.div`
  width: 180px;
  display: flex;
`;

const ItemMainInfoBottomTitle = styled.span`
  color: ${({ theme }) => theme.colors.secondaryColor};
  font-size: 18px;
  margin-right: 10px;
`;

const ItemMainInfoBottomText = styled.span`
  color: ${({ theme }) => theme.colors.textColor};
  font-size: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const ItemButtonsWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ItemButton = styled.button`
  outline: none;
  border-radius: 40px;
  width: 200px;
  height: 40px;
  text-align: center; 
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.mainColor};
  /* background-color: ${({ theme }) => theme.colors.background}; */
  background-color: inherit;
  font-family: ${({ theme }) => theme.font};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textColor};
  transition: 250ms;
  margin-left: 20px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.textColor};
    box-shadow: ${({ theme }) =>
      `0 0.1em 0.1em -0.05em ${theme.colors.mainColor}`};
    transform: translateY(-0.25em);
  }
`;

const ItemControls = styled.div`
  height: 100%;
  width: 40px;
  margin: 0px 10px;
  box-sizing: border-box;
  padding: 15px 10px;
`;

const ItemControlImageStyle = {
  height: '20px',
  width: 'auto',
  color: theme.colors.nonFocusedTextColor,
};

const ItemBottomWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0px 150px;
`;

const ItemBottomDivider = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.div`
  flex: 1;
  height: 1px;
  border-bottom: ${({ theme }) => `2px solid ${theme.colors.secondaryColor}`};
  margin-bottom: 2px;
`;

const DividerIconStyle = {
  height: '40px',
  width: 'auto',
  color: theme.colors.nonFocusedTextColor,
};

const ItemBottomInfoWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 20px;
`;

const ItemBottomInfoSection = styled.div`
  margin: 5px 0px;
  height: 25 px;
  display: flex;
  align-items: center;
`;

const ItemBottomMarketIcon = styled.img`
  width: auto;
  height: 80%;
  min-width: 100px;
  margin-right: 50px;
`;

const ItemMarketPriceText = styled.span`
  color: ${({ theme }) => theme.colors.approveColor};
  font-size: 18px;
`;

const Spinner = styled(CircularProgress)`
  && {
    color: ${({ theme }) => theme.colors.approveColor};
  }
`;
