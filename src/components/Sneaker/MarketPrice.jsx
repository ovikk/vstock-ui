import React from 'react'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress';
import { currencySymbols } from 'Util.js';

export const MarketPrice = ({ prices, marketKey }) => {
  if (prices === undefined) {
    return <Spinner size={20} />;
  }

  if (prices[marketKey]) {
    return (
      <MarketPriceText>
        {prices[marketKey].ask
          ? `${prices[marketKey].ask} ${currencySymbols[prices[marketKey].currency]}`
          : 'N/A'
        }
        &nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp;
        {prices[marketKey].bid
          ? `${prices[marketKey].bid} ${currencySymbols[prices[marketKey].currency]}`
          : 'N/A'
        }
      </MarketPriceText>
    );
  }

  return (
    <MarketPriceText>
      N/A&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp;N/A
    </MarketPriceText>
  );
};

export const Spinner = styled(CircularProgress)`
  && {
    color: ${({ theme }) => theme.colors.approveColor};
  }
`;

export const MarketPriceText = styled.span`
  color: ${({ theme }) => theme.colors.approveColor};
  font-size: 18px;
`;
