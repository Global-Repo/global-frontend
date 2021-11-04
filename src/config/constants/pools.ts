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
    sousId: 1,
    stakingToken: tokens.wbnb,
    earningToken: tokens.global,
    contractAddress: {
      97: '',
      56: '0xc4bF640a86Ef9368015AFC8176fAFCf432d1325F',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 2,
    stakingToken: tokens.busd,
    earningToken: tokens.global,
    contractAddress: {
      97: '',
      56: '0xEda297532A92fB74726E0Af608a5D2744E542c68',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 3,
    stakingToken: tokens.cake,
    earningToken: tokens.global,
    contractAddress: {
      97: '',
      56: '0xE2cb785bB2AA1e033F19f59B90bE47Cef729ED18',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 4,
    stakingToken: tokens.usdt,
    earningToken: tokens.global,
    contractAddress: {
      97: '',
      56: '0xb7FD227F62ddA09CDf473Acf3461Fbe844801915',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 5,
    stakingToken: tokens.eth,
    earningToken: tokens.global,
    contractAddress: {
      97: '',
      56: '0xB0b487FF99A8A5d60c21d58e9ebaB0df8c0Ac9e2',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 6,
    stakingToken: tokens.btcb,
    earningToken: tokens.global,
    contractAddress: {
      97: '',
      56: '0x3243A4f973FD952C4CFC99f9E9bEBb41BB9f52D3',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 7,
    stakingToken: tokens.doge,
    earningToken: tokens.global,
    contractAddress: {
      97: '',
      56: '0x861990AC613eB8DBd18551B860eF251f81Deb3e3',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
  },
/*
{
  sousId: 8,
  stakingToken: tokens.global,
  earningToken: tokens.wbnb,
  contractAddress: {
    97: '',
    56: '0xF3F78D3CCf6CC4d25c4651BCffCd2Ea4A46620Ca',
  },
  poolCategory: PoolCategory.CORE,
  harvest: true,
  tokenPerBlock: '10',
  sortOrder: 1,
  isFinished: false,
},
{
  sousId: 9,
  stakingToken: tokens.global,
  earningToken: tokens.wbnb,
  contractAddress: {
    97: '',
    56: '0xB2e3D5dF6c3Bd69b0388ae05BE8806408A835C54',
  },
  poolCategory: PoolCategory.CORE,
  harvest: true,
  tokenPerBlock: '10',
  sortOrder: 1,
  isFinished: false,
},
{
  sousId: 10,
  stakingToken: tokens.global,
  earningToken: tokens.wbnb,
  contractAddress: {
    97: '',
    56: '0x2e2FD151F9d6abeca1d81b77C6E7a0A02631A424',
  },
  poolCategory: PoolCategory.CORE,
  harvest: true,
  tokenPerBlock: '10',
  sortOrder: 1,
  isFinished: false,
},
{
  sousId: 11,
  stakingToken: tokens.global,
  earningToken: tokens.wbnb,
  contractAddress: {
    97: '',
    56: '0x2A49e752081F263737E827114dD77171A759E837',
  },
  poolCategory: PoolCategory.CORE,
  harvest: true,
  tokenPerBlock: '10',
  sortOrder: 1,
  isFinished: false,
},
{
  sousId: 12,
  stakingToken: tokens.global,
  earningToken: tokens.wbnb,
  contractAddress: {
    97: '',
    56: '0x46B137BA9c4563AE0566778A2910F023d2bAE7aE',
  },
  poolCategory: PoolCategory.CORE,
  harvest: true,
  tokenPerBlock: '10',
  sortOrder: 1,
  isFinished: false,
},
{
  sousId: 13,
  stakingToken: tokens.global,
  earningToken: tokens.wbnb,
  contractAddress: {
    97: '',
    56: '0x5Ef0a43F88a8f7851B6D6c85DeF7348242e557e2',
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
 */
]

export default pools
