import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import theme from 'theme';

import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowDown from '@material-ui/icons/ExpandMore';
import ArrowUp from '@material-ui/icons/ExpandLess';
import CircularProgress from '@material-ui/core/CircularProgress';

import Api from 'Api';
import { fetchOwnInventoryItems } from './inventoryActions';

import stockXIcon from 'assets/stockX_icon.svg';
import goatIcon from 'assets/goat_icon.svg';
import outOfStockIcon from 'assets/outOfStock_icon.svg';

const ItemWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightBackground};
  border-radius: 10px;
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
const ItemImage = styled.img`
  height: 90%;
  width: 150px;
  margin-right: 10px;
`;
const ItemMainInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 75%;
  align-self: center;
  margin: 0px 20px;

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

const ItemMainInfoBottomSection = styled.div`
  width: 180px;
  display: flex;
`;

const ItemMainInfoBottomTitle = styled.span`
  color: ${({ theme }) => theme.colors.secondaryColor};
  font-size: 14px;
  margin-right: 10px;
`;

const ItemMainInfoBottomText = styled.span`
  color: ${({ theme }) => theme.colors.textColor};
  font-size: 14px;
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
  font-size: 14px;
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
  padding: 0px 50px;
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
  height: 25px;
  display: flex;
  align-items: center;
`;

const ItemBottomMarketIcon = styled.img`
  width: auto;
  height: 80%;
  min-width: 100px;
  margin-right: 50px;
`;

const SpinnerWrapper = styled.div`
  height: 50%;
`;

const Spinner = styled(CircularProgress)`
  && {
    color: ${({ theme }) => theme.colors.approveColor};
  }
`;

const Sneaker = ({ item, onEditClick }) => {
  const { sneaker } = item;

  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useDispatch();

  const renderCurrency = (currency) => {
    if (currency === 'USD') return '$';
    return '₽';
  };

  const onEditIconClick = () => {
    onEditClick(item);
  };

  const onDeleteIconClick = () => {
    setIsDeleteClicked(true);

    setTimeout(async () => {
      const response = await Api.deleteItem(item.id);

      console.log('DELETE', response);

      if (!response.error) {
        dispatch(fetchOwnInventoryItems());
      }
    }, 600);
  };

  console.log(item);

  return (
    <ItemWrapper isDeleteClicked={isDeleteClicked}>
      <ItemTopWrapper>
        <ItemImage
          src={
            sneaker.image_url ||
            'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
          }
        />
        <ItemMainInfoWrapper>
          <ItemMainInfoTop>
            <ItemName>{item.name}</ItemName>
            <ItemLink>Подробнее</ItemLink>
            <ItemConstWrapper>
              <ItemCost>
                {item.buy_price}
                {renderCurrency(item.currency)}
              </ItemCost>
            </ItemConstWrapper>
          </ItemMainInfoTop>
          <ItemMainInfoBottom>
            <ItemMainInfoBottomSection>
              <ItemMainInfoBottomTitle>Размер</ItemMainInfoBottomTitle>
              <ItemMainInfoBottomText>{item.size}</ItemMainInfoBottomText>
            </ItemMainInfoBottomSection>

            <ItemMainInfoBottomSection>
              <ItemMainInfoBottomTitle>Источник</ItemMainInfoBottomTitle>
              <ItemMainInfoBottomText>{sneaker.brand}</ItemMainInfoBottomText>
            </ItemMainInfoBottomSection>

            <ItemMainInfoBottomSection>
              <ItemMainInfoBottomTitle>Цвет</ItemMainInfoBottomTitle>
              <ItemMainInfoBottomText>
                {sneaker.colorway}
              </ItemMainInfoBottomText>
            </ItemMainInfoBottomSection>
          </ItemMainInfoBottom>
        </ItemMainInfoWrapper>

        <ItemButtonsWrapper>
          <ItemButton>Продано</ItemButton>
          <ItemButton>Разместить</ItemButton>
        </ItemButtonsWrapper>

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
                {sneaker.style_id}
              </ItemMainInfoBottomText>
            </ItemBottomInfoSection>

            <ItemBottomInfoSection>
              <ItemBottomMarketIcon src={stockXIcon} />
              <Spinner size={20} />
            </ItemBottomInfoSection>

            <ItemBottomInfoSection>
              <ItemBottomMarketIcon src={outOfStockIcon} />
              <Spinner size={20} />
            </ItemBottomInfoSection>

            <ItemBottomInfoSection>
              <ItemMainInfoBottomTitle>Дата Выхода</ItemMainInfoBottomTitle>
              <ItemMainInfoBottomText>
                {sneaker.release_date}
              </ItemMainInfoBottomText>
            </ItemBottomInfoSection>

            <ItemBottomInfoSection>
              <ItemBottomMarketIcon src={goatIcon} />
              <Spinner size={20} />
            </ItemBottomInfoSection>
          </ItemBottomInfoWrapper>
        )}
      </ItemBottomWrapper>
    </ItemWrapper>
  );
};

export default Sneaker;
