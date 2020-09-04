import React, { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import theme from 'theme.ts';

const SearchInput = ({ width, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <SearchWrapper width={width} isFocused={isFocused}>
      <SearchIcon
        style={{
          ...SearchIconStyle,
          color: isFocused
            ? theme.colors.mainColor
            : theme.colors.secondaryColor,
        }}
      />
      <Input
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </SearchWrapper>
  );
};

export default SearchInput;

const SearchWrapper = styled.div`
  width: ${({width})=>(width ? `${width} px` : '50%')};
  height: 40px;
  border-width: 2px;
  border-style: solid;
  border-radius: 40px;
  border-color: ${({ theme, isFocused }) =>
    isFocused ? theme.colors.mainColor : theme.colors.secondaryColor};
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;

  transition: all 350ms;
`;
const SearchIconStyle = {
  color: theme.colors.secondaryColor,
  marginLeft: 10,
  height: '70%',
  width: 'auto',
  transition: 'all 350ms',
};
const Input = styled.input`
  padding: 0px 10px;
  outline: none;
  border: none;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textColor};
  font-family: ${({ theme }) => theme.font};
  font-size: 18px;
  width: 80%;
  ::placeholder {
    color: ${({ theme }) => theme.colors.secondaryColor};
    font-family: ${({ theme }) => theme.font};
    font-size: 18px;
  }
`;
