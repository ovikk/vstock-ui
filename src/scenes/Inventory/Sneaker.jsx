import React from 'react';
import styled from 'styled-components';
import theme from 'theme'

const Sneaker = ({item}) => {


    const {sneaker} = item

  return (
    <ItemWrapper>
      <ItemTopWrapper>
        <ItemImage src={sneaker.image_url} />
        <ItemMainInfoWrapper>
          <ItemMainInfoTop>
            <ItemName>{sneaker.make}</ItemName>
            <ItemLink>Подробнее</ItemLink>
            <ItemCost>{item.sell_price}$</ItemCost>
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
              <ItemMainInfoBottomText>{sneaker.colorway}</ItemMainInfoBottomText>
            </ItemMainInfoBottomSection>
          </ItemMainInfoBottom>
        </ItemMainInfoWrapper>

        <ItemButtonsWrapper>
          <ItemButton>Продано</ItemButton>
          <ItemButton>Разместить</ItemButton>
        </ItemButtonsWrapper>
      </ItemTopWrapper>
       {/* <ItemControls>control</ItemControls> */}
    </ItemWrapper>
  );
};

export default Sneaker;

const ItemWrapper = styled.div`
  width: 1000px;
  background-color: ${({ theme }) => theme.colors.lightBackground};
  border-radius: 10px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px 10px 10px 20px;
`;

const ItemTopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 120px;
`;
const ItemImage = styled.img`
  height: 90%;
  width: auto;
  margin-right: 10px;
`;
const ItemMainInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 75%;
  align-self: center;
  margin: 0px 20px;
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
`;

const ItemLink = styled.span`
  color: ${({ theme }) => theme.colors.mainColor};
  text-decoration: underline;
  cursor: pointer;
`;

const ItemCost = styled.span`
  color: ${({ theme }) => theme.colors.textColor};
  font-size: 30px;
  font-family: ${({ theme }) => theme.fontBold};
  margin-left: 50px;
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
  background-color: orange;
  height: 100%;
  width: 50px;
  margin: 0px 10px;
`;

const AddIconStyle = {
  height: '70%',
  width: 'auto',
  marginTop: '2px',
  color: theme.colors.approveColor,
};
