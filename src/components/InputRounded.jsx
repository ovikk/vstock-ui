import React, { useState } from 'react';
import styled from 'styled-components';

const InputComponent = ({
  inputValue,
  setInputValue,
  disabled,
  onClick,
  placeholder
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputWrapper onClick={onClick}>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={!!disabled}
        placeholder={placeholder}
      />
    </InputWrapper>
  );
};

export default InputComponent;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputTitle = styled.div`
  font-size: 18px;
  margin-bottom: 5px;
  color: ${({ theme, isFocused }) =>
    isFocused ? theme.colors.mainColor : theme.colors.secondaryColor};
  transition: all 350ms;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  border: 2px solid;
  border-radius: 40px;
  border-color: ${({ theme, isFocused }) =>
    isFocused ? theme.colors.mainColor : theme.colors.secondaryColor};
  box-sizing: border-box;
  padding: 10px;
  background-color: inherit;
  color: ${({ theme, isFocused }) => theme.colors.textColor};
  transition: all 350ms;
  font-size: 18px;
  font-family: ${({ theme }) => theme.font};

  :focus {
    /* color: ${({ theme }) => theme.colors.textColor};
    border-color: ${({ theme }) => theme.colors.mainColor}; */
    outline: none;
  }
`;
