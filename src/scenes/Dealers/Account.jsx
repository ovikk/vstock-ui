import React from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/HighlightOff';
import { classicNameResolver } from 'typescript';

const Account = ({ login, onDelete }) => {
  return (
    <Wrapper>
      <IconPlaceholder />
      <Name>{login}</Name>

      <IconButton style={{ padding: 0, marginLeft: 'auto' }} onClick={onDelete}>
        <CloseIcon style={DeleteIconStyle} />
      </IconButton>
    </Wrapper>
  );
};

export default Account;

const Wrapper = styled.div`
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

const Name = styled.span`
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
