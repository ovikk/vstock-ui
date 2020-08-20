import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SearchInput from 'components/SearchInput';
import ListWithShadows from 'components/ListWithShadows';
import Input from 'components/Input';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';

import Account from './Account';

import theme from 'theme.ts';

import { fetchOwnDealers } from './dealersActions';

const DealersList = () => {
  const { dealersList } = useSelector((state) => state.dealers);
  const [dealerNameInputValue, setDealerNameInputValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (dealersList === undefined) {
      dispatch(fetchOwnDealers());
    }
  }, []);

  console.log({ dealersList });

  const renderDealersList = () => {
    if (dealersList === undefined) {
      return <div>loading</div>;
    }

    if (dealersList === []) {
      return <div>Список пуст</div>;
    }

    return dealersList.map((dealer, i) => (
      <>
        <Account login={dealer.trusted_user_login} />
        {i !== dealersList.length - 1 && <Divider />}
      </>
    ));
  };

  return (
    <MainWrapper>
      <ListWrapper>
        <SearchInput width="100%" placeholder="Введите логин или email" />

        <DealersWrapper>
          <ListWithShadows>{renderDealersList()}</ListWithShadows>
        </DealersWrapper>
      </ListWrapper>
      <AddDelaerWrapper>
        <Input
          inputValue={dealerNameInputValue}
          setInputValue={setDealerNameInputValue}
        />

        <AddButton
          variant="contained"
          isDisabled={dealerNameInputValue.length < 3}
        >
          Добавить
        </AddButton>
      </AddDelaerWrapper>
    </MainWrapper>
  );
};

export default DealersList;

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

const DealersWrapper = styled.div`
  height: 500px;
  width: 100%;
`;

const Dealer = styled.div`
  width: 95%;
  height: 40px;
  display: flex;
  align-items: center;
`;

const IconPlaceholder = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;

  background-color: ${({ theme }) => theme.colors.nonFocusedTextColor};
`;

const DealerName = styled.span`
  margin-left: 20px;
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textColor};
`;

const DeleteIconStyle = {
  height: '30px',
  width: 'auto',
  color: '#FFFFFF',
};

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
