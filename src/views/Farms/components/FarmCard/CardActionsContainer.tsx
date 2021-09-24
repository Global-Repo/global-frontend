import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Text, TimerIcon, useTooltip } from '@duhd4h/global-uikit'
import { getAddress } from 'utils/addressHelpers'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { Farm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { useERC20 } from 'hooks/useContract'
import { useApprove } from 'hooks/useApprove'
import UnlockButton from 'components/UnlockButton'
import Countdown from 'react-countdown'
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'

const TimerIconWrapper = styled.div`
  align-self: center;
  margin-left: 4px;
`

const GradientText = styled(Text)`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
  padding-right: 4px;
  background: linear-gradient(to right, #e52420, #ce850e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Action = styled.div`
  padding-top: 16px;
`
export interface FarmWithStakedValue extends Farm {
  apr?: number
}

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  account?: string
  addLiquidityUrl?: string
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, account, addLiquidityUrl }) => {
  const { t } = useTranslation()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses } = farm
  const {
    allowance: allowanceAsString = 0,
    tokenBalance: tokenBalanceAsString = 0,
    stakedBalance: stakedBalanceAsString = 0,
    earnings: earningsAsString = 0,
    nextHarvest: nextHarvestAsString = '0',
  } = farm.userData || {}
  const allowance = new BigNumber(allowanceAsString)
  const tokenBalance = new BigNumber(tokenBalanceAsString)
  const stakedBalance = new BigNumber(stakedBalanceAsString)
  const earnings = new BigNumber(earningsAsString)
  const lpAddress = getAddress(lpAddresses)
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const dispatch = useAppDispatch()

  const lpContract = useERC20(lpAddress)

  const { onApprove } = useApprove(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, dispatch, account, pid])

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={farm.lpSymbol}
        pid={pid}
        addLiquidityUrl={addLiquidityUrl}
      />
    ) : (
      <Button mt="8px" width="100%" disabled={requestedApproval} onClick={handleApprove} variant="full_gradient_pool">
        {t('Approve Contract')}
      </Button>
    )
  }

  const { targetRef, tooltip, tooltipVisible } = useTooltip(<Countdown date={parseInt(nextHarvestAsString)} />, {
    placement: 'bottom',
  })

  return (
    <Action>
      {tooltipVisible && tooltip}
      <Flex justifyContent="space-between">
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
      <HarvestAction earnings={earnings} pid={pid} />
      <Flex>
        <GradientText>{farm.lpSymbol}</GradientText>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          {t('Staked')}
        </Text>
      </Flex>
      {!account ? <UnlockButton mt="8px" width="100%" isPool /> : renderApprovalOrStakeButton()}
    </Action>
  )
}

export default CardActions
