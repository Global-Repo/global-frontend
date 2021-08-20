import { MenuEntry } from '@duhd4h/global-uikit'
import { ContextApi } from 'contexts/Localization/types'
import { BASE_EXCHANGE_SWAP_URL, BASE_LIQUIDITY_POOL_URL } from '../../config'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('Exchange'),
    icon: 'PoolIcon',
    href: BASE_EXCHANGE_SWAP_URL,
  },
  {
    label: t('Liquidity'),
    icon: 'PoolIcon',
    href: BASE_LIQUIDITY_POOL_URL,
  },
  {
    label: t('Farms'),
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: t('Pools'),
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: t('Vaults Globals'),
    icon: 'PoolIcon',
    href: '/vaults',
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Contact',
        href: '/contact',
      },
      {
        label: 'Voting',
        href: '/voting',
      },
      {
        label: 'Github',
        href: 'https://github.com/Global-Repo',
      },
    ],
  },
]

export default config
