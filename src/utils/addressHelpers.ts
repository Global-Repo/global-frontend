import { ChainId } from '@duhd4h/global-sdk'
import addresses from 'config/constants/contracts'
import tokens from 'config/constants/tokens'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[ChainId.MAINNET]
}

export const getCakeAddress = () => {
  return getAddress(tokens.cake.address)
}
export const getGlobalAddress = () => {
  return getAddress(tokens.global.address)
}
export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}
export const getWbnbAddress = () => {
  return getAddress(tokens.wbnb.address)
}
export const getLotteryAddress = () => {
  return getAddress(addresses.lottery)
}
export const getLotteryTicketAddress = () => {
  return getAddress(addresses.lotteryNFT)
}
export const getLotteryV2Address = () => {
  return getAddress(addresses.lotteryV2)
}
export const getPancakeProfileAddress = () => {
  return getAddress(addresses.pancakeProfile)
}
export const getPancakeRabbitsAddress = () => {
  return getAddress(addresses.pancakeRabbits)
}
export const getBunnyFactoryAddress = () => {
  return getAddress(addresses.bunnyFactory)
}
export const getClaimRefundAddress = () => {
  return getAddress(addresses.claimRefund)
}
export const getPointCenterIfoAddress = () => {
  return getAddress(addresses.pointCenterIfo)
}
export const getBunnySpecialAddress = () => {
  return getAddress(addresses.bunnySpecial)
}
export const getTradingCompetitionAddress = () => {
  return getAddress(addresses.tradingCompetition)
}
export const getEasterNftAddress = () => {
  return getAddress(addresses.easterNft)
}
export const getCakeVaultAddress = () => {
  return getAddress(addresses.cakeVault)
}
export const getPredictionsAddress = () => {
  return getAddress(addresses.predictions)
}
export const getChainlinkOracleAddress = () => {
  return getAddress(addresses.chainlinkOracle)
}
export const getGlobalVaultCakeAddress = () => {
  return getAddress(addresses.globalVaultCake)
}
export const getGlobalVaultLockedAddress = () => {
  return getAddress(addresses.globalVaultLocked)
}
export const getGlobalVaultVestedAddress = () => {
  return getAddress(addresses.globalVaultVested)
}
export const getGlobalVaultStakedToBnbAddress = () => {
  return getAddress(addresses.globalVaultStakedToBnb)
}
export const getGlobalVaultStakedToGlobalAddress = () => {
  return getAddress(addresses.globalVaultStakedToGlobal)
}

// Adresses Optimizer
export const getGlobalVaultCakeMaximizerAddress = () => {
  return getAddress(addresses.globalVaultCakeMaximizer)
}
export const getGlobalVaultMixStrategyAddress = () => {
  return getAddress(addresses.globalVaultMixStrategy)
}
export const getGlobalVaultGlobalMaximizerAddress = () => {
  return getAddress(addresses.globalVaultGlobalMaximizer)
}
