import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import authAction, { login, registrate } from 'scenes/Login/authActions';

import { useDispatch, useSelector } from 'react-redux';
import {
  Redirect,
} from 'react-router-dom';

export const loginStates = {
  login: 1,
  registration: 2,
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  overflow: hidden;
  position: fixed;
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${(props) => props.theme.font};
  color: ${(props) => props.theme.colors.textColor};
`;

const LoginComponentWrapper = styled.div`
  width: 510px;
  background-color: ${(props) => props.theme.colors.lightBackground};
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.span`
  font-size: 28px;
  margin-top: 40px;
  margin-bottom: 60px;
`;

const TextInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0px;
`;

const TextInputText = styled.span`
  font-size: 20px;
  margin-bottom: 10px;
`;

const TextInput = styled.input`
  width: 300px;
  height: 40px;
  border: 2px solid;
  border-color: ${({ theme }) => theme.colors.nonFocusedTextColor};
  box-sizing: border-box;
  border-radius: 40px;
  background-color: inherit;
  text-align: center;
  color: ${({ theme }) => theme.colors.nonFocusedTextColor};
  transition: border-color 500ms cubic-bezier(0, 0, 0.2, 1) 100ms;
  font-size: 18px;
  font-family: ${({ theme }) => theme.font};

  :focus {
    color: ${({ theme }) => theme.colors.textColor};
    border-color: ${({ theme }) => theme.colors.mainColor};
    outline: none;
  }
`;
const ActionButton = styled(Button)`
  && {
    margin: 30px 0px;
    background-color: ${({ theme }) => theme.colors.mainColor};
    width: 230px;
    height: 55px;
    border-radius: 40px;
    color: ${({ theme }) => theme.colors.textColor};
    text-transform: none;
    font-size: 18px;

    :hover {
      background-color: ${({ theme }) => theme.colors.nonFocusedTextColor};
    }
  }
`;

const ErrorText = styled.div`
  min-height: 50px;
  width: 70%;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.errorColor};
  text-align: center;
`;

const RegistrationLinkWrapper = styled.div`
  margin: 20px 0px;
`;

const RegistrationLink = styled.span`
  color: ${({ theme }) => theme.colors.mainColor};
  cursor: pointer;
`;

const Login = ({ loginPropState }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginState, setloginState] = useState(
    loginPropState || loginStates.login
  );

  const [rEmail, setREmail] = useState('');
  const [rPassword, setRPassword] = useState('');
  const [rRepeatPassword, setRRepearPassword] = useState('');

  const { loginError, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loginError !== '') {
      dispatch(authAction.setLogInError(''));
    }
  }, [email, password]);

  const onLoginClick = () => dispatch(login(email, password));

  const onRegistrationClick = () => dispatch(registrate(rEmail, rPassword));

  const renderLoginComponents = () => (
    <React.Fragment>
      <Title>Вход</Title>

      <TextInputWrapper>
        <TextInputText>Логин</TextInputText>
        <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
      </TextInputWrapper>

      <TextInputWrapper>
        <TextInputText>Пароль</TextInputText>
        <TextInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </TextInputWrapper>

      <ErrorText isShown={!!loginError}>{loginError}</ErrorText>

      <ActionButton
        disabled={email.length < 4 || password.length < 4}
        onClick={onLoginClick}
      >
        Войти
      </ActionButton>

      <RegistrationLinkWrapper>
        У вас нет аккаунта?{' '}
        <RegistrationLink
          onClick={() => setloginState(loginStates.registration)}
        >
          Зарегестрироваться
        </RegistrationLink>
      </RegistrationLinkWrapper>
    </React.Fragment>
  );

  const renderRegistrationComponents = () => (
    <React.Fragment>
      <Title>Регистрация</Title>

      <TextInputWrapper>
        <TextInputText>Логин</TextInputText>
        <TextInput value={rEmail} onChange={(e) => setREmail(e.target.value)} />
      </TextInputWrapper>

      <TextInputWrapper>
        <TextInputText>Пароль</TextInputText>
        <TextInput
          type="password"
          value={rPassword}
          onChange={(e) => setRPassword(e.target.value)}
        />
      </TextInputWrapper>

      <TextInputWrapper>
        <TextInputText>Повторите пароль</TextInputText>
        <TextInput
          type="password"
          value={rRepeatPassword}
          onChange={(e) => setRRepearPassword(e.target.value)}
        />
      </TextInputWrapper>

      <ErrorText isShown={!!loginError}>{loginError}</ErrorText>

      <ActionButton
        disabled={
          rEmail.length < 4 ||
          rPassword.length < 6 ||
          rPassword !== rRepeatPassword
        }
        onClick={onRegistrationClick}
      >
        Зарегестрироваться
      </ActionButton>

      <RegistrationLinkWrapper>
        Вы уже зарегестрированы?{' '}
        <RegistrationLink onClick={() => setloginState(loginStates.login)}>
          Войти
        </RegistrationLink>
      </RegistrationLinkWrapper>
    </React.Fragment>
  );

  if (isAuthenticated)
    return (
      <Redirect
        to={{
          pathname: '/app',
          state: { from: '/login' },
        }}
      />
    );

  return (
    <Wrapper>
      <LoginComponentWrapper>
        {loginState === loginStates.login && renderLoginComponents()}
        {loginState === loginStates.registration &&
          renderRegistrationComponents()}
      </LoginComponentWrapper>
    </Wrapper>
  );
};

export default Login;
