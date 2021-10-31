import React, { useState } from 'react'
import { Button, Flex, GradientBorderBox, Skeleton, Text, TimerIcon, useTooltip } from '@duhd4h/global-uikit'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import Balance from 'components/Balance'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { useFarmUser, usePriceGlobalBusd } from 'state/hooks'
import { useHarvest } from 'hooks/useHarvest'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { ActionContainer, ActionTitles, ActionContent, Earned } from './styles'
import useCanHarvest from '../../../../../hooks/useCanHarvest'

const TimerIconWrapper = styled.div`
  align-self: center;
  margin-left: 4px;
`

const GradientText = styled(Text)`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 11px;
  padding-right: 4px;
  background: red;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

interface HarvestActionProps extends FarmWithStakedValue {
  userDataReady: boolean
}

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({ pid, userData, userDataReady }) => {
  const earningsBigNumber = new BigNumber(userData.earnings)
  const globalPriceBusd = usePriceGlobalBusd()
  let earnings = BIG_ZERO
  let earningsBusd = 0
  let displayBalance = userDataReady ? earnings.toLocaleString() : <Skeleton width={60} />
  const nextHarvestAsString = userData.nextHarvest

  // If user didn't connect wallet default balance will be 0
  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceAmount(earningsBigNumber)
    earningsBusd = earnings.multipliedBy(globalPriceBusd).toNumber()
    displayBalance = earnings.toFixed(3, BigNumber.ROUND_DOWN)
  }

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const canHarvest = useCanHarvest(pid)
  const { allowance, stakedBalance } = useFarmUser(pid)
  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const { targetRef, tooltip, tooltipVisible } = useTooltip(nextHarvestAsString, { placement: 'bottom' })

  return (
    <ActionContainer>
      {tooltipVisible && tooltip}
      <ActionTitles>
        <Flex style={{ width: '100%' }} justifyContent="space-between">
          <Flex>
            <GradientText>GLOBAL</GradientText>
            <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
              {t('Earned')}
            </Text>
          </Flex>
          {isApproved && stakedBalance.gt(0) && (
            <TimerIconWrapper ref={targetRef}>
              <TimerIcon color="textSubtle" />
            </TimerIconWrapper>
          )}
        </Flex>
      </ActionTitles>
      <ActionContent>
        <div>
          <Earned>{displayBalance}</Earned>
          {earningsBusd > 0 && (
            <Balance fontSize="12px" color="black" decimals={2} value={earningsBusd} unit=" USD" prefix="~" />
          )}
        </div>
        <Button
          disabled={earnings.eq(0) || pendingTx || !userDataReady || !canHarvest}
          onClick={async () => {
            setPendingTx(true)
            await onReward()
            dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))

            setPendingTx(false)
          }}
          ml="4px"
          variant={earnings.gt(0) && userDataReady && !pendingTx && canHarvest ? 'full_gradient_pool' : 'danger'}
        >
          {t('Harvest')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction
