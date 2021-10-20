import { MenuEntry } from '@duhd4h/global-uikit'
import { ContextApi } from 'contexts/Localization/types'
import { BASE_EXCHANGE_SWAP_URL, BASE_LIQUIDITY_POOL_URL } from '../../config'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    href: '/',
  },
  {
    label: t('Exchange'),
    href: BASE_EXCHANGE_SWAP_URL,
  },
  {
    label: t('Liquidity'),
    href: BASE_LIQUIDITY_POOL_URL,
  },
  {
    label: t('Farms'),
    href: '/farms',
  },
  {
    label: t('Pools'),
    href: '/poolsGlobal',
  },
  // {
  //   label: t('Stake Token'),
  //   href: '/poolsToken',
  // },
  {
    label: t('Optimizer'),
    href: '/optimizer',
  },
  {
    label: 'BeGlobal',
    href: 'https://beglobal.finance/',
  },
]

export default config
