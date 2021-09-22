import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, GradientBorderBox, Text } from '@duhd4h/global-uikit'
import { Farm } from 'state/types'
import { getBscScanAddressUrl } from 'utils/bscscan'
import { useTranslation } from 'contexts/Localization'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import APY from '../APY'
import HarvestLockup from '../HarvestLockup'

export interface FarmWithStakedValue extends Farm {
  apr?: number
  liquidity?: BigNumber
  apy?: number
}

const AccentGradient = keyframes`  
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
`

const StyledCardAccent = styled.div`
  background: ${({ theme }) => `linear-gradient(180deg, ${theme.colors.primaryBright}, ${theme.colors.secondary})`};
  background-size: 400% 400%;
  animation: ${AccentGradient} 2s linear infinite;
  border-radius: 32px;
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const FCard = styled.div<{ isPromotedFarm: boolean }>`
  width: 100%;
  align-self: baseline;
  background: transparent;
  // border-radius: ${({ theme, isPromotedFarm }) => (isPromotedFarm ? '31px' : theme.radii.card)};
  box-shadow: 0px 1px 4px rgba(25, 19, 38, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const Divider = styled.div`
  background: linear-gradient(to right, #e52420, #ce850e);
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

const Wrapper = styled.div``

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  globalPrice?: BigNumber
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, removed, globalPrice, account }) => {
  const { t } = useTranslation()

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const totalValueFormatted =
    farm.liquidity && farm.liquidity.gt(0)
      ? `$${farm.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 0 })}`
      : ''

  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const earnLabel = farm.dual ? farm.dual.earnLabel : t('GLOBAL + Fees')

  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: farm.quoteToken.address,
    tokenAddress: farm.token.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
  const lpAddress = farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const isPromotedFarm = farm.token.symbol === 'GLB'

  return (
    <Wrapper>
      <GradientBorderBox colorLeft="#e52420" colorRight="#ce850e" borderWidth="1px" style={{ width: '100%' }}>
        <FCard isPromotedFarm={isPromotedFarm}>
          {/* isPromotedFarm && <StyledCardAccent /> */}
          <CardHeading
            lpLabel={lpLabel}
            multiplier={farm.multiplier}
            isCommunityFarm={farm.isCommunity}
            token={farm.token}
            quoteToken={farm.quoteToken}
          />
          {!removed && (
            <>
              <APY
                apy={farm.apy}
                apr={farm.apr}
                globalPrice={globalPrice}
                lpLabel={lpLabel}
                addLiquidityUrl={addLiquidityUrl}
              />
            </>
          )}
          <Flex justifyContent="space-between">
            <Text>{t('Earn')}:</Text>
            <Text bold>{earnLabel}</Text>
          </Flex>
          <HarvestLockup harvestInterval={farm.harvestInterval} />
          <CardActionsContainer farm={farm} account={account} addLiquidityUrl={addLiquidityUrl} />
          <Divider />
          <ExpandableSectionButton
            onClick={() => setShowExpandableSection(!showExpandableSection)}
            expanded={showExpandableSection}
          />
          <ExpandingWrapper expanded={showExpandableSection}>
            <DetailsSection
              removed={removed}
              bscScanAddress={getBscScanAddressUrl(farm.lpAddresses[process.env.REACT_APP_CHAIN_ID])}
              infoAddress={`https://pancakeswap.info/pool/${lpAddress}`}
              totalValueFormatted={totalValueFormatted}
              lpLabel={lpLabel}
              addLiquidityUrl={addLiquidityUrl}
              apr={farm.apr}
            />
          </ExpandingWrapper>
        </FCard>
      </GradientBorderBox>
    </Wrapper>
  )
}

export default FarmCard
