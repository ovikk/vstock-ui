import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { showSnackbar } from 'components/Snackbar/snackbarActions';
import { fetchUserData } from './accountActions';

import Api from 'Api.ts';

import Input from 'components/Input';

const OutOfStockModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState('');

  const onAuth = async () => {
    setIsLoading(true);
    const request = await Api.authOutOfStock(login, password);
    console.log(request);

    if (!request.error) {
      dispatch(fetchUserData());
      dispatch(showSnackbar(`Аутофсток зарабитал`));
      handleClose();
    } else {
      dispatch(showSnackbar(request.error.message));
    }

    setIsLoading(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <MainWrapper>
        <DialogContentText style={{ marginBottom: 20 }}>
          Чтобы блять текст сами нахуй потом как нибудь придумаете
        </DialogContentText>
        <InputWrapper>
          <Input title="Email" inputValue={login} setInputValue={setLogin} />
        </InputWrapper>
        <InputWrapper>
          <Input
            title="Пароль"
            inputValue={password}
            setInputValue={setPassword}
            password={true}
            type="password"
            name="password"
          />
        </InputWrapper>
      </MainWrapper>
      <ActionWrapper>
        <Button
          onClick={onAuth}
          disabled={login.length < 3 || password.length < 3 || isLoading}
        >
          {isLoading ? 'Загрузка' : 'Логин'}
        </Button>
      </ActionWrapper>
    </Dialog>
  );
};

const MainWrapper = styled(DialogContent)`
  && {
    background-color: ${({ theme }) => theme.colors.modalBackground};
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 20px 30px 0px 30px;
  }
`;

const ActionWrapper = styled(DialogActions)`
  && {
    background-color: ${({ theme }) => theme.colors.modalBackground};
  }
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

export default OutOfStockModal;
