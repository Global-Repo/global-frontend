import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from 'utils/web3'
import { ChainId } from '@duhd4h/global-sdk'
import { poolsConfig, vaultsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'

// Addresses
import {
  getAddress,
  getPancakeProfileAddress,
  getPancakeRabbitsAddress,
  getBunnyFactoryAddress,
  getBunnySpecialAddress,
  getCakeAddress,
  getLotteryAddress,
  getLotteryTicketAddress,
  getLotteryV2Address,
  getMasterChefAddress,
  getPointCenterIfoAddress,
  getClaimRefundAddress,
  getTradingCompetitionAddress,
  getEasterNftAddress,
  getCakeVaultAddress,
  getPredictionsAddress,
  getChainlinkOracleAddress,
  getMulticallAddress,
  getGlobalVaultLockedAddress,
  getGlobalVaultStakedToBnbAddress,
  getGlobalVaultStakedToGlobalAddress,
  getGlobalVaultVestedAddress,
  getGlobalVaultCakeAddress,
  getGlobalAddress,
  getGlobalVaultCakeMaximizerAddress
} from 'utils/addressHelpers'

// ABI
import profileABI from 'config/abi/pancakeProfile.json'
import pancakeRabbitsAbi from 'config/abi/pancakeRabbits.json'
import bunnyFactoryAbi from 'config/abi/bunnyFactory.json'
import bunnySpecialAbi from 'config/abi/bunnySpecial.json'
import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import cakeAbi from 'config/abi/cake.json'
import globalAbi from 'config/abi/global.json'
import ifoV1Abi from 'config/abi/ifoV1.json'
import ifoV2Abi from 'config/abi/ifoV2.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import lotteryAbi from 'config/abi/lottery.json'
import lotteryTicketAbi from 'config/abi/lotteryNft.json'
import lotteryV2Abi from 'config/abi/lotteryV2.json'
import masterChef from 'config/abi/masterchef.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefV2 from 'config/abi/sousChefV2.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import claimRefundAbi from 'config/abi/claimRefund.json'
import tradingCompetitionAbi from 'config/abi/tradingCompetition.json'
import easterNftAbi from 'config/abi/easterNft.json'
import cakeVaultAbi from 'config/abi/cakeVault.json'
import predictionsAbi from 'config/abi/predictions.json'
import chainlinkOracleAbi from 'config/abi/chainlinkOracle.json'
import MultiCallAbi from 'config/abi/Multicall.json'
import globalVaultLockedAbi from 'config/abi/globalVaultLocked.json'
import globalVaultVestedAbi from 'config/abi/globalVaultVested.json'
import globalVaultStakedToBnbAbi from 'config/abi/globalVaultStakedToBnb.json'
import globalVaultStakedToGlobalAbi from 'config/abi/globalVaultStakedToGlobal.json'
import globalVaultCakeAbi from 'config/abi/globalVaultCake.json'
import globalVaultCakeMaximizerAbi from 'config/abi/globalVaultCakeMaximizerAbi.json'
import { DEFAULT_GAS_PRICE } from 'config'
import { getSettings, getGasPriceInWei } from './settings'

export const getDefaultGasPrice = () => {
  const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
  if (chainId === ChainId.BSCTESTNET) {
    return 10
  }
  return DEFAULT_GAS_PRICE
}

const getContract = (abi: any, address: string, web3?: Web3, account?: string) => {
  const _web3 = web3 ?? web3NoAccount
  const gasPrice = account ? getSettings(account).gasPrice : getDefaultGasPrice()

  return new _web3.eth.Contract(abi as unknown as AbiItem, address, {
    gasPrice: getGasPriceInWei(gasPrice).toString(),
  })
}

export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract(bep20Abi, address, web3)
}
export const getErc721Contract = (address: string, web3?: Web3) => {
  return getContract(erc721Abi, address, web3)
}
export const getLpContract = (address: string, web3?: Web3) => {
  return getContract(lpTokenAbi, address, web3)
}
export const getIfoV1Contract = (address: string, web3?: Web3) => {
  return getContract(ifoV1Abi, address, web3)
}
export const getIfoV2Contract = (address: string, web3?: Web3) => {
  return getContract(ifoV2Abi, address, web3)
}
export const getSouschefContract = (id: number, web3?: Web3) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  return getContract(abi, getAddress(config.contractAddress), web3)
}
export const getGlobalVaultsSouschefContract = (id: number, web3?: Web3) => {
  const config = vaultsConfig.find((vault) => vault.sousId === id)
  const abi = sousChef
  return getContract(abi, getAddress(config.contractAddress), web3)
}
export const getSouschefV2Contract = (id: number, web3?: Web3) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  return getContract(sousChefV2, getAddress(config.contractAddress), web3)
}
export const getPointCenterIfoContract = (web3?: Web3) => {
  return getContract(pointCenterIfo, getPointCenterIfoAddress(), web3)
}
export const getCakeContract = (web3?: Web3) => {
  return getContract(cakeAbi, getCakeAddress(), web3)
}
export const getGlobalContract = (web3?: Web3) => {
  return getContract(globalAbi, getGlobalAddress(), web3)
}
export const getProfileContract = (web3?: Web3) => {
  return getContract(profileABI, getPancakeProfileAddress(), web3)
}
export const getPancakeRabbitContract = (web3?: Web3) => {
  return getContract(pancakeRabbitsAbi, getPancakeRabbitsAddress(), web3)
}
export const getBunnyFactoryContract = (web3?: Web3) => {
  return getContract(bunnyFactoryAbi, getBunnyFactoryAddress(), web3)
}
export const getBunnySpecialContract = (web3?: Web3) => {
  return getContract(bunnySpecialAbi, getBunnySpecialAddress(), web3)
}
export const getLotteryContract = (web3?: Web3) => {
  return getContract(lotteryAbi, getLotteryAddress(), web3)
}
export const getLotteryTicketContract = (web3?: Web3) => {
  return getContract(lotteryTicketAbi, getLotteryTicketAddress(), web3)
}
export const getLotteryV2Contract = (web3?: Web3) => {
  return getContract(lotteryV2Abi, getLotteryV2Address(), web3)
}
export const getMasterchefContract = (web3?: Web3) => {
  return getContract(masterChef, getMasterChefAddress(), web3)
}
export const getClaimRefundContract = (web3?: Web3) => {
  return getContract(claimRefundAbi, getClaimRefundAddress(), web3)
}
export const getTradingCompetitionContract = (web3?: Web3) => {
  return getContract(tradingCompetitionAbi, getTradingCompetitionAddress(), web3)
}
export const getEasterNftContract = (web3?: Web3) => {
  return getContract(easterNftAbi, getEasterNftAddress(), web3)
}
export const getCakeVaultContract = (web3?: Web3) => {
  return getContract(cakeVaultAbi, getCakeVaultAddress(), web3)
}
export const getPredictionsContract = (web3?: Web3) => {
  return getContract(predictionsAbi, getPredictionsAddress(), web3)
}
export const getChainlinkOracleContract = (web3?: Web3) => {
  return getContract(chainlinkOracleAbi, getChainlinkOracleAddress(), web3)
}
export const getMulticallContract = (web3?: Web3) => {
  return getContract(MultiCallAbi, getMulticallAddress(), web3)
}

/* VAULTS */
export const getGlobalVaultCakeContract = (web3?: Web3) => {
  return getContract(globalVaultCakeAbi, getGlobalVaultCakeAddress(), web3)
}
export const getGlobalVaultLockedContract = (web3?: Web3) => {
  return getContract(globalVaultLockedAbi, getGlobalVaultLockedAddress(), web3)
}
export const getGlobalVaultVestedContract = (web3?: Web3) => {
  return getContract(globalVaultVestedAbi, getGlobalVaultVestedAddress(), web3)
}
export const getGlobalVaultStakedToBnbContract = (web3?: Web3) => {
  return getContract(globalVaultStakedToBnbAbi, getGlobalVaultStakedToBnbAddress(), web3)
}
export const getGlobalVaultStakedToGlobalContract = (web3?: Web3) => {
  return getContract(globalVaultStakedToGlobalAbi, getGlobalVaultStakedToGlobalAddress(), web3)
}

// VAULTS DEL OPIMIZER

export const getGlobalVaultCakeMaximizerContract = (web3?: Web3) => {
  return getContract(globalVaultCakeMaximizerAbi, getGlobalVaultCakeMaximizerAddress(), web3)
}
