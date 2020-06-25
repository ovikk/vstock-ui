import React from "react";
import styled from "styled-components";
import appRoutes from "routes/appRoutes";
import { Link as RouterLink, useLocation } from "react-router-dom";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

export default function LeftMenu() {
  const loc = useLocation();

  console.log(loc)

  return (
    <Wrapper>
      {appRoutes.map((route, i) => (
        <Link
          isselected={loc.pathname.startsWith(route.path) ? 1 : 0}
          to={route.path}
          key={i}
        >
          <span>{route.name}</span>
          {route.icon && <route.icon style={iconStyle} />}
        </Link>
      ))}

      <Link to={"/logout"} key={-1} style={logoutStyle}>
        <span>Выйти</span>
        <ExitToAppOutlinedIcon style={iconStyle} />
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.lightBackground};
  height: 100%;
  width: 300px;
  border-radius: 0px 15px 15px 0px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 90px;
  padding-left: 10px;
`;

const Link: any = styled(RouterLink)`
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
  color: ${(props: any) =>
    props.isselected
      ? "#FFFFFF"
      : props.theme.colors.nonSelectedTextColor};
  font-size: 20px;
  &:hover {
    background-color: ${(props: any) =>
      !props.isselected && props.theme.colors.hoverColor};
  }
  text-decoration: none;
`;

const iconStyle = { height: "60%", width: "auto" };
const logoutStyle = { marginTop: "auto", marginBottom: "30px" };
