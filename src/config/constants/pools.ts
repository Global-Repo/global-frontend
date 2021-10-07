import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.global,
    earningToken: tokens.global,
    contractAddress: {
      97: '0xD412d85B75410bE2d01C3503bE580274c27c3B69',
      56: '0xe0B197B14ff038a72cC7a41C436155A2a2F5c14C',
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
    earningToken: tokens.loko,
    contractAddress: {
      97: '',
      56: '0x1f994710669dcd9303e197401d1aa6e73e34f67f',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '1',
    sortOrder: 2,
    isFinished: false,
  }
]

export default pools
