import React from "react";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ShowChartOutlinedIcon from "@material-ui/icons/ShowChartOutlined";
import StorageOutlinedIcon from "@material-ui/icons/StorageOutlined";
import AttachMoneyOutlinedIcon from "@material-ui/icons/AttachMoneyOutlined";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";

const appRoutes = [
  {
    name: "Аккаунт",
    isselected: true,
    icon: PersonOutlineOutlinedIcon,
    path: "/app/account",
    component: () => <div>Kek1</div>,
  },
  {
    name: "Статистика",
    icon: ShowChartOutlinedIcon,
    path: "/app/stats",
    component: () => <div>Kek2</div>,
  },
  {
    name: "Интвентарь",
    icon: StorageOutlinedIcon,
    path: "/app/stock",
    component: () => <div>Kek3</div>,
  },
  {
    name: "Подписки",
    icon: AttachMoneyOutlinedIcon,
    path: "/app/subscriptions",
    component: () => <div>Kek4</div>,
  },
  {
    name: "Трекер",
    icon: RoomOutlinedIcon,
    path: "/app/tracker",
    component: () => <div>Kek5</div>,
  },
  {
    name: "Продажи",
    icon: RoomOutlinedIcon,
    path: "/app/sales",
    component: () => <div>Kek5</div>,
  },
  {
    name: "Рыночные Цены",
    icon: RoomOutlinedIcon,
    path: "/app/market",
    component: () => <div>Kek5</div>,
  },
];

export default appRoutes;
