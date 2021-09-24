import React from 'react'
import styled from 'styled-components'
import { Skeleton, Text, Flex, Box, useModal, useMatchBreakpoints } from '@duhd4h/global-uikit'
import { GlobalVaultLocked, GlobalVaultStaked, GlobalVaultVested } from 'state/types'
import { BIG_ZERO } from 'utils/bigNumber'
import { formatNumber, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import Balance from 'components/Balance'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import BaseCell, { CellContent } from './BaseCell'
import CollectModal from '../../VaultCard/Modals/CollectModal'

interface EarningsCellProps {
  vault: GlobalVaultLocked | GlobalVaultStaked | GlobalVaultVested
  account: string
  userDataLoaded: boolean
}

const StyledCell = styled(BaseCell)`
  flex: 4.5;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 120px;
  }
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

const HelpIconWrapper = styled.div`
  align-self: center;
`

const EarningsCell: React.FC<EarningsCellProps> = ({ vault, account, userDataLoaded }) => {
  const { t } = useTranslation()
  const { isXs, isSm } = useMatchBreakpoints()
  const { sousId, earningToken, userData, earningTokensPrice } = vault
  const isManualCakePool = sousId === 0

  const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
  // These will be reassigned later if its Auto CAKE vault
  const earningTokenBalance = getBalanceNumber(earnings, earningToken[0].decimals)
  const earningTokenDollarBalance = getBalanceNumber(
    earnings.multipliedBy(earningTokensPrice[0].earningTokenPrice),
    earningToken[0].decimals,
  )
  const hasEarnings = account && earnings.gt(0)
  const fullBalance = getFullDisplayBalance(earnings, earningToken[0].decimals)
  const formattedBalance = formatNumber(earningTokenBalance, 3, 3)

  const labelText = t('%asset% Earned', { asset: earningToken[0].symbol })

  const [onPresentCollect] = useModal(
    <CollectModal
      formattedBalance={formattedBalance}
      fullBalance={fullBalance}
      earningToken={earningToken[0]}
      earningsDollarValue={earningTokenDollarBalance}
      sousId={sousId}
      isCompoundPool={isManualCakePool}
    />,
  )

  const handleEarningsClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    onPresentCollect()
  }

  return (
    <StyledCell role="cell">
      <CellContent>
        <GradientText textAlign="left">{labelText}</GradientText>
        {!userDataLoaded && account ? (
          <Skeleton width="80px" height="16px" />
        ) : (
          <>
            <Flex>
              <Box mr="8px" height="32px" onClick={hasEarnings ? handleEarningsClick : undefined}>
                <Balance
                  mt="4px"
                  bold={!isXs && !isSm}
                  fontSize={isXs || isSm ? '14px' : '16px'}
                  color={hasEarnings ? 'primary' : 'textDisabled'}
                  decimals={hasEarnings ? 5 : 1}
                  value={hasEarnings ? earningTokenBalance : 0}
                />
                {hasEarnings ? (
                  <>
                    {earningTokensPrice[0].earningTokenPrice > 0 && (
                      <Balance
                        display="inline"
                        fontSize="12px"
                        color="textSubtle"
                        decimals={2}
                        prefix="~"
                        value={earningTokenDollarBalance}
                        unit=" USD"
                      />
                    )}
                  </>
                ) : (
                  <Text mt="4px" fontSize="12px" color="textDisabled">
                    0 USD
                  </Text>
                )}
              </Box>
            </Flex>
          </>
        )}
      </CellContent>
    </StyledCell>
  )
}

export default EarningsCell
