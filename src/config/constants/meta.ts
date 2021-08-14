import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'BeGlobal',
  description:
    'One-stop-shop for all your DeFi needs. Take advantage of our cheap DEX, yield optimizer and APR boost rewards',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('BeGlobal')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('BeGlobal')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('BeGlobal')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('BeGlobal')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('BeGlobal')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('BeGlobal')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('BeGlobal')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('BeGlobal')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('BeGlobal')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('BeGlobal')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('BeGlobal')}`,
      }
    default:
      return null
  }
}
