import React from 'react';
import styled from 'styled-components';

import { currencySymbols } from 'Util.js';

const BestDeals = ({ bestDeals }) => {
  console.log(bestDeals);

  const renderSneaker = (sneaker) => {
    const { brand, name, style_id, size_title, product } = sneaker;

    return (
      <SneakerWrapper>
        <ImageWrapper>
          <Image src={sneaker.product.image_url} />
        </ImageWrapper>

        <MainInfoWrapper>
          <MainInfoBrand>{style_id}</MainInfoBrand>
          <MainInfoName>{name}</MainInfoName>
          <MainInfoBottom>
            <MainInfoColorway>{product.colorway}</MainInfoColorway>
            <MainInfoSize>{size_title}</MainInfoSize>
          </MainInfoBottom>
        </MainInfoWrapper>

        <PriceWrapper>
          +{sneaker.profit} {currencySymbols[sneaker.currency]}
        </PriceWrapper>
      </SneakerWrapper>
    );
  };

  return (
    <MainWrapper>
      {bestDeals.map((deal, i) => (
        <React.Fragment>
          {renderSneaker(deal)}

          {i !== bestDeals.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </MainWrapper>
  );
};

export default BestDeals;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Divider = styled.div`
  width: 1;
  height: 1px;
  margin: 10px 0px;
  padding: 0px 10px;
  border-bottom: ${({ theme }) => `2px solid rgba(57, 73, 116, 0.3)`};
`;

const SneakerWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  margin: 0px 10px;
`;

const ImageWrapper = styled.div`
  width: 180px;
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const Image = styled.img`
  width: 90%;
  height: auto;
`;

const MainInfoWrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MainInfoBrand = styled.div`
  height: 33%;
  width: 100%;
  color: ${({ theme }) => theme.colors.lighterBackground};
  font-size: 18px;
  display: flex;
  align-items: flex-end;
`;

const MainInfoName = styled.div`
  margin-top: 4px;
  width: 370px;
  height: 33%;
  color: ${({ theme }) => theme.colors.textColor};
  font-size: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MainInfoBottom = styled.div`
  height: 33%;
  width: 100%;
  color: ${({ theme }) => theme.colors.lighterBackground};
  font-size: 18px;
  display: flex;
  flex-flow: wrap;
`;

const MainInfoColorway = styled.div`
  flex: 1;
  margin-right: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MainInfoSize = styled.div`
  width: 70px;
`;

const PriceWrapper = styled.div`
  height: 100%;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${({ theme }) => theme.colors.approveColor};
`;
