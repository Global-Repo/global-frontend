import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { GradientBorderBox, LinkExternal, Text } from '@duhd4h/global-uikit'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getBscScanAddressUrl } from 'utils/bscscan'
import { CommunityTag, CoreTag, DualTag } from 'components/Tags'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import HarvestAction from './HarvestAction'
import StakedAction from './StakedAction'
import Apy, { ApyProps } from '../Apy'
import Multiplier, { MultiplierProps } from '../Multiplier'
import Liquidity, { LiquidityProps } from '../Liquidity'
import HarvestLockup from '../../HarvestLockup'
import APR from '../../APR'
import WithdrawalFee from '../../WithdrawalFee'

export interface ActionPanelProps {
  apy: ApyProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
  userDataReady: boolean
  expanded: boolean
}

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 500px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 500px;
  }
  to {
    max-height: 0px;
  }
`

const Container = styled.div<{ expanded }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  background: transparent;
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 24px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 32px;
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
  background: linear-gradient(to right, #d86186, #f39e21);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const StakeContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }
`

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 16px;
  }

  > div {
    height: 24px;
    padding: 0 6px;
    font-size: 14px;
    margin-right: 4px;

    svg {
      width: 14px;
    }
  }
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const InfoContainer = styled.div`
  min-width: 200px;
`

const ValueContainer = styled.div`
  display: block;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
`

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 8px;
`

const ActionItemWrapper = styled(GradientBorderBox)``

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({
  details,
  apy,
  multiplier,
  liquidity,
  userDataReady,
  expanded,
}) => {
  const farm = details

  const { t } = useTranslation()
  const isActive = farm.multiplier !== '0X'
  const { quoteToken, token, dual } = farm
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const lpAddress = farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const bsc = getBscScanAddressUrl(lpAddress)
  const info = `https://pancakeswap.info/pool/${lpAddress}`
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  return (
    <Container expanded={expanded}>
      <InfoContainer>
        {isActive && (
          <StakeContainer>
            <StyledLinkExternal href={addLiquidityUrl}>{t('Get %symbol%', { symbol: lpLabel })}</StyledLinkExternal>
          </StakeContainer>
        )}
        <StyledLinkExternal href={bsc}>{t('View Contract')}</StyledLinkExternal>
        <StyledLinkExternal href={info}>{t('See Pair Info')}</StyledLinkExternal>
        <TagsContainer>
          {farm.isCommunity ? <CommunityTag variant="gradient" /> : <CoreTag variant="gradient" />}
          {dual ? <DualTag variant="gradient" /> : null}
        </TagsContainer>
        <DetailsWrapper>
          <APR apr={farm.apr} />
          <HarvestLockup harvestInterval={farm.harvestInterval} />
          <WithdrawalFee />
        </DetailsWrapper>
      </InfoContainer>
      <ValueContainer>
        <ValueWrapper>
          <Text>{t('APY')}</Text>
          <Apy {...apy} />
        </ValueWrapper>
        <ValueWrapper>
          <Text>{t('Multiplier')}</Text>
          <Multiplier {...multiplier} />
        </ValueWrapper>
        <ValueWrapper>
          <Text>{t('Liquidity')}</Text>
          <Liquidity {...liquidity} />
        </ValueWrapper>
      </ValueContainer>
      <ActionContainer>
        <ActionItemWrapper
          borderWidth="1px"
          colorLeft="#e52420"
          colorRight="#ce850e"
          style={{ flex: 1, margin: '4px 24px' }}
        >
          <HarvestAction {...farm} userDataReady={userDataReady} harvestInterval={farm.harvestInterval} />
        </ActionItemWrapper>
        <ActionItemWrapper
          borderWidth="1px"
          colorLeft="#e52420"
          colorRight="#ce850e"
          style={{ flex: 1, margin: '4px 24px' }}
        >
          <StakedAction {...farm} userDataReady={userDataReady} />
        </ActionItemWrapper>
      </ActionContainer>
    </Container>
  )
}

export default ActionPanel
