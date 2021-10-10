import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, useMatchBreakpoints } from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'
import { GlobalVaultLocked, GlobalVaultStaked, GlobalVaultVested } from 'state/types'
import { BIG_ZERO } from 'utils/bigNumber'
import TokenPairImage from 'components/TokenPairImage'
import BaseCell, { CellContent } from './BaseCell'

interface NameCellProps {
  vault: GlobalVaultLocked | GlobalVaultStaked | GlobalVaultVested
}

const StyledCell = styled(BaseCell)`
  flex: 5;
  flex-direction: row;
  padding-left: 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 150px;
    padding-left: 32px;
  }
`

const NameCell: React.FC<NameCellProps> = ({ vault }) => {
  const { t } = useTranslation()
  const { isXs, isSm } = useMatchBreakpoints()
  const { sousId, stakingToken, earningToken, userData } = vault
  const stakingTokenSymbol = stakingToken.symbol
  const earningTokenSymbol = earningToken[0].symbol

  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const isStaked = stakedBalance.gt(0)

  const title = `${t('Earn')} ${earningTokenSymbol}`
  const subtitle = `${t('Stake')} ${stakingTokenSymbol}`
  const showSubtitle = sousId !== 0 || (sousId === 0 && !isXs && !isSm)

  return (
    <StyledCell role="cell">
      <TokenPairImage primaryToken={earningToken[0]} secondaryToken={stakingToken} mr="8px" width={40} height={40} />
      <CellContent>
        {isStaked && (
          <Text fontSize="12px" bold color="secondary" textTransform="uppercase">
            {t('Staked')}
          </Text>
        )}
        <Text bold={!isXs && !isSm} small={isXs || isSm}>
          {title}
        </Text>
        {showSubtitle && (
          <Text fontSize="12px" color="textSubtle">
            {subtitle}
          </Text>
        )}
      </CellContent>
    </StyledCell>
  )
}

export default NameCell
