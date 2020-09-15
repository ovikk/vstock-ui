import { TheMarketForm } from './TheMarketForm'
import { OutOfStockForm } from './OutOfStockForm'

export const marketsConfig = [
  {
    name: 'OutOfStock',
    shortName: 'oos',
    icon: '',
    Component: OutOfStockForm,
  },
  {
    name: 'TheMarket',
    shortName: 'tm',
    icon: '',
    Component: TheMarketForm,
  }
]
