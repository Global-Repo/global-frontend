import React from 'react'
import { Flex, Text, IconButton, AddIcon, MinusIcon, useModal, Skeleton } from '@duhd4h/global-uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { Pool } from 'state/types'
import { useCakeVault, usePriceGlobalBusd } from 'state/hooks'
import Balance from 'components/Balance'
import NotEnoughTokensModal from '../../PoolCard/Modals/NotEnoughTokensModal'
import { convertSharesToCake } from '../../../helpers'
import VaultStakeModal from '../VaultStakeModal'

interface HasStakeActionProps {
  pool: Pool
  stakingTokenBalance: BigNumber
}

const HasSharesActions: React.FC<HasStakeActionProps> = ({ pool, stakingTokenBalance }) => {
  const {
    userData: { userShares },
    pricePerFullShare,
  } = useCakeVault()
  const { stakingToken } = pool
  const { cakeAsBigNumber, cakeAsNumberBalance } = convertSharesToCake(userShares, pricePerFullShare)
  const globalPriceBusd = usePriceGlobalBusd()
  const stakedDollarValue = globalPriceBusd.gt(0)
    ? getBalanceNumber(cakeAsBigNumber.multipliedBy(globalPriceBusd), stakingToken.decimals)
    : 0

  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)
  const [onPresentStake] = useModal(<VaultStakeModal stakingMax={stakingTokenBalance} pool={pool} />)
  const [onPresentUnstake] = useModal(<VaultStakeModal stakingMax={cakeAsBigNumber} pool={pool} isRemovingStake />)

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex flexDirection="column">
        <Balance fontSize="20px" bold value={cakeAsNumberBalance} decimals={5} />
        <Text fontSize="12px" color="#69626E">
          {globalPriceBusd.gt(0) ? (
            <Balance value={stakedDollarValue} fontSize="12px" color="#69626E" decimals={2} prefix="~" unit=" USD" />
          ) : (
            <Skeleton mt="1px" height={16} width={64} />
          )}
        </Text>
      </Flex>
      <Flex>
        <IconButton variant="full_gradient_pool" onClick={onPresentUnstake} mr="6px">
          <MinusIcon color="white" width="24px" />
        </IconButton>
        <IconButton
          variant="full_gradient_pool"
          onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}
        >
          <AddIcon color="white" width="24px" height="24px" />
        </IconButton>
      </Flex>
    </Flex>
  )
}

export default HasSharesActions
