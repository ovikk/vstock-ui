import React from 'react';
import styled from 'styled-components';
import appRoutes from 'routes/appRoutes';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

export default function LeftMenu() {
  const loc = useLocation();

  console.log(loc);

  return (
    <Wrapper>
      {appRoutes.map((route, i) => (
        <Link
          isselected={loc.pathname.startsWith(route.path) ? 1 : 0}
          to={route.path}
          key={i}
        >
          <LinkText>{route.name}</LinkText>
          {route.icon && <route.icon style={iconStyle} />}
        </Link>
      ))}

      <Link to={'/logout'} key={-1} style={logoutStyle}>
        <LinkText>Выйти</LinkText>
        <ExitToAppOutlinedIcon style={iconStyle} />
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.lightBackground};
  height: 100%;
  min-width: 300px;
  border-radius: 0px 15px 15px 0px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 90px;
  padding-left: 10px;
`;

const Link: any = styled(RouterLink)`
  && {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props: any) =>
      props.isselected && props.theme.colors.background};
    border-radius: 40px 0px 0px 40px;
    box-sizing: border-box;
    padding: 0px 30px;
    font-family: ${({ theme }) => theme.font};
    color: ${(props: any) =>
      props.isselected ? '#FFFFFF' : props.theme.colors.nonFocusedTextColor};
    &:hover {
      background-color: ${(props: any) =>
        !props.isselected && props.theme.colors.hoverColor};
    }
    text-decoration: none;
  }
`;

const LinkText = styled.span`
  font-family: ${({ theme }) => theme.font};
  font-size: 20px;
`;

const iconStyle = { height: '60%', width: 'auto' };
const logoutStyle = { marginTop: 'auto', marginBottom: '30px' };
