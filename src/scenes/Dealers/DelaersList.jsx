import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Api from 'Api.ts';
import styled from 'styled-components';
import SearchInput from 'components/SearchInput';
import ListWithShadows from 'components/ListWithShadows';
import { showSnackbar } from 'components/Snackbar/snackbarActions';
import Input from 'components/Input';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import Account from './Account';

import theme from 'theme.ts';

import { fetchOwnDealers } from './dealersActions';

const DealersList = () => {
  const { dealersList } = useSelector((state) => state.dealers);

  const [dealerNameInputValue, setDealerNameInputValue] = useState('');
  const [isAddDealerFetching, setIsAddDealerFetching] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (dealersList === undefined) {
      dispatch(fetchOwnDealers());
    }
  }, []);


  const onAddDelaerClick = async () => {
    setIsAddDealerFetching(true);
    const response = await Api.addDealer(dealerNameInputValue);
    if (!response.error) {
      setDealerNameInputValue('');
      dispatch(showSnackbar(`Пользователь ${dealerNameInputValue} добавлен`));
      dispatch(fetchOwnDealers());
    } else {
      dispatch(showSnackbar(`Пользователь приватный или не найден`));
    }
    setIsAddDealerFetching(false);
  };

  const onDeleteDealerClick = async (dealerId, dealerLogin) => {
    const response = await Api.deleteDealer(dealerId);

    if (!response.error) {
      dispatch(showSnackbar(`Дилер ${dealerLogin} удален`));
      dispatch(fetchOwnDealers());
    } else {
      dispatch(showSnackbar(`Ошибка при удалени ${dealerLogin} дилера`));
    }
  };

  const renderDealersList = () => {
    if (dealersList === undefined) {
      return <div>loading</div>;
    }

    if (dealersList === []) {
      return <div>Список пуст</div>;
    }

    return dealersList.map((dealer, i) => (
      <>
        <Account
          login={dealer.trusted_user_login}
          onDelete={() =>
            onDeleteDealerClick(dealer.id, dealer.trusted_user_login)
          }
        />
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
          title="Никнейм дилера"
          inputValue={dealerNameInputValue}
          setInputValue={setDealerNameInputValue}
        />

        <AddButton
          variant="contained"
          isDisabled={dealerNameInputValue.length < 3 || isAddDealerFetching}
          onClick={onAddDelaerClick}
        >
          {isAddDealerFetching ? <Spinner size={40} /> : 'Добавить'}
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
