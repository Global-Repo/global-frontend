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
    earningToken: tokens.manor,
    contractAddress: {
      97: '0x1342d76a2fe7ed435df582a1ff6a618e1f68c18f',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '100',
    sortOrder: 2,
    isFinished: false,
  },
  {
    sousId: 100,
    stakingToken: tokens.global,
    earningToken: tokens.manolos,
    contractAddress: {
      97: '0xff9071d542f381faa9265a70e4d170e6fb42e026',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '100',
    sortOrder: 3,
    isFinished: false,
  },
]

export default pools
