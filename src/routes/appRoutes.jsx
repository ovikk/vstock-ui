import React from 'react';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ShowChartOutlinedIcon from '@material-ui/icons/ShowChartOutlined';
import StorageOutlinedIcon from '@material-ui/icons/StorageOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import GroupIcon from '@material-ui/icons/Group';

import Inventory from 'scenes/Inventory';
import Dealers from 'scenes/Dealers'
import Stats from 'scenes/Stats';

const appRoutes = [
  {
    name: 'Аккаунт',
    isselected: true,
    icon: PersonOutlineOutlinedIcon,
    path: '/app/account',
    component: () => <div>Kek1</div>,
  },
  {
    name: 'Статистика',
    icon: ShowChartOutlinedIcon,
    path: '/app/stats',
    component: Stats,
  },
  {
    name: 'Интвентарь',
    icon: StorageOutlinedIcon,
    path: '/app/inventory',
    component: Inventory,
  },
  {
    name: 'Дилеры',
    icon: GroupIcon,
    path: '/app/dealers',
    component: Dealers,
  },
  {
    name: 'Подписки',
    icon: AttachMoneyOutlinedIcon,
    path: '/app/subscriptions',
    component: () => <div>Kek4</div>,
  },

  {
    name: 'Продажи',
    icon: RoomOutlinedIcon,
    path: '/app/sales',
    component: () => <div>Kek5</div>,
  },
  {
    name: 'Рыночные Цены',
    icon: RoomOutlinedIcon,
    path: '/app/market',
    component: () => <div>Kek5</div>,
  },
];

export default appRoutes;
