import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SearchInput from 'components/SearchInput';
import ListWithShadows from 'components/ListWithShadows';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/HighlightOff';
import theme from 'theme.ts';

import { fetchOwnDealers } from './dealersActions';

const DealersList = () => {
  const { dealersList } = useSelector((state) => state.dealers);
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
        <Dealer>
          <IconPlaceholder />
          <DealerName>{dealer.trusted_user_login}</DealerName>

          <IconButton style={{ padding: 0, marginLeft: 'auto' }}>
            <CloseIcon style={DeleteIconStyle} />
          </IconButton>
        </Dealer>
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
      <AddDelaerWrapper>Add</AddDelaerWrapper>
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
  width: 45%;
  margin-right: 10px;
`;

const DealersWrapper = styled.div`
  height: 400px;
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
  border-bottom: ${({ theme }) => `2px solid ${theme.colors.secondaryColor}`};
`;

const AddDelaerWrapper = styled.div`
  width: 45%;
  margin-left: 10px;
  background-color: pink;
`;
