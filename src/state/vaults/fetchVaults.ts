import BigNumber from 'bignumber.js'
import {
  getGlobalVaultStakedToBnbContract,
  getGlobalVaultStakedToGlobalContract,
  getGlobalVaultVestedContract,
} from '../../utils/contractHelpers'
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
    const globalVaultStakedToBnbContract = getGlobalVaultStakedToGlobalContract()

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

export const fetchGlobalVaultVestedPublicData = async (vaultConfig: VaultConfig): Promise<any> => {
  try {
    const contract = getGlobalVaultVestedContract()

    const { fee, interval } = await contract.methods.penaltyFees().call()

    return {
      totalStaked: BIG_ZERO.toJSON(),
      vaultApr: [{ token: tokens.global, apr: 0.5 }],
      earningTokensPrice: [{ token: tokens.global, earningTokenPrice: 20 }],
      penaltyFee: {
        interval,
        fee,
      },
    }
    // return new BigNumber(stakingToken)
  } catch (error) {
    return error
  }
}
export const fetchGlobalVaultLockedPublicData = async (vaultConfig: VaultConfig): Promise<any> => {
  try {
    const contract = getGlobalVaultVestedContract()

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
export const fetchGlobalVaultCakePublicData = async (vaultConfig: VaultConfig): Promise<any> => {
  try {
    const contract = getGlobalVaultVestedContract()

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
    const contract = getGlobalVaultStakedToBnbContract()

    const allowance = await contract.methods.balanceOf(account).call()
    const stakingTokenBalance = await contract.methods.balanceOf(account).call()
    const stakedBalance = await contract.methods.balanceOf(account).call()
    const pendingReward = await contract.methods.earned(account).call()

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

export const fetchGlobalVaultStakedToGlobalUserData = async (
  account: string,
  vaultConfig: VaultConfig,
): Promise<any> => {
  try {
    const contract = getGlobalVaultStakedToGlobalContract()

    const allowance = await contract.methods.balanceOf(account).call()
    const stakingTokenBalance = await contract.methods.balanceOf(account).call()
    const stakedBalance = await contract.methods.balanceOf(account).call()
    const pendingReward = await contract.methods.earned(account).call()

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

export const fetchGlobalVaultVestedUserData = async (account: string, vaultConfig: VaultConfig): Promise<any> => {
  try {
    const contract = getGlobalVaultVestedContract()

    const allowance = await contract.methods.balanceOf(account).call()
    const stakingTokenBalance = await contract.methods.balanceOf(account).call()
    const stakedBalance = await contract.methods.balanceOf(account).call()
    const pendingReward = await contract.methods.earned(account).call()

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

export const fetchGlobalVaultLockedUserData = async (account: string, vaultConfig: VaultConfig): Promise<any> => {
  try {
    const contract = getGlobalVaultVestedContract()

    const allowance = await contract.methods.balanceOf(account).call()
    const stakingTokenBalance = await contract.methods.balanceOf(account).call()
    const stakedBalance = await contract.methods.balanceOf(account).call()
    const pendingReward = await contract.methods.earned(account).call()

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

export const fetchGlobalVaultCakeUserData = async (account: string, vaultConfig: VaultConfig): Promise<any> => {
  try {
    const contract = getGlobalVaultVestedContract()

    const allowance = await contract.methods.balanceOf(account).call()
    const stakingTokenBalance = await contract.methods.balanceOf(account).call()
    const stakedBalance = await contract.methods.balanceOf(account).call()
    const pendingReward = await contract.methods.earned(account).call()

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
