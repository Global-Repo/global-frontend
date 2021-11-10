import React from 'react'
import {
  Flex,
  Text,
  Button,
  IconButton,
  AddIcon,
  MinusIcon,
  useModal,
  Skeleton,
  useTooltip,
} from '@duhd4h/global-uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { GlobalVaultLocked, GlobalVaultStaked, GlobalVaultVested } from 'state/types'
import styled from 'styled-components'
import Balance from 'components/Balance'
import NotEnoughTokensModal from '../Modals/NotEnoughTokensModal'
import StakeModal from '../Modals/StakeModal'


interface StakeActionsProps {
  vault: GlobalVaultLocked | GlobalVaultStaked | GlobalVaultVested
  stakingTokenBalance: BigNumber
  stakedBalance: BigNumber
  isStaked: ConstrainBoolean
  isLoading?: boolean
}

const ButtonWrapper = styled(Button)`
  background-color: #FF0000;
`

const StakeAction: React.FC<StakeActionsProps> = ({
  vault,
  stakingTokenBalance,
  stakedBalance,
  isStaked,
  isLoading = false,
}) => {
  const { stakingToken, userData, stakingTokenPrice } = vault
  const isFinished = false
  const { t } = useTranslation()
  const stakedTokenBalance = getBalanceNumber(stakedBalance, stakingToken.decimals)
  const stakedTokenDollarBalance = getBalanceNumber(
    stakedBalance.multipliedBy(stakingTokenPrice),
    stakingToken.decimals,
  )

  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)

  const [onPresentStake] = useModal(
    <StakeModal vault={vault} stakingTokenBalance={stakingTokenBalance} stakingTokenPrice={stakingTokenPrice} />,
  )

  const [onPresentUnstake] = useModal(
    <StakeModal
      stakingTokenBalance={stakingTokenBalance}
      vault={vault}
      stakingTokenPrice={stakingTokenPrice}
      isRemovingStake
    />,
  )

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('You’ve already staked the maximum amount you can stake in this pool!'),
    { placement: 'bottom' },
  )

  // TODO
  const reachStakingLimit = false

  const renderStakeAction = () => {
    return isStaked ? (
      <Flex justifyContent="space-between" alignItems="center">
        <Flex flexDirection="column">
          <>
            <Balance bold fontSize="20px" decimals={3} value={stakedTokenBalance} />
            {stakingTokenPrice !== 0 && (
              <Text fontSize="12px" color="#69626E">
                <Balance
                  fontSize="12px"
                  color="#69626E"
                  decimals={2}
                  value={stakedTokenDollarBalance}
                  prefix="~"
                  unit=" USD"
                />
              </Text>
            )}
          </>
        </Flex>
        <Flex>
          <IconButton variant='danger' onClick={onPresentUnstake} mr="6px">
            <MinusIcon color="#69626E" width="24px" />
          </IconButton>
          {reachStakingLimit ? (
            <span ref={targetRef}>
              <IconButton variant="secondary" disabled>
                <AddIcon color="#69626E" width="24px" height="24px" />
              </IconButton>
            </span>
          ) : (
            <IconButton
              variant='danger'
              onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}
              disabled={isFinished}
            >
              <AddIcon color="#69626E" width="24px" height="24px" />
            </IconButton>
          )}
        </Flex>
        {tooltipVisible && tooltip}
      </Flex>
    ) : (
      <ButtonWrapper
        variant='danger'
        disabled={isFinished}
        onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}
      >
        {t('Stake')}
      </ButtonWrapper>
    )
  }

  return <Flex flexDirection="column">{isLoading ? <Skeleton width="100%" height="52px" /> : renderStakeAction()}</Flex>
}

export default StakeAction
