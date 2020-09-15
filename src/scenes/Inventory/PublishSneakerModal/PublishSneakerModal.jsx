import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import CloseIconInit from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { DatePicker } from '@material-ui/pickers';

import { marketsConfig } from './config'
import Api from 'Api';

const PublishSneakerModal = ({ onClose, data }) => {
  const [selectedMarket, setSelectedMarket] = useState(undefined)
  const [item, setItem] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const SelectedMarketForm = (marketsConfig.find(x => x.name === selectedMarket) || {}).Component

  return (
    <Dialog
      onClose={onClose}
      open={true}
      maxWidth="lg"
      PaperProps={{
        style: { borderRadius: 25 },
      }}
    >
      <MainWrapper isExpanded={!!selectedMarket}>
        <TopTitleWrapper>
          <TitleText>
            Выберите площадку
          </TitleText>
          <IconButton
            style={{ height: '100%' }}
            component="span"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </TopTitleWrapper>

        <MarketPlacesList>
          {marketsConfig.map(market => (
            <MarketPlace onClick={() => {
              setSelectedMarket(market.name)
              setIsLoading(true)
              Api.getPreview(market.shortName, data.id).then((res) => {
                if (!!res.data) {
                  setItem(res.data)
                }
                setIsLoading(false)
              }).catch(() => {
                setIsLoading(false)
              })
            }} selected={selectedMarket === market.name} key={market.name}>
              {market.name}
            </MarketPlace>
          ))}
        </MarketPlacesList>

        {isLoading && <p>Загрузка</p>}
        {!isLoading && !!selectedMarket && !!item && <SelectedMarketForm item={item} />}

      </MainWrapper>
    </Dialog>
  );
};

export default PublishSneakerModal;

const MarketPlacesList = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MarketPlace = styled.button`
  width: 269px;
  height: 92px;

  border: 2px solid #56CCF2;
  box-sizing: border-box;
  border-radius: 25px;

  cursor: pointer;
  background: ${({ selected }) => selected ? 'linear-gradient(70.86deg, #56CCF2 -3.71%, #2D9CDB 98.31%)' : 'transparent'};

  font-size: 24px;
  line-height: 28px;

  color: #FFFFFF;
  outline: none;

  :not(:first-child) {
    margin-left: 8px; 
  }
  
  :not(:last-child) {
    margin-right: 8px; 
  }

  :hover {
    ${({ selected }) => !selected ? 'background: #202f54;' : ''}
  }
`;

const MainWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.modalBackground};
  width: 660px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px 30px;
  ${({ isExpanded }) => isExpanded && 'padding-bottom: 0px;'}
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

const CustomDatePicker = styled(DatePicker)`
  && {
    color: ${({ theme }) => theme.colors.textColor};
  }
`;
