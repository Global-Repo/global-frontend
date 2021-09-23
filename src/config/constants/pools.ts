import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.global,
    earningToken: tokens.global,
    contractAddress: {
      97: '0xD412d85B75410bE2d01C3503bE580274c27c3B69',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 100,
    stakingToken: tokens.global,
    earningToken: tokens.bojis,
    contractAddress: {
      97: '0xF80f06b0e12050e51E92fe318057A81c62eD00aD',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '100',
    sortOrder: 1,
    isFinished: false,
  },
]

export default pools
