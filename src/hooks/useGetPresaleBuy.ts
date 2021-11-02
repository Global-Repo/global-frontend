import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getAddress, getWbnbAddress } from 'utils/addressHelpers'
import { getBep20Contract, getGlobalContract, getGlobalPresaleContract } from '../utils/contractHelpers'
import { BIG_ZERO } from '../utils/bigNumber'
import useWeb3 from './useWeb3'
import useRefresh from './useRefresh'
import useLastUpdated from './useLastUpdated'

type useGetPresaleBuyState = {
  balance: BigNumber
  fetchStatus: FetchStatus
}

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed',
}

const useGetPresaleBuy = (tokenAddress: string) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus
  const [balanceState, setBalanceState] = useState<useGetPresaleBuyState>({
    balance: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  })
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress)
      try {
        const res = await contract.methods.balanceOf(account).call()
        setBalanceState({ balance: new BigNumber(res), fetchStatus: SUCCESS })
      } catch (e) {
        console.error(e)
        setBalanceState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }))
      }
    }

    if (account) {
      fetchBalance()
    }
  }, [account, tokenAddress, fastRefresh, SUCCESS, FAILED])

  return balanceState
}


export const useBuyPresale = () => {
  const [balance, setBalance] = useState(BIG_ZERO)
  const { account } = useWeb3React()
  const web3 = useWeb3()

  useEffect(() => {

    const fetchBalance = async () => {

      const walletBalance = await web3.eth.getBalance(account)
      console.log("balance in wallet", walletBalance)
      setBalance(new BigNumber(walletBalance))
      const tokenAddressbnb = getWbnbAddress()
      const contract = getBep20Contract(tokenAddressbnb)
      console.log(contract)
      const res = await contract.methods.balanceOf(account).call()

    }
    if (account) {
      fetchBalance()
    }


  }, [account, web3, setBalance])

  return { balance }
}


export const useGetBnbBalance = () => {
  const [balance, setBalance] = useState(BIG_ZERO)
  const { account } = useWeb3React()
  const { lastUpdated, setLastUpdated } = useLastUpdated()
  const web3 = useWeb3()

  useEffect(() => {
    const fetchBalance = async () => {
      const walletBalance = await web3.eth.getBalance(account)
      setBalance(new BigNumber(walletBalance))
    }
    if (account) {
      fetchBalance()
    }

  }, [account, web3, lastUpdated, setBalance])

  return { balance, refresh: setLastUpdated }
}

export default useGetPresaleBuy
