import React from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, BorderGradientButton } from '@duhd4h/global-uikit'
import { NavLink, useHistory } from 'react-router-dom'
import pools from 'config/constants/pools'
import { Pool } from 'state/types'
import { useTranslation } from 'contexts/Localization'

const StyledFarmStakingCard = styled(Card)`
  background-color: #134894;
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
  line-height: 55px;
  background: linear-gradient(to right, #D41615, #F49F23);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`

const activeNonCakePools = pools.filter((pool) => !pool.isFinished && !pool.earningToken.symbol.includes('CAKE'))
const latestPools: Pool[] = orderBy(activeNonCakePools, ['sortOrder', 'pid'], ['desc', 'desc']).slice(0, 3)
// Always include CAKE
// const assets = ['CAKE', ...latestPools.map((pool) => pool.earningToken.symbol)].join(', ')
const assets = ['GLB, BNB or NFTs'].join('')

const EarnAssetCard = () => {
  const { t } = useTranslation()
  const assetText = t('Earn %assets% in Farms, Vaults & Pools', { assets })
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
          style={{ padding: '8px', marginTop: '32px', width: '100%' }}
          colorRight="#F49F23"
          colorLeft="#D41615"
        />
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAssetCard
