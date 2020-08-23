import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Api from 'Api.ts'
import styled from 'styled-components';
import SearchInput from 'components/SearchInput';
import ListWithShadows from 'components/ListWithShadows';
import Input from 'components/Input';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import Account from './Account';

import theme from 'theme.ts';

import { fetchOwnBuyers } from './dealersActions';

const BuyersList = () => {
  const { buyersList } = useSelector((state) => state.dealers);

  const dispatch = useDispatch();

  useEffect(() => {
    if (buyersList === undefined) {
      dispatch(fetchOwnBuyers());
    }
  }, []);

  console.log({ buyersList });


  const renderBuyersList = () => {
    if (buyersList === undefined) {
      return <div>loading</div>;
    }

    if (buyersList === []) {
      return <div>Список пуст</div>;
    }

    return buyersList.map((dealer, i) => (
      <>
        <Account login={dealer.trusted_user_login} />
        {i !== buyersList.length - 1 && <Divider />}
      </>
    ));
  };

  return (
    <MainWrapper>
      <ListWrapper>
        <SearchInput width="100%" placeholder="Введите логин или email" />

        <BuyersWrapper>
          <ListWithShadows>{renderBuyersList()}</ListWithShadows>
        </BuyersWrapper>
      </ListWrapper>
      <AddDelaerWrapper>
            inviteLink
      </AddDelaerWrapper>
    </MainWrapper>
  );
};

export default BuyersList;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const ListWrapper = styled.div`
  width: 40%;
  margin-right: 10px;
  margin-left: 20px;
`;

const BuyersWrapper = styled.div`
  height: 500px;
  width: 100%;
`;

const Divider = styled.div`
  width: 1;
  height: 1px;
  margin: 10px 0px;
  padding: 0px 10px;
  border-bottom: ${({ theme }) =>
    `2px solid ${theme.colors.nonFocusedTextColor}`};
`;

const AddDelaerWrapper = styled.div`
  width: 30%;
  margin-left: 80px;
`;

const AddButton = styled(Button)`
  && {
    background-color: ${({ theme, isDisabled }) =>
      isDisabled
        ? theme.colors.nonFocusedTextColor
        : theme.colors.approveColor} !important;
    color: #fff;
    width: 100%;
    height: 60px;
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 100px;
    transition: background-color 100ms;
  }
`;

const Spinner = styled(CircularProgress)`
  && {
    color: ${({ theme }) => theme.colors.approveColor};
  }
`;
