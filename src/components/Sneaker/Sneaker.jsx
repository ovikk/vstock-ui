import React, { useState, useEffect } from 'react';

import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowDown from '@material-ui/icons/ExpandMore';
import ArrowUp from '@material-ui/icons/ExpandLess';

import Api from 'Api';
import {
  ItemConstWrapper,
  ItemCost,
  ItemImage,
  ItemImageWrapper,
  ItemMainInfoTop,
  ItemMainInfoWrapper,
  ItemName,
  ItemTopWrapper,
  ItemWrapper,
  Divider,
  ButtonsList,
  ItemButton,
  ItemControls,
  ItemProfit,
  DealerLogin,
  ItemMainInfoBottom,
  ItemBottomWrapper,
  ItemBottomDivider,
  ItemControlImageStyle,
  DividerIconStyle
} from './styled';
import { AdditionalInfo } from './AdditionalInfo.jsx';
import { Data } from './Data';

const renderCurrency = (currency) => {
  if (currency === 'USD') return ' $';
  return ' ₽';
};

export const Sneaker = ({ item, onEditClick, onSellClick, onPublish, onDelete, readOnly }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [prices, setPrices] = useState(undefined);

  const { product } = item;
  const isSold = item.status === 1;
  const profitAmount = item.price.sell_price - item.price.buy_price;

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

  const onEditClickHandle = React.useCallback(() => onEditClick(item), [onEditClick, item]);
  const onSellClickHandle = React.useCallback(() => onSellClick(item), [onSellClick, item]);
  const onPublishHandle = React.useCallback(() => onPublish(item), [onPublish, item]);
  const onDeleteHandle = React.useCallback(() => onDelete(item), [onDelete, item]);

  return (
    <ItemWrapper>
      <ItemTopWrapper>
        <ItemImageWrapper>
          <ItemImage
            src={product.image_url || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'}
          />
        </ItemImageWrapper>

        <ItemMainInfoWrapper>
          <ItemMainInfoTop>
            <ItemName>{item.name}</ItemName>
            {!readOnly && <ItemConstWrapper>
              <ItemCost>
                {isSold ? item.price.sell_price : item.price.buy_price}
                {renderCurrency(item.currency)}
              </ItemCost>
            </ItemConstWrapper>
            }
          </ItemMainInfoTop>
          <ItemMainInfoBottom>
            <Data title='Размер' value={item.size_title} />

            {!readOnly && <>
              {
                isSold
                  ? <Data title='Покупатель' value={item.sell_source || '-'} />
                  : <Data title='Источник' value={item.buy_source || '-'} />
              }
            </>}

            <Data title='Цвет' value={product.colorway} />

            {readOnly &&
              <Data>
                <DealerLogin>
                  @{item.user_login}
                </DealerLogin>
              </Data>
            }

            {isSold && !readOnly && (
              <ItemProfit profit={profitAmount}>
                {profitAmount > 0 && '+'}
                {profitAmount}
                {renderCurrency(item.currency)}
              </ItemProfit>
            )}
          </ItemMainInfoBottom>
        </ItemMainInfoWrapper>

        <ButtonsList>
          {(!isSold && !readOnly) && <>
            <ItemButton onClick={onSellClickHandle}>Продано</ItemButton>
            <ItemButton onClick={onPublishHandle}>Разместить</ItemButton>
          </>}
          {readOnly && <ItemButton>Связаться</ItemButton>}
        </ButtonsList>

        <ItemControls>
          {!readOnly && <>
            <Tooltip title="Удалить">
              <IconButton onClick={onDeleteHandle}>
                <CloseIcon style={ItemControlImageStyle} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Редактировать">
              <IconButton onClick={onEditClickHandle}>
                <EditIcon style={ItemControlImageStyle} />
              </IconButton>
            </Tooltip>
          </>}
        </ItemControls>
      </ItemTopWrapper>

      <ItemBottomWrapper>
        <ItemBottomDivider>
          {isExpanded && <Divider />}
          <IconButton
            onClick={() => setIsExpanded((d) => !d)}
            style={{ padding: 0 }}
          >
            {isExpanded
              ? <ArrowUp style={DividerIconStyle} />
              : <ArrowDown style={DividerIconStyle} />
            }
          </IconButton>
          {isExpanded && <Divider />}
        </ItemBottomDivider>

        {isExpanded && (
          <AdditionalInfo prices={prices} vendorCode={product.style_id} releaseDate={product.release_date} />
        )}
      </ItemBottomWrapper>
    </ItemWrapper >
  );
};
