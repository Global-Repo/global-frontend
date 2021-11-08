import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, useMatchBreakpoints } from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'
import { useCakeVault } from 'state/hooks'
import { Pool } from 'state/types'
import { BIG_ZERO } from 'utils/bigNumber'
import DualTokenImage from '../DualTokenImage/DualTokenImage'
import CakeVaultTokenPairImage from '../../CakeVaultCard/CakeVaultTokenPairImage'
import BaseCell, { CellContent } from './BaseCell'

interface NameCellProps {
  pool: Pool
}

const StyledCell = styled(BaseCell)`
  flex: 5;
  flex-direction: row;
  padding-left: 12px;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 150px;
    padding-left: 32px;
  }
`

const Subtitle = styled(Text)`
  margin-top: ${({ theme }) => theme.spacing[1]}px;
`

const NameCell: React.FC<NameCellProps> = ({ pool }) => {
  const WBNB_TOKEN = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
  const GLOBAL_TOKEN = '0xd9a0e9cA8fB98Bb9e57723B18699D36da146CaaB'

  const { t } = useTranslation()
  const { isXs, isSm } = useMatchBreakpoints()
  const { sousId, stakingToken, earningToken, userData, isFinished, isAutoVault } = pool
  const {
    userData: { userShares },
  } = useCakeVault()
  const hasVaultShares = userShares && userShares.gt(0)

  const stakingTokenSymbol = stakingToken.symbol
  const earningTokenSymbol = earningToken.symbol

  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const isStaked = stakedBalance.gt(0)
  const isManualCakePool = sousId === 0

  const showStakedTag = isAutoVault ? hasVaultShares : isStaked

  let title = `${t('Earn')} ${earningTokenSymbol}`
  let subtitle = `${t('Stake')} ${stakingTokenSymbol}`
  const showSubtitle = sousId !== 0 || (sousId === 0 && !isXs && !isSm)

  if (isAutoVault) {
    title = t('Auto GLOBAL')
    subtitle = t('Automatic restaking')
  } else if (isManualCakePool) {
    title = t('Manual GLOBAL')
    subtitle = `${t('Earn')} GLOBAL ${t('Stake').toLocaleLowerCase()} GLOBAL`
  }

  return (
    <StyledCell role="cell">
      {isAutoVault ? (
        <CakeVaultTokenPairImage mr="8px" width={40} height={40} />
      ) : (
        <DualTokenImage 
          primaryToken={WBNB_TOKEN} 
          secondaryToken={GLOBAL_TOKEN} 
          mr="8px" 
          width={40} 
          height={40} />
      )}
      <CellContent>
        {showStakedTag && (
          <Text fontSize="12px" bold color={isFinished ? 'failure' : 'secondary'} textTransform="uppercase">
            {t('Staked')}
          </Text>
        )}
        <Text bold={!isXs && !isSm} small={isXs || isSm} color="black">
          Stake GLB
        </Text>
        {showSubtitle && (
          <Subtitle fontSize="12px" color="#A099A5">
            Earn GLB + wBNB
          </Subtitle>
        )}
      </CellContent>
    </StyledCell>
  )
}

export default NameCell
