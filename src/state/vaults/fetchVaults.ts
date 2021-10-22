import BigNumber from 'bignumber.js'
import {
  getGlobalContract,
  getGlobalVaultCakeContract,
  getGlobalVaultLockedContract,
  getGlobalVaultStakedToBnbContract,
  getGlobalVaultStakedToGlobalContract,
  getGlobalVaultVestedContract,
  getGlobalVaultCakeMaximizerContract,
  getGlobalVaultMixStrategyContract,
  getGlobalVaultGlobalMaximizerContract,
} from '../../utils/contractHelpers'
import { BIG_ZERO } from '../../utils/bigNumber'
import { VaultConfig } from '../../config/constants/types'
import tokens from '../../config/constants/tokens'
import { getAddress, getGlobalVaultLockedAddress } from '../../utils/addressHelpers'

export const fetchGlobalVaultStakedToBnbPublicData = async (vaultConfig: VaultConfig, prices: any): Promise<any> => {
  try {
    const contract = getGlobalVaultStakedToBnbContract()

    const totalStaked = await contract.methods.balance().call()

    const stakingTokenAddress = vaultConfig.stakingToken.address
      ? getAddress(vaultConfig.stakingToken.address).toLowerCase()
      : null
    const stakingTokenPrice = stakingTokenAddress ? prices[stakingTokenAddress] : 0

    const earningTokenAddress = vaultConfig.earningToken[0].address
      ? getAddress(vaultConfig.earningToken[0].address).toLowerCase()
      : null
    const earningTokenPrice = earningTokenAddress ? prices[earningTokenAddress] : 0

    return {
      totalStaked: new BigNumber(totalStaked).toJSON(),
      vaultApr: [{ token: tokens.bnb, apr: 0.5 }], // APR to be return by BE in a different contract
      earningTokensPrice: [{ token: tokens.bnb, earningTokenPrice }],
      stakingTokenPrice: [{ token: tokens.global, stakingTokenPrice }],
    }
  } catch (error) {
    return error
  }
}

export const fetchGlobalVaultStakedToGlobalPublicData = async (vaultConfig: VaultConfig, prices: any): Promise<any> => {
  try {
    const contract = getGlobalVaultStakedToGlobalContract()

    const totalStaked = await contract.methods.balance().call()

    const stakingTokenAddress = vaultConfig.stakingToken.address
      ? getAddress(vaultConfig.stakingToken.address).toLowerCase()
      : null
    const stakingTokenPrice = stakingTokenAddress ? prices[stakingTokenAddress] : 0

    const earningTokenAddress = vaultConfig.earningToken[0].address
      ? getAddress(vaultConfig.earningToken[0].address).toLowerCase()
      : null
    const earningTokenPrice = earningTokenAddress ? prices[earningTokenAddress] : 0

    return {
      totalStaked: new BigNumber(totalStaked).toJSON(),
      vaultApr: [{ token: tokens.bnb, apr: 0.5 }], // APR to be return by BE in a different contract
      earningTokensPrice: [{ token: tokens.bnb, earningTokenPrice }],
      stakingTokenPrice: [{ token: tokens.global, stakingTokenPrice }],
    }
  } catch (error) {
    return error
  }
}

export const fetchGlobalVaultVestedPublicData = async (vaultConfig: VaultConfig, prices: any): Promise<any> => {
  try {
    const contract = getGlobalVaultVestedContract()

    const totalStaked = await contract.methods.balance().call()

    const stakingTokenAddress = vaultConfig.stakingToken.address
      ? getAddress(vaultConfig.stakingToken.address).toLowerCase()
      : null
    const stakingTokenPrice = stakingTokenAddress ? prices[stakingTokenAddress] : 0

    const earningTokenAddress = vaultConfig.earningToken[0].address
      ? getAddress(vaultConfig.earningToken[0].address).toLowerCase()
      : null
    const earningTokenPrice = earningTokenAddress ? prices[earningTokenAddress] : 0

    const { fee, interval } = await contract.methods.penaltyFees().call()

    return {
      totalStaked: new BigNumber(totalStaked).toJSON(),
      vaultApr: [{ token: tokens.bnb, apr: 0.5 }], // APR to be return by BE in a different contract
      earningTokensPrice: [{ token: tokens.bnb, earningTokenPrice }],
      stakingTokenPrice: [{ token: tokens.global, stakingTokenPrice }],
      penaltyFee: {
        interval,
        fee,
      },
    }
  } catch (error) {
    return error
  }
}

export const fetchGlobalVaultLockedPublicData = async (vaultConfig: VaultConfig, prices: any): Promise<any> => {
  try {
    const contract = getGlobalVaultLockedContract()

    return {
      totalStaked: BIG_ZERO.toJSON(),
      vaultApr: [{ token: tokens.global, apr: 0.5 }],
      earningTokensPrice: [{ token: tokens.global, earningTokenPrice: 20 }],
      stakingTokenPrice: [{ token: tokens.global, earningTokenPrice: 20 }],
    }
    // return new BigNumber(stakingToken)
  } catch (error) {
    return error
  }
}
export const fetchGlobalVaultCakePublicData = async (vaultConfig: VaultConfig, prices: any): Promise<any> => {
  try {
    const contract = getGlobalVaultCakeContract()

    return {
      totalStaked: BIG_ZERO.toJSON(),
      vaultApr: [{ token: tokens.global, apr: 0.5 }],
      earningTokensPrice: [{ token: tokens.global, earningTokenPrice: 20 }],
      stakingTokenPrice: [{ token: tokens.global, earningTokenPrice: 20 }],
    }
    // return new BigNumber(stakingToken)
  } catch (error) {
    return error
  }
}

export const fetchGlobalVaultStakedToBnbUserData = async (account: string, vaultConfig: VaultConfig): Promise<any> => {
  try {
    const vaultContract = getGlobalVaultLockedContract()
    const globalContract = getGlobalContract()

    const allowance = await globalContract.methods.allowance(account, getGlobalVaultLockedAddress()).call()
    const stakingTokenBalance = await globalContract.methods.balanceOf(account).call()
    const stakedBalance = await vaultContract.methods.balanceOf(account).call()
    // const pendingReward = await vaultContract.methods.earned(account).call()

    /*
    const stakingTokenBalance = await globalContract.methods.balanceOf(account).call()
    const stakedBalance = await vaultContract.methods.balanceOf(account).call() // TODO
     */

    return {
      userData: {
        allowance: new BigNumber(allowance).toJSON(),
        stakingTokenBalance: new BigNumber(stakingTokenBalance).toJSON(),
        stakedBalance: new BigNumber(stakedBalance).toJSON(),
        pendingReward: new BigNumber(stakedBalance).toJSON(),
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


// Funciones hechas el 19/10/2021 para Optimizer - Functions made on 19/10/2021 for the Optimizer


export const fetchGlobalVaultCakeMaximizerPublicData = async (vaultConfig: VaultConfig, prices: any): Promise<any> => {
  try {
    const contract = getGlobalVaultCakeMaximizerContract()

    return {
      totalStaked: BIG_ZERO.toJSON(),
      vaultApr: [{ token: tokens.global, apr: 0.5 }],
      earningTokensPrice: [{ token: tokens.global, earningTokenPrice: 20 }],
      stakingTokenPrice: [{ token: tokens.global, earningTokenPrice: 20 }],
    }
    // return new BigNumber(stakingToken)

    // return console.log(contract, " - Contrato Cake Maximizer")

  } catch (error) {
    return error
  }
}

export const fetchGlobalVaultCakeMaximizerUserData = async (account: string, vaultConfig: VaultConfig): Promise<any> => {
  try {
    const contract = getGlobalVaultCakeMaximizerContract()

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

    // return console.log(contract, " - Contrato Cake Maximizer")

  } catch (error) {
    return error
  }
}

export const fetchGlobalVaultMixStrategyPublicData = async (vaultConfig: VaultConfig, prices: any): Promise<any> => {
  try {
    const contract = getGlobalVaultMixStrategyContract()

    return {
      totalStaked: BIG_ZERO.toJSON(),
      vaultApr: [{ token: tokens.global, apr: 0.5 }],
      earningTokensPrice: [{ token: tokens.global, earningTokenPrice: 20 }],
      stakingTokenPrice: [{ token: tokens.global, earningTokenPrice: 20 }],
    }
    // return new BigNumber(stakingToken)

    // return console.log(contract, " - Contrato Cake Maximizer")

  } catch (error) {
    return error
  }
}

export const fetchGlobalVaultMixStrategyUserData = async (account: string, vaultConfig: VaultConfig): Promise<any> => {
  try {
    const contract = getGlobalVaultMixStrategyContract()

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

    // return console.log(contract, " - Contrato Cake Maximizer")

  } catch (error) {
    return error
  }
}

export const fetchGlobalVaultGlobalMaximizerPublicData = async (vaultConfig: VaultConfig, prices: any): Promise<any> => {
  try {
    const contract = getGlobalVaultGlobalMaximizerContract()

    return {
      totalStaked: BIG_ZERO.toJSON(),
      vaultApr: [{ token: tokens.global, apr: 0.5 }],
      earningTokensPrice: [{ token: tokens.global, earningTokenPrice: 20 }],
      stakingTokenPrice: [{ token: tokens.global, earningTokenPrice: 20 }],
    }
    // return new BigNumber(stakingToken)

    // return console.log(contract, " - Contrato Cake Maximizer")

  } catch (error) {
    return error
  }
}

export const fetchGlobalVaultGlobalMaximizerUserData = async (account: string, vaultConfig: VaultConfig): Promise<any> => {
  try {
    const contract = getGlobalVaultGlobalMaximizerContract()

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

    // return console.log(contract, " - Contrato Cake Maximizer")

  } catch (error) {
    return error
  }
}