import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import Api from 'Api.ts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from './accountActions';

import OutOfStockModal from './OutOfStockModal';

import styled from 'styled-components';
import outOfStockIcon from 'assets/outOfStock_logo.svg';
import theMarketIcon from 'assets/theMarket_logo.svg';
import DiscordIcon from 'assets/discord_logo.svg';
import Button from '@material-ui/core/Button';
import Input from 'components/InputRounded';

import { showSnackbar } from 'components/Snackbar/snackbarActions';

const Account = () => {
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.account);

  const [outOfStockOpen, setOutOfStockOpen] = useState(false);
  const [userCountry, setUserCountry] = useState('');
  const [userCity, setUserCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (userData === undefined) {
      dispatch(fetchUserData());
    } else {
      setUserCountry(get(userData, 'address.country'));
      setUserCity(get(userData, 'address.city'));
      setPhoneNumber(get(userData, 'phone'));
    }
  }, [userData]);

  if (userData === undefined) {
    return <span>loading</span>;
  }

  const email = get(userData, 'email');
  const fullName = `${get(userData, 'first_name')} ${get(
    userData,
    'second_name'
  )}`;

  const isOutOfStockActive = get(userData, 'market_statuses', []).some(
    (m) => m.market_name === 'Out Of Stock'
  );
  const isTheMarketActive = get(userData, 'market_statuses', []).some(
    (m) => m.market_name === 'The Market'
  );
  const isDiscrodActive = get(userData, 'market_statuses', []).some(
    (m) => m.market_name === 'Discord'
  );

  const onOutOfStockClick = async () => {
    if (isOutOfStockActive) {
      const request = await Api.logoutOutOfStock();

      if (!request.error) {
        dispatch(fetchUserData());
        dispatch(showSnackbar('Вышли из АУТОФСТОК'));
      } else {
        dispatch(showSnackbar(request.error.message));
      }

      console.log(request);
    } else {
      setOutOfStockOpen(true);
    }
  };

  return (
    <MainWrapper>
      <OutOfStockModal
        open={outOfStockOpen}
        handleClose={() => setOutOfStockOpen(false)}
      />

      <ContentWrapper>
        <FullName>{fullName}</FullName>
        <Email>{email}</Email>

        <UserDataWrapper>
          <InputWrapper>
            <Input
              inputValue={userCountry}
              setInputValue={setUserCountry}
              placeholder="Страна"
            />
          </InputWrapper>

          <InputWrapper>
            <Input
              inputValue={phoneNumber}
              setInputValue={setPhoneNumber}
              placeholder="Город"
            />
          </InputWrapper>

          <InputWrapper>
            <Input
              inputValue={userCity}
              setInputValue={setUserCity}
              placeholder="Телефон"
            />
          </InputWrapper>
        </UserDataWrapper>

        <IntegrationWrapper>
          <OutOfStockLogo src={outOfStockIcon} active={isOutOfStockActive} />
          <IntegrationCenterWrapper>
            <IntegrationName active={isOutOfStockActive}>
              OutOfStock
            </IntegrationName>
            <IntegrationSubName active={isOutOfStockActive}>
              Lulkek
            </IntegrationSubName>
          </IntegrationCenterWrapper>
          <IntegrationButton
            active={isOutOfStockActive}
            onClick={onOutOfStockClick}
          >
            {isOutOfStockActive ? 'Отключить' : 'Подключить'}
          </IntegrationButton>
        </IntegrationWrapper>

        <IntegrationWrapper>
          <TheMarketLogo src={theMarketIcon} />
          <IntegrationCenterWrapper>
            <IntegrationName>TheMarket</IntegrationName>
            <IntegrationSubName>
              Для отображения информации подключитесь к сервису.
            </IntegrationSubName>
          </IntegrationCenterWrapper>
          <IntegrationButton>Подключить</IntegrationButton>
        </IntegrationWrapper>

        <IntegrationWrapper>
          <TheMarketLogo src={DiscordIcon} />
          <IntegrationCenterWrapper>
            <IntegrationName>Discord</IntegrationName>
            <IntegrationSubName>
              Для отображения информации подключитесь к сервису.
            </IntegrationSubName>
          </IntegrationCenterWrapper>
          <IntegrationButton>Подключить</IntegrationButton>
        </IntegrationWrapper>
      </ContentWrapper>
    </MainWrapper>
  );
};

export default Account;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px 20px 10px 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FullName = styled.span`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.textColor};
  margin-bottom: 10px;
`;

const Email = styled.span`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.lightBlue};
  margin-bottom: 40px;
`;

const UserDataWrapper = styled.div`
  width: 55%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const InputWrapper = styled.div`
  width: 40%;
  margin-right: 20px;
  margin-top: 10px;
`;

const IntegrationWrapper = styled.div`
  width: 55%;
  background-color: ${({ theme }) => theme.colors.lightBackground};
  height: 120px;
  border-radius: 25px;
  margin: 10px 0px;
  box-sizing: border-box;
  padding: 30px;
  display: flex;
  align-items: center;
`;

const OutOfStockLogo = styled.img`
  width: 60px;
  height: auto;
  filter: ${(props) =>
    props.active
      ? 'none'
      : 'invert(54%) sepia(5%) saturate(2994%) hue-rotate(186deg) brightness(86%) contrast(91%)'};
`;

const TheMarketLogo = styled.img`
  width: 60px;
  height: auto;
  filter: ${(props) =>
    props.active ? 'brightness(1000%) contrast(100%)' : 'none'};
`;

const IntegrationCenterWrapper = styled.div`
  margin: 0px 20px;
  width: 250px;
  display: flex;
  flex-direction: column;
`;

const IntegrationName = styled.span`
  font-size: 24px;
  color: ${({ active, theme }) =>
    active ? theme.colors.textColor : theme.colors.lighterBackground};
`;

const IntegrationSubName = styled.span`
  font-size: 16px;
  color: ${({ active, theme }) =>
    active ? theme.colors.lightBlue : theme.colors.lighterBackground};
`;

const IntegrationButton = styled(Button)`
  && {
    margin-left: auto;
    height: 100%;
    width: 250px;

    border: ${({ active }) => (!active ? 'none' : '2px solid #394974')};
    background: ${({ active }) =>
      !active
        ? 'linear-gradient(70.86deg, #56CCF2 -3.71%, #2D9CDB 98.31%);'
        : 'inherit'};
    border-radius: 25px;
  }
`;
