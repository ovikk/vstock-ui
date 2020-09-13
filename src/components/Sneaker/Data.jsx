import React from 'react'
import styled from 'styled-components'

export const DataSection = styled.div`
  width: 180px;
  display: flex;
`;

export const DataTitle = styled.span`
  color: ${({ theme }) => theme.colors.secondaryColor};
  font-size: 18px;
  margin-right: 10px;
`;

export const DataText = styled.span`
  color: ${({ theme }) => theme.colors.textColor};
  font-size: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const MarketIcon = styled.img`
  width: auto;
  height: 80%;
  min-width: 100px;
  margin-right: 50px;
`;

export const Data = ({ icon, title, value, children }) => (
  <DataSection>
    {!!icon && <MarketIcon src={icon} />}
    <DataTitle>{title}</DataTitle>
    <DataText>{value}</DataText>
    {!!children && children}
  </DataSection>
)
