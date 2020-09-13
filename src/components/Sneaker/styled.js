import styled from 'styled-components';
import theme from 'theme';

export const ItemWrapper = styled.div`
  width: 97%;
  background-color: ${({ theme }) => theme.colors.lightBackground};
  border-radius: 25px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px 10px 0px 20px;

  // margin-left: ${({ isDeleteClicked }) => (isDeleteClicked ? '100%' : '0px')};

  transition: margin-left 600ms ease-in-out;
`;

export const ItemTopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 120px;
`;

export const ItemImageWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

export const ItemImage = styled.img`
  width: 150px;
  height: auto;
  margin-right: 10px;
`;

export const ItemMainInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 75%;
  align-self: center;
  margin: 0px 20px;
  flex: 1;
  width: 70%;
`;
export const ItemMainInfoTop = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  align-items: center;
`;

export const ItemName = styled.span`
  font-family: ${({ theme }) => theme.fontBold};
  color: ${({ theme }) => theme.colors.textColor};
  font-size: 25px;
  margin-right: 30px;
  width: 70%;
`;

export const ItemLink = styled.span`
  color: ${({ theme }) => theme.colors.mainColor};
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 20px;
`;

export const ItemConstWrapper = styled.div`
  margin-left: auto;
  min-width: 100px;
  display: flex;
  justify-content: flex-end;
`;

export const ItemCost = styled.span`
  color: ${({ theme }) => theme.colors.textColor};
  font-size: 30px;
  font-family: ${({ theme }) => theme.fontBold};
`;

export const ItemMainInfoBottom = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  margin-top: 20px;
`;

export const ItemProfit = styled.span`
  font-size: 24px;
  color: ${({ theme, profit }) =>
    profit > 0 ? theme.colors.approveColor : theme.colors.errorColor};
  margin-left: auto;
`;

export const ButtonsList = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const ItemButton = styled.button`
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

export const ItemControls = styled.div`
  height: 100%;
  width: 40px;
  margin: 0px 10px;
  box-sizing: border-box;
  padding: 15px 10px;
`;

export const ItemControlImageStyle = {
  height: '20px',
  width: 'auto',
  color: theme.colors.nonFocusedTextColor,
};

export const ItemBottomWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0px 150px;
`;

export const ItemBottomDivider = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Divider = styled.div`
  flex: 1;
  height: 1px;
  border-bottom: ${({ theme }) => `2px solid ${theme.colors.secondaryColor}`};
  margin-bottom: 2px;
`;

export const DividerIconStyle = {
  height: '40px',
  width: 'auto',
  color: theme.colors.nonFocusedTextColor,
};

export const DealerLogin = styled.span`
  color: ${({ theme }) => theme.colors.mainColor};
  font-size: 18px;
  cursor: pointer;
  margin: 0px 20px;
`;
