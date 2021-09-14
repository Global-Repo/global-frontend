import BigNumber from 'bignumber.js'
import { getGlobalVaultStakedToBnbContract } from '../../utils/contractHelpers'
import { EarningTokenPrice, SerializedBigNumber, VaultApr } from '../types'
import { BIG_ZERO } from '../../utils/bigNumber'
import { VaultConfig } from '../../config/constants/types'
import tokens from '../../config/constants/tokens'

export const fetchGlobalVaultStakedToBnbPublicData = async (
  vaultConfig: VaultConfig,
): Promise<{
  totalStaked: SerializedBigNumber
  vaultApr: VaultApr[]
  earningTokensPrice: EarningTokenPrice[]
}> => {
  try {
    const globalVaultStakedToBnbContract = getGlobalVaultStakedToBnbContract()

    /* const totalStaked = await globalVaultStakedToBnbContract.methods.stakingToken().call()
    const stakingToken = await globalVaultStakedToBnbContract.methods.stakingToken().call() */

    return {
      totalStaked: BIG_ZERO.toJSON(),
      vaultApr: [{ token: tokens.bnb, apr: 0.5 }],
      earningTokensPrice: [{ token: tokens.bnb, earningTokenPrice: 20 }],
    }
    // return new BigNumber(stakingToken)
  } catch (error) {
    return error
  }
}

export const fetchGlobalVaultStakedToGlobalPublicData = async (
  vaultConfig: VaultConfig,
): Promise<{
  totalStaked: SerializedBigNumber
  vaultApr: VaultApr[]
  earningTokensPrice: EarningTokenPrice[]
}> => {
  try {
    const globalVaultStakedToBnbContract = getGlobalVaultStakedToBnbContract()

    /* const totalStaked = await globalVaultStakedToBnbContract.methods.stakingToken().call()
    const stakingToken = await globalVaultStakedToBnbContract.methods.stakingToken().call() */

    return {
      totalStaked: BIG_ZERO.toJSON(),
      vaultApr: [{ token: tokens.global, apr: 0.5 }],
      earningTokensPrice: [{ token: tokens.global, earningTokenPrice: 20 }],
    }
    // return new BigNumber(stakingToken)
  } catch (error) {
    return error
  }
}

export const fetchGlobalVaultStakedToBnbUserData = async (account: string, vaultConfig: VaultConfig): Promise<any> => {
  try {
    const globalVaultStakedToBnbContract = getGlobalVaultStakedToBnbContract()

    const allowance = await globalVaultStakedToBnbContract.methods.balanceOf(account).call()
    const stakingTokenBalance = await globalVaultStakedToBnbContract.methods.balanceOf(account).call()
    const stakedBalance = await globalVaultStakedToBnbContract.methods.balanceOf(account).call()
    const pendingReward = await globalVaultStakedToBnbContract.methods.earned(account).call()

    return {
      userData: {
        allowance: new BigNumber(allowance).toJSON(),
        stakingTokenBalance: new BigNumber(stakingTokenBalance).toJSON(),
        stakedBalance: new BigNumber(stakedBalance).toJSON(),
        pendingReward: new BigNumber(pendingReward).toJSON(),
      },
    }
  } catch (error) {
    return error
  }
}
