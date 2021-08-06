import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { useMasterchef } from './useContract'
import useRefresh from './useRefresh'

/**
 * A hook to check whether a user can harvest the earned amount.
 */
const useCanHarvest = (pid: number) => {
  const [canHarvest, setCanHarvest] = useState(false)
  const { account } = useWeb3React()
  const masterchefContract = useMasterchef()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchCanHarvest = async () => {
      // const res: boolean = await masterchefContract.methods.canHarvest(pid, account).call()
      const res = true
      // TODO JOAN - read canHarvest value when ABI updated
      setCanHarvest(res)
    }

    if (account) {
      fetchCanHarvest()
    }
  }, [account, masterchefContract, fastRefresh, pid])

  return canHarvest
}

export default useCanHarvest
