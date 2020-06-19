import React from "react";
import styled from "styled-components";

const routes = [
  {
    name: "Аккаунт",
    isSelected: true,
  },
  {
    name: "Статистика",
  },
  {
    name: "Подписки",
  },
  {
    name: "Интвентарь",
  },
  {
    name: "Трекер",
  },
];

export default function LeftMenu() {
  return (
    <Wrapper>
      {routes.map((route) => (
        <MenuItemWrapper isSelected={route.isSelected}>
          <span>{route.name}</span> <span>LOGO</span>
        </MenuItemWrapper>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.lightBackground};
  height: 100%;
  width: ${(props) => props.theme.sizes.leftMenu.width};
  border-radius: 0px 15px 15px 0px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 90px;
  padding-left: 10px;
`;

const MenuItemWrapper: any = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props: any) =>
    props.isSelected && props.theme.colors.background};
  border-radius: 40px 0px 0px 40px;
  box-sizing: border-box;
  padding: 0px 30px;
  color: ${(props: any) =>
    props.isSelected
      ? "#FFFFFF"
      : props.theme.colors.leftMenu.nonSelectedTextColor};
  font-size: 20px;
  &:hover {
    background-color: ${(props: any) =>
      !props.isSelected && props.theme.colors.hoverColor};
  }
`;
