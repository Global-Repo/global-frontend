import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { useAppDispatch } from 'state'
import { updateUserAllowance } from 'state/actions'
import { approve } from 'utils/callHelpers'
import { getVaultContract } from 'utils/contractHelpers'

import { useTranslation } from 'contexts/Localization'
import {
  useMasterchef,
  useCake,
  useSousChef,
  useLottery,
  useCakeVaultContract,
  useSousChefGlobalVaults,
  useLockedVaultContract, useGlobal,
} from './useContract'
import useToast from './useToast'
import useLastUpdated from './useLastUpdated'
import { fetchGlobalVaultsUserData } from '../state/vaults'

// Approve a Farm
export const useApprove = (lpContract: Contract) => {
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}

// Approve a Pool
export const useSousApprove = (lpContract: Contract, sousId, earningTokenSymbol) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const sousChefContract = useSousChef(sousId)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const tx = await approve(lpContract, sousChefContract, account)
      dispatch(updateUserAllowance(sousId, account))
      if (tx) {
        toastSuccess(
          t('Contract Enabled'),
          t('You can now stake in the %symbol% pool!', { symbol: earningTokenSymbol }),
        )
        setRequestedApproval(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), e?.message)
    }
  }, [account, dispatch, lpContract, sousChefContract, sousId, earningTokenSymbol, t, toastError, toastSuccess])

  return { handleApprove, requestedApproval }
}

// export const useVaultLocked = (setLastUpdated: () => void) => {
export const useVaultLocked = () => {
  const { account } = useWeb3React()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const lockedVaultContract = useLockedVaultContract()
  const globalContract = useGlobal()

  const handleApprove = () => {
    globalContract.methods
        .approve(lockedVaultContract.options.address, ethers.constants.MaxUint256)
        .send({ from: account })
        .on('sending', () => {
          setRequestedApproval(true)
        })
        .on('receipt', () => {
          toastSuccess(t('Contract Enabled'), t('You can now stake in the %symbol% vault!', { symbol: 'GLOBAL' }))
          // setLastUpdated()
          setRequestedApproval(false)
        })
        .on('error', (error) => {
          console.error(error)
          toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
          setRequestedApproval(false)
        })
  }

  return { handleApprove, requestedApproval }
}

// Approve CAKE auto pool
export const useVaultApprove = (setLastUpdated: () => void) => {
  const { account } = useWeb3React()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const cakeVaultContract = useCakeVaultContract()
  const cakeContract = useCake()

  const handleApprove = () => {
    cakeContract.methods
      .approve(cakeVaultContract.options.address, ethers.constants.MaxUint256)
      .send({ from: account })
      .on('sending', () => {
        setRequestedApproval(true)
      })
      .on('receipt', () => {
        toastSuccess(t('Contract Enabled'), t('You can now stake in the %symbol% vault!', { symbol: 'CAKE' }))
        setLastUpdated()
        setRequestedApproval(false)
      })
      .on('error', (error) => {
        console.error(error)
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproval(false)
      })
  }

  return { handleApprove, requestedApproval }
}

export const useCheckVaultApprovalStatus = () => {
  const [isVaultApproved, setIsVaultApproved] = useState(false)
  const { account } = useWeb3React()
  const cakeContract = useCake()
  const cakeVaultContract = useCakeVaultContract()
  const { lastUpdated, setLastUpdated } = useLastUpdated()
  useEffect(() => {
    const checkApprovalStatus = async () => {
      try {
        const response = await cakeContract.methods.allowance(account, cakeVaultContract.options.address).call()
        const currentAllowance = new BigNumber(response)
        setIsVaultApproved(currentAllowance.gt(0))
      } catch (error) {
        setIsVaultApproved(false)
      }
    }

    checkApprovalStatus()
  }, [account, cakeContract, cakeVaultContract, lastUpdated])

  return { isVaultApproved, setLastUpdated }
}
export const useCheckOwnVaultApprovalStatus = () => {
  const [isVaultApproved, setIsVaultApproved] = useState(false)
  const { account } = useWeb3React()
  const cakeContract = getVaultContract()
  const cakeVaultContract = useCakeVaultContract();
  const { lastUpdated, setLastUpdated } = useLastUpdated()
  useEffect(() => {
    const checkApprovalStatus = async () => {
      try {
        const response = await cakeContract.methods.allowance(account, cakeVaultContract.options.address).call()
        const currentAllowance = new BigNumber(response)
        setIsVaultApproved(currentAllowance.gt(0))
      } catch (error) {
        setIsVaultApproved(false)
      }
    }

    checkApprovalStatus()
  }, [account, cakeContract, cakeVaultContract, lastUpdated])

  return { isVaultApproved, setLastUpdated }
}

export const useApproveVault = () => {
  const { account } = useWeb3React()
  const cakeContract = useCake()
  const lotteryContract = useVaultContract();

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(cakeContract, lotteryContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, cakeContract, lotteryContract])

  return { onApprove: handleApprove }
}

// Approve the lottery
export const useLotteryApprove = () => {
  const { account } = useWeb3React()
  const cakeContract = useCake()
  const lotteryContract = useLottery()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(cakeContract, lotteryContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, cakeContract, lotteryContract])

  return { onApprove: handleApprove }
}

// Approve an IFO
export const useIfoApprove = (tokenContract: Contract, spenderAddress: string) => {
  const { account } = useWeb3React()
  const onApprove = useCallback(async () => {
    const tx = await tokenContract.methods.approve(spenderAddress, ethers.constants.MaxUint256).send({ from: account })
    return tx
  }, [account, spenderAddress, tokenContract])

  return onApprove
}

// Approve a Global Vault
export const useGlobalVaultApprove = (lpContract: Contract, sousId, earningTokenSymbol) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const sousChefContract = useSousChefGlobalVaults(sousId)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const tx = await approve(lpContract, sousChefContract, account)
      dispatch(fetchGlobalVaultsUserData(account))
      if (tx) {
        toastSuccess(
          t('Contract Enabled'),
          t('You can now stake in the %symbol% pool!', { symbol: earningTokenSymbol }),
        )
        setRequestedApproval(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), e?.message)
    }
  }, [account, dispatch, lpContract, sousChefContract, earningTokenSymbol, t, toastError, toastSuccess])

  return { handleApprove, requestedApproval }
}
function useVaultContract() {
  throw new Error('Function not implemented.')
}

