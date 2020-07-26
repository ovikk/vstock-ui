import React, { useState } from 'react';
import styled from 'styled-components';
import { Theme } from 'theme';
import Button from '@material-ui/core/Button';

import { login } from 'scenes/appActions';

import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginClick = () => dispatch(login(email, password));

  return (
    <Wrapper>
      <LoginComponentWrapper>
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

        <ActionButton
          disabled={email.length < 4 || password.length < 4}
          onClick={onLoginClick}
        >
          Войти
        </ActionButton>
      </LoginComponentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  overflow: hidden;
  position: fixed;
  background-color: ${(props: { theme: Theme }) =>
    props.theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${(props) => props.theme.font};
  color: ${(props: { theme: Theme }) => props.theme.colors.textColor};
`;

const LoginComponentWrapper = styled.div`
  width: 510px;
  height: 520px;
  background-color: ${(props: { theme: Theme }) =>
    props.theme.colors.lightBackground};
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
  margin: 15px 0px;
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
    margin-top: 60px;
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

export default Login;
