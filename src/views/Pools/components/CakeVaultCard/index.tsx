import React from 'react'
import styled from 'styled-components'
import { Box, CardBody, Flex, GradientBorderBox, Text, useMatchBreakpoints } from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import tokens from 'config/constants/tokens'
import { useCakeVault } from 'state/hooks'
import { Pool } from 'state/types'
import AprRow from '../PoolCard/AprRow'
import { StyledCard, StyledCardInner } from '../PoolCard/StyledCard'
import CardFooter from '../PoolCard/CardFooter'
import StyledCardHeader from '../PoolCard/StyledCardHeader'
import VaultCardActions from './VaultCardActions'
import UnstakingFeeCountdownRow from './UnstakingFeeCountdownRow'
import RecentCakeProfitRow from './RecentCakeProfitRow'

const StyledCardBody = styled(CardBody)<{ isLoading: boolean }>`
  min-height: ${({ isLoading }) => (isLoading ? '0' : '254px')};
`

interface CakeVaultProps {
  pool: Pool
  showStakedOnly: boolean
}

const CakeVaultCard: React.FC<CakeVaultProps> = ({ pool, showStakedOnly }) => {
  const { t } = useTranslation()
  const { isXl } = useMatchBreakpoints()
  const { account } = useWeb3React()
  const {
    userData: { userShares, isLoading: isVaultUserDataLoading },
    fees: { performanceFee },
  } = useCakeVault()

  const accountHasSharesStaked = userShares && userShares.gt(0)
  const isLoading = !pool.userData || isVaultUserDataLoading
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  if (showStakedOnly && !accountHasSharesStaked) {
    return null
  }

  return (
    <div>
      <GradientBorderBox colorLeft="#e52420" colorRight="#ce850e" borderWidth="1px" style={{ width: '100%' }}>
        <StyledCard isPromoted={{ isDesktop: isXl }}>
          <StyledCardInner>
            <StyledCardHeader
              isStaking={accountHasSharesStaked}
              isAutoVault
              earningToken={tokens.cake}
              stakingToken={tokens.cake}
            />
            <StyledCardBody isLoading={isLoading}>
              <AprRow pool={pool} performanceFee={performanceFeeAsDecimal} />
              <Box mt="24px">
                <RecentCakeProfitRow />
              </Box>
              <Box mt="8px">
                <UnstakingFeeCountdownRow />
              </Box>
              <Flex mt="32px" flexDirection="column">
                {account ? (
                  <VaultCardActions pool={pool} accountHasSharesStaked={accountHasSharesStaked} isLoading={isLoading} />
                ) : (
                  <>
                    <Text mb="10px" textTransform="uppercase" fontSize="12px" color="#69626E" bold>
                      {t('Start earning')}
                    </Text>
                    <UnlockButton isPool />
                  </>
                )}
              </Flex>
            </StyledCardBody>
            <CardFooter pool={pool} account={account} />
          </StyledCardInner>
        </StyledCard>
      </GradientBorderBox>
    </div>
  )
}

export default CakeVaultCard
