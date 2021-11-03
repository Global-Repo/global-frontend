import { MenuEntry } from '@duhd4h/global-uikit'
import { ContextApi } from 'contexts/Localization/types'
import { BASE_EXCHANGE_SWAP_URL, BASE_LIQUIDITY_POOL_URL } from '../../config'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    href: '/',
  },
  {
    label: 'BeGlobal',
    href: 'https://beglobal.finance/',
  },
    {
    label: 'Help',
    href: 'https://beglobal-finance.gitbook.io/beglobal/',
  },
]

export default config
