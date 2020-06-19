import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import BusinessIcon from '@material-ui/icons/Business'
import TableChartIcon from '@material-ui/icons/TableChart'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AddProjectIcon from '@material-ui/icons/PostAdd'

export default function LeftMenu() {
  return (
    <Drawer variant="permanent" style={{ top: 'auto' }}>
      <div
        style={{
          width: '220px',
          marginTop: '64px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          height: '100%',
        }}
      >
        <List>
          <ListItem button key={'Таблицы'}>
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText primary={'Отчеты'} />
          </ListItem>
          <Divider />
          <ListItem button key={'Компании и Проекты'}>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary={'Компании и Проекты'} />
          </ListItem>
        </List>

        <Divider />
        <List>
          <ListItem button key={'Таблицы'}>
            <ListItemIcon>
              <AddProjectIcon />
            </ListItemIcon>
            <ListItemText primary={'Добавить проект'} />
          </ListItem>
        </List>

        <Divider style={{ marginTop: 'auto' }} />
        <List>
          <ListItem button key={'Выйти'}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={'Выйты'} />
          </ListItem>
        </List>
      </div>
    </Drawer>
  )
}
