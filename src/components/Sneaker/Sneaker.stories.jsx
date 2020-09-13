import React from 'react'
import { ThemeProvider } from 'styled-components';
import { Sneaker } from './Sneaker'

import { mock } from './mocks'
import theme from 'theme'

export default {
  title: 'Sneaker',
  component: Sneaker,
  argTypes: {
    onDelete: { action: 'onDelete' },
    onEditClick: { action: 'onEditClick' },
    onSellClick: { action: 'onSellClick' },
  }
}

const sneakerStoryTemplate = (args) => (
  <ThemeProvider theme={theme}>
    <Sneaker item={mock} {...args}/>
  </ThemeProvider>
)

function configNewStory(item, readOnly) {
  const SneakerStory = sneakerStoryTemplate.bind({})
  SneakerStory.args = {
    readOnly,
    item
  }
  return SneakerStory
}

export const InventorySneaker = configNewStory(mock[0], false)
export const InventorySneaker2 = configNewStory(mock[1], false)
export const DealerSneaker = configNewStory(mock[2], true)
