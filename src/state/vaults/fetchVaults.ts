import BigNumber from 'bignumber.js'
import {
  getGlobalContract,
  getGlobalVaultCakeContract,
  getGlobalVaultLockedContract,
  getGlobalVaultStakedToBnbContract,
  getGlobalVaultStakedToGlobalContract,
  getGlobalVaultVestedContract,
} from '../../utils/contractHelpers'
import { EarningTokenPrice, SerializedBigNumber, VaultApr } from '../types'
import { BIG_ZERO } from '../../utils/bigNumber'
import { VaultConfig } from '../../config/constants/types'
import tokens from '../../config/constants/tokens'
import { getGlobalVaultLockedAddress } from '../../utils/addressHelpers'

export const fetchGlobalVaultStakedToBnbPublicData = async (
  vaultConfig: VaultConfig,
): Promise<{
  totalStaked: SerializedBigNumber
  vaultApr: VaultApr[]
  earningTokensPrice: EarningTokenPrice[]
}> => {
  try {
    const contract = getGlobalVaultStakedToBnbContract()

    const totalStaked = await contract.methods.balance().call()

    /* const totalStaked = await globalVaultStakedToBnbContract.methods.stakingToken().call()
    const stakingToken = await globalVaultStakedToBnbContract.methods.stakingToken().call() */

    return {
      totalStaked: new BigNumber(totalStaked).toJSON(),
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
      totalStaked: BIG_ZERO.toJSON(), // totalsupply
      vaultApr: [{ token: tokens.global, apr: 0.5 }],
      earningTokensPrice: [{ token: tokens.global, earningTokenPrice: 20 }], // earned ABI -> locked en te 2, mirar com es fa la conversio
      // earningTokensPrice -> llegir-ho de les farms 1 i 2
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
    const contract = getGlobalVaultLockedContract()

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
    const contract = getGlobalVaultCakeContract()

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
    const vaultContract = getGlobalVaultLockedContract()
    const globalContract = getGlobalContract()

    const allowance = await globalContract.methods.allowance(account, getGlobalVaultLockedAddress()).call()
    const stakingTokenBalance = await globalContract.methods.balanceOf(account).call()
    const stakedBalance = await vaultContract.methods.balanceOf(account).call() // TODO
    const pendingReward = await vaultContract.methods.globalToEarn(account).call()

    console.log(stakedBalance)

    return {
      userData: {
        allowance: new BigNumber(allowance).toJSON(),
        stakingTokenBalance: new BigNumber(stakingTokenBalance).toJSON(),
        stakedBalance: new BigNumber(stakedBalance).toJSON(), // Mirar que es o si es necessita
        pendingReward: new BigNumber(pendingReward).toJSON(), // globalToEarn i bnbToEarn
      },
    }
  } catch (error) {
    return error
  }
}

export const fetchGlobalVaultCakeUserData = async (account: string, vaultConfig: VaultConfig): Promise<any> => {
  try {
    const contract = getGlobalVaultCakeContract()

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
