import React from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, BorderGradientButton } from '@duhd4h/global-uikit'
import { NavLink, useHistory } from 'react-router-dom'
import pools from 'config/constants/pools'
import { Pool } from 'state/types'
import { useTranslation } from 'contexts/Localization'

const StyledFarmStakingCard = styled(Card)`
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 2px 6px rgba(179, 165, 209, 0.15), 0px 4px 40px rgba(179, 165, 209, 0.3);
  border-radius: 16px;
  margin-left: auto;
  margin-right: auto;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ scale: 'lg' })`
  line-height: 55px;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  color: #FF0000;
`

const ButtonCustomGlobal = styled.div`
  & > div > span {
      -webkit-text-fill-color: #FF0000;
      -webkit-background-clip: text;
      color: #FF0000;
      padding:0px;
      font-size:14px;
  }
`
const styleInFarms = { color: '#66596F', fontSize: '14px' }

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
        <Heading color="black" scale="lg">
          {earn}
        </Heading>
        <CardMidContent>{assets}</CardMidContent>
        <Flex justifyContent="space-between">
          <Heading style={styleInFarms} color="black" scale="lg">
            {InPools}
          </Heading>
        </Flex>
        <ButtonCustomGlobal>
          <BorderGradientButton
            label="Details >"
            onClick={() => history.push('/poolsGlobal')}
            style={{ padding: '8px', marginTop: '32px', width: '100%' , height: '40px', background: '#FFECEC', color: '#FF0000', fontSize: '14px', borderRadius: 10, border: '1px solid #FFDBDB'}}
            colorRight="#FFECEC"
            colorLeft="#FFECEC"
          />
        </ButtonCustomGlobal>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAssetCard
