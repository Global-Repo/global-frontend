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
]

export default vaults
