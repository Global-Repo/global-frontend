import { MenuEntry } from '@duhd4h/global-uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('Exchange'),
    icon: 'PoolIcon',
    href: '',
  },
  {
    label: t('Liquidity'),
    icon: 'PoolIcon',
    href: '',
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
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Contact',
        href: '',
      },
      {
        label: 'Voting',
        href: '',
      },
      {
        label: 'Github',
        href: 'https://github.com/Global-Repo',
      },
    ],
  },
]

export default config
