import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { showSnackbar } from 'components/Snackbar/snackbarActions';
import { fetchUserData } from './accountActions';

import Api from 'Api.ts';

import Input from 'components/Input';

const authStepsConfig = [
  {
    emailDisabled: false,
    showCodeInput: false,
    actionButtonText: 'Далее',
  },
  {
    emailDisabled: true,
    showCodeInput: true,
    actionButtonText: 'Подключить'
  },
]

const TheMarketModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState('');
  const [passcode, setPasscode] = useState('');
  const [isLoading, setIsLoading] = useState('');

  const [step, setStep] = useState(0);

  const onAuth = async () => {
    setIsLoading(true);
    if (step === 0) {
      const request = await Api.getTheMarketPasscode(login);
      if (!request.error) {
        dispatch(fetchUserData());
        dispatch(showSnackbar(`Получен The market key`));
      } else {
        dispatch(showSnackbar(request.error.message));
      }
    } else if (step == 1) {
      const request = await Api.sendTheMarketPasscode(login, passcode);
      if (!request.error) {
        dispatch(fetchUserData());
        dispatch(showSnackbar(`Отправлен The market key`));
        handleClose();

        setLogin('');
        setPasscode('');
      } else {
        dispatch(showSnackbar(request.error.message));
      }
    }
    setStep(currStep => ((currStep + 1) % authStepsConfig.length))
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
          Подключение аккаунта The Market
        </DialogContentText>
        <InputWrapper>
          <Input title="Email" inputValue={login} setInputValue={setLogin} disabled={authStepsConfig[step].emailDisabled} />
        </InputWrapper>
        {authStepsConfig[step].showCodeInput && (
          <InputWrapper>
            <Input
              title="Код"
              inputValue={passcode}
              setInputValue={setPasscode}
              password={true}
              type="text"
              name="passcode"
            />
          </InputWrapper>
        )}
      </MainWrapper>
      <ActionWrapper>
        <Button
          onClick={onAuth}
          disabled={login.length < 3 || (step === 1 && passcode.length !== 6)}
        >
          {isLoading ? 'Загрузка' : authStepsConfig[step].actionButtonText}
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

export default TheMarketModal;
