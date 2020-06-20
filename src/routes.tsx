import React from "react";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ShowChartOutlinedIcon from "@material-ui/icons/ShowChartOutlined";
import StorageOutlinedIcon from "@material-ui/icons/StorageOutlined";
import AttachMoneyOutlinedIcon from "@material-ui/icons/AttachMoneyOutlined";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";

const routes = [
  {
    name: "Аккаунт",
    isselected: true,
    icon: PersonOutlineOutlinedIcon,
    path: "/account",
    component: () => <div>Kek1</div>,
  },
  {
    name: "Статистика",
    icon: ShowChartOutlinedIcon,
    path: "/stats",
    component: () => <div>Kek2</div>,
  },
  {
    name: "Интвентарь",
    icon: StorageOutlinedIcon,
    path: "/stock",
    component: () => <div>Kek3</div>,
  },
  {
    name: "Подписки",
    icon: AttachMoneyOutlinedIcon,
    path: "/subscriptions",
    component: () => <div>Kek4</div>,
  },
  {
    name: "Трекер",
    icon: RoomOutlinedIcon,
    path: "/tracker",
    component: () => <div>Kek5</div>,
  },
  {
    name: "Продажи",
    icon: RoomOutlinedIcon,
    path: "/sales",
    component: () => <div>Kek5</div>,
  },
  {
    name: "Рыночные Цены",
    icon: RoomOutlinedIcon,
    path: "/market",
    component: () => <div>Kek5</div>,
  },
];

export default routes;
