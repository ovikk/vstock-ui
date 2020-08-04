import React from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import CloseIconInit from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import AutoComplete from 'scenes/Inventory/AutoComplete';
import Api from 'Api';

import theme from 'theme';

const testItems = [
  'YEEZY BOOST',
  'NIKE JORDAN',
  'LOL KEK',
  'NIKE JORDAN',
  'YEEZY BOOST',
];

const AddSneakerModal = ({ showModal, onClose }) => {
  return (
    <Dialog onClose={onClose} open={showModal} maxWidth="lg">
      <MainWrapper>
        <TopTitleWrapper>
          <TitleText>Добавить Предмет</TitleText>
          <IconButton
            style={{ height: '100%' }}
            component="span"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </TopTitleWrapper>

        <AutoComplete getFunction={Api.getSneakersSuggestions} />

        <div style={{ width: 300, height: 300, backgroundColor: 'wheat' }}>
          kek
        </div>
      </MainWrapper>
    </Dialog>
  );
};

export default AddSneakerModal;

const MainWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.lightBackground};
  width: 1000px;
  height: 800px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px 20px;
`;

const TopTitleWrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleText = styled.span`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.nonFocusedTextColor};
`;

const CloseIcon = styled(CloseIconInit)`
  && {
    color: ${({ theme }) => theme.colors.nonFocusedTextColor};
  }
`;
