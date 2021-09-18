import React from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, BorderGradientButton } from '@duhd4h/global-uikit'
import { NavLink, useHistory } from 'react-router-dom'
import pools from 'config/constants/pools'
import { Pool } from 'state/types'
import { useTranslation } from 'contexts/Localization'

const StyledFarmStakingCard = styled(Card)`
  background: transparent;
  border: 2px solid white;
  border-radius: 24px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ scale: 'lg' })`
  line-height: 44px;
  background: linear-gradient(to right, #bb5370, #529dd6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`

const activeNonCakePools = pools.filter((pool) => !pool.isFinished && !pool.earningToken.symbol.includes('CAKE'))
const latestPools: Pool[] = orderBy(activeNonCakePools, ['sortOrder', 'pid'], ['desc', 'desc']).slice(0, 3)
// Always include CAKE
const assets = ['CAKE', ...latestPools.map((pool) => pool.earningToken.symbol)].join(', ')

const EarnAssetCard = () => {
  const { t } = useTranslation()
  const assetText = t('Earn %assets% in Pools', { assets })
  const [earn, InPools] = assetText.split(assets)

  const history = useHistory()

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="contrast" scale="lg">
          {earn}
        </Heading>
        <CardMidContent>{assets}</CardMidContent>
        <Flex justifyContent="space-between">
          <Heading color="contrast" scale="lg">
            {InPools}
          </Heading>
        </Flex>
        <BorderGradientButton
          label="Details >"
          onClick={() => history.push('/poolsGlobal')}
          style={{ padding: '8px', marginTop: '32px' }}
        />
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAssetCard
