import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { getLotteryAddress, getVaultAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { getGlobalContract } from 'utils/contractHelpers'

import { useCake, useGlobal, useLockedVaultContract } from './useContract'
import useRefresh from './useRefresh'

// Retrieve lottery allowance
export const useLotteryAllowance = () => {
  const [allowance, setAllowance] = useState(BIG_ZERO)
  const { account } = useWeb3React()
  const globalContract = useCake()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchAllowance = async () => {
      const res = await globalContract.methods.allowance(account, getLotteryAddress()).call()
      setAllowance(new BigNumber(res))
    }

    if (account) {
      fetchAllowance()
    }
  }, [account, globalContract, fastRefresh])

  return allowance
}

// Retrieve IFO allowance
export const useIfoAllowance = (tokenContract: Contract, spenderAddress: string, dependency?: any): BigNumber => {
  const { account } = useWeb3React()
  const [allowance, setAllowance] = useState(BIG_ZERO)
  
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await tokenContract.methods.allowance(account, spenderAddress).call()
        setAllowance(new BigNumber(res))
      } catch (e) {
        console.error(e)
      }
    }

    if (account) {
      fetch()
    }
  }, [account, spenderAddress, tokenContract, dependency])

  return allowance
}

export const useGlobalAllowance = () => {
  const { account } = useWeb3React()
  const contract = useGlobal()
  const lockedVaultContract = useLockedVaultContract()
  const [allowance, setAllowance] = useState(BIG_ZERO)
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getGlobalContract().methods.allowance(account, getVaultAddress()).call();
        /* const res = await contract.methods.allowance(account, lockedVaultContract.options.address).call()  */
        setAllowance(new BigNumber(res))
      } catch (e) {
        console.error(e)
      }
    }

    if (account) {
      fetch()
    }
  }, [account, lockedVaultContract, contract, fastRefresh])

  return allowance

}