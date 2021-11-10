import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { BIG_ZERO } from 'utils/bigNumber'
import { Flex, Text, Box } from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'
import { GlobalVaultLocked, GlobalVaultStaked, GlobalVaultVested } from 'state/types'
import ApprovalAction from './ApprovalAction'
import StakeActions from './StakeActions'
import HarvestActions from './HarvestActions'

const InlineText = styled(Text)`
  display: inline;
`

const GradientText = styled(InlineText)`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
  padding-right: 4px;
  color: #FF0000;
  //background: linear-gradient(to right, #e52420, #ce850e);
  //-webkit-background-clip: text;
  //-webkit-text-fill-color: transparent;
`

interface CardActionsProps {
  vault: GlobalVaultLocked | GlobalVaultStaked | GlobalVaultVested
  stakedBalance: BigNumber
}

const   CardActions: React.FC<CardActionsProps> = ({ vault, stakedBalance }) => {
  const { sousId, stakingToken, earningToken, userData, earningTokensPrice } = vault
  // Pools using native BNB behave differently than pools using a token
  const { t } = useTranslation()
  const allowance = userData?.allowance ? new BigNumber(userData.allowance) : BIG_ZERO
  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO
  // const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
  const earnings = BIG_ZERO
  const needsApproval = !allowance.gt(0)
  const isStaked = stakedBalance.gt(0)
  const isLoading = Boolean(!userData)

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        <>
          <Box display="inline">
            <GradientText>{earningToken[0].symbol}</GradientText>
            <InlineText color="black" textTransform="uppercase" bold fontSize="12px">
              {t('Earned')}
            </InlineText>
          </Box>
          <HarvestActions
            earnings={earnings}
            earningToken={earningToken[0]}
            sousId={sousId}
            earningTokenPrice={earningTokensPrice[0].earningTokenPrice}
            isLoading={isLoading}
          />
        </>
        <Box display="inline">
          <InlineText color={isStaked ? 'secondary' : 'black'} textTransform="uppercase" bold fontSize="12px">
            {isStaked ? <GradientText>{stakingToken.symbol}</GradientText> : t('Stake')}{' '}
          </InlineText>
          <InlineText color={isStaked ? '#69626E' : 'secondary'} textTransform="uppercase" bold fontSize="12px">
            {isStaked ? t('Staked') : <GradientText>{stakingToken.symbol}</GradientText>}
          </InlineText>
        </Box>
        {needsApproval ? (
          <ApprovalAction vault={vault} isLoading={isLoading} />
        ) : (
          <StakeActions
            isLoading={isLoading}
            vault={vault}
            stakingTokenBalance={stakingTokenBalance}
            stakedBalance={stakedBalance}
            isStaked={isStaked}
          />
        )}
      </Flex>
    </Flex>
  )
}

export default CardActions
