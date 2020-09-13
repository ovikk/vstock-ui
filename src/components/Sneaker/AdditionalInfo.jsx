import React from 'react'
import styled from 'styled-components';

import moment from 'moment'

import stockXIcon from 'assets/stockX_icon.svg';
import goatIcon from 'assets/goat_icon.svg';
import outOfStockIcon from 'assets/outOfStock_icon.svg';

import { MarketPrice } from './MarketPrice';
import { DataText, DataTitle } from './Data';

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 20px;
`;


const BottomDataSection = styled.div`
  margin: 5px 0px;
  height: 25 px;
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: auto;
  height: 80%;
  min-width: 100px;
  margin-right: 50px;
`;

export const AdditionalInfo = ({
  vendorCode, // Артикул
  releaseDate,
  prices
}) => {
  return (
    <Wrapper>
      <BottomDataSection>
        <DataTitle>Артикул</DataTitle>
        <DataText>{vendorCode}</DataText>
      </BottomDataSection>

      <BottomDataSection>
        <Icon src={stockXIcon} />
        <MarketPrice prices={prices} marketKey='stockx' />
      </BottomDataSection>

      <BottomDataSection>
        <Icon src={outOfStockIcon} />
        <MarketPrice prices={prices} marketKey='oos' />
      </BottomDataSection>

      <BottomDataSection>
        <DataTitle>Дата Выхода</DataTitle>
        <DataText>
          {moment(releaseDate).format('L')}
        </DataText>
      </BottomDataSection>

      <BottomDataSection>
        <Icon src={goatIcon} />
        <MarketPrice prices={prices} marketKey='goat' />
      </BottomDataSection>
    </Wrapper>
  )
}
