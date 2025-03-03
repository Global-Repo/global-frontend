import { VaultConfig } from './types'
import tokens from './tokens'
import contracts from './contracts'

const vaults: VaultConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.global,
    earningToken: [tokens.bnb],
    contractAddress: contracts.globalVaultStakedToBnb,
    tokenPerBlock: '10',
  },
  {
    sousId: 1,
    stakingToken: tokens.global,
    earningToken: [tokens.global],
    contractAddress: contracts.globalVaultStakedToGlobal,
    tokenPerBlock: '10',
  },
  {
    sousId: 2,
    stakingToken: tokens.global,
    earningToken: [tokens.bnb],
    contractAddress: contracts.globalVaultVested,
    tokenPerBlock: '10',
  },
  {
    sousId: 3,
    stakingToken: tokens.global,
    earningToken: [tokens.bnb, tokens.global],
    contractAddress: contracts.globalVaultLocked,
    tokenPerBlock: '10',
  },
  {
    sousId: 4,
    stakingToken: tokens.global,
    earningToken: [tokens.cake],
    contractAddress: contracts.globalVaultCake,
    tokenPerBlock: '10',
  },
  {
    sousId: 5,
    stakingToken: tokens.global,
    earningToken: [tokens.bunny],
    contractAddress: contracts.globalVaultCake, // bunny
    tokenPerBlock: '10',
  },
  {
    sousId: 6,
    stakingToken: tokens.cake,
    earningToken: [tokens.cake, tokens.global],
    contractAddress: contracts.globalVaultCakeMaximizer, // bunny
    tokenPerBlock: '10',
  },
  {
    sousId: 7,
    stakingToken: tokens.cake,
    earningToken: [tokens.cake, tokens.global],
    contractAddress: contracts.globalVaultMixStrategy, // bunny
    tokenPerBlock: '10',
  },
  {
    sousId: 8,
    stakingToken: tokens.cake,
    earningToken: [tokens.cake, tokens.global],
    contractAddress: contracts.globalVaultGlobalMaximizer, // bunny
    tokenPerBlock: '10',
  },
]

export default vaults
