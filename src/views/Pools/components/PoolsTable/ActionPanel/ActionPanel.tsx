import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import {
  Box,
  Button,
  Flex,
  GradientBorderBox,
  HelpIcon,
  Link,
  LinkExternal,
  MetamaskIcon,
  Skeleton,
  Text,
  TimerIcon,
  useTooltip,
} from '@duhd4h/global-uikit'
import { BASE_BSC_SCAN_URL, BASE_URL } from 'config'
import { getBscScanBlockCountdownUrl } from 'utils/bscscan'
import { useBlock, useCakeVault } from 'state/hooks'
import BigNumber from 'bignumber.js'
import { Pool } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { CompoundingPoolTag, ManualPoolTag } from 'components/Tags'
import { getAddress, getCakeVaultAddress } from 'utils/addressHelpers'
import { registerToken } from 'utils/wallet'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { getPoolBlockInfo } from 'views/Pools/helpers'
import Harvest from './Harvest'
import Stake from './Stake'
import Apr from '../Apr'

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 700px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 700px;
  }
  to {
    max-height: 0px;
  }
`

const GradientText = styled(Text)`
  background: linear-gradient(to right, #d86186, #f39e21);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const StyledGradientBorderBox = styled(GradientBorderBox)`
  background: #FFFFFF !important;
`

const StyledActionPanel = styled.div<{ expanded: boolean }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  /* background: transparent; */
  background: #F8F6FB;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  padding: 12px;
  border: 1px solid #F0ECF4;
  margin: 0 5px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 32px;
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

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 500;
  font-size: 14px;
  /* background: linear-gradient(to right, #d86186, #f39e21); */
  /* -webkit-background-clip: text; */
  /* -webkit-text-fill-color: transparent; */
  text-decoration-line: underline;
  color: #FF0000;

  svg {
    fill: #FF0000
  }
`

type MediaBreakpoints = {
  isXs: boolean
  isSm: boolean
  isMd: boolean
  isLg: boolean
  isXl: boolean
}

interface ActionPanelProps {
  account: string
  pool: Pool
  userDataLoaded: boolean
  expanded: boolean
  breakpoints: MediaBreakpoints
}

const InfoSection = styled(Box)`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  padding: 8px 8px;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0;
    flex-basis: 230px;
  }
`

const ActionPanel: React.FC<ActionPanelProps> = ({ account, pool, userDataLoaded, expanded, breakpoints }) => {
  const {
    sousId,
    stakingToken,
    earningToken,
    totalStaked,
    startBlock,
    endBlock,
    stakingLimit,
    contractAddress,
    isAutoVault,
  } = pool
  const { t } = useTranslation()
  const poolContractAddress = getAddress(contractAddress)
  const cakeVaultContractAddress = getCakeVaultAddress()
  const { currentBlock } = useBlock()
  const { isXs, isSm, isMd } = breakpoints
  const showSubtitle = (isXs || isSm) && sousId === 0

  const { shouldShowBlockCountdown, blocksUntilStart, blocksRemaining, hasPoolStarted, blocksToDisplay } =
    getPoolBlockInfo(pool, currentBlock)

  const isMetaMaskInScope = !!(window as WindowChain).ethereum?.isMetaMask
  const tokenAddress = earningToken.address ? getAddress(earningToken.address) : ''
  const imageSrc = `${BASE_URL}/images/tokens/${tokenAddress}.png`

  const {
    totalCakeInVault,
    fees: { performanceFee },
  } = useCakeVault()

  const performanceFeeAsDecimal = performanceFee && performanceFee / 100
  const isManualCakePool = sousId === 0

  const getTotalStakedBalance = () => {
    if (isAutoVault) {
      return getBalanceNumber(totalCakeInVault, stakingToken.decimals)
    }
    if (isManualCakePool) {
      const manualCakeTotalMinusAutoVault = new BigNumber(totalStaked).minus(totalCakeInVault)
      return getBalanceNumber(manualCakeTotalMinusAutoVault, stakingToken.decimals)
    }
    return getBalanceNumber(totalStaked, stakingToken.decimals)
  }

  const {
    targetRef: totalStakedTargetRef,
    tooltip: totalStakedTooltip,
    tooltipVisible: totalStakedTooltipVisible,
  } = useTooltip(t('Total amount of %symbol% staked in this pool', { symbol: stakingToken.symbol }), {
    placement: 'bottom',
  })

  const manualTooltipText = t('You must harvest and compound your earnings from this pool manually.')
  const autoTooltipText = t(
    'Any funds you stake in this pool will be automagically harvested and restaked (compounded) for you.',
  )

  const {
    targetRef: tagTargetRef,
    tooltip: tagTooltip,
    tooltipVisible: tagTooltipVisible,
  } = useTooltip(isAutoVault ? autoTooltipText : manualTooltipText, {
    placement: 'bottom-start',
  })

  const maxStakeRow = stakingLimit.gt(0) ? (
    <Flex mb="8px" justifyContent="space-between">
      <Text color="black">{t('Max. stake per user')}:</Text>
      <Text color="black">{`${getFullDisplayBalance(stakingLimit, stakingToken.decimals, 0)} ${stakingToken.symbol}`}</Text>
    </Flex>
  ) : null

  const blocksRow =
    blocksRemaining || blocksUntilStart ? (
      <Flex mb="8px" justifyContent="space-between">
        <Text color="black">{hasPoolStarted ? t('Ends in') : t('Starts in')}:</Text>
        <Flex>
          <StyledLinkExternal href={getBscScanBlockCountdownUrl(hasPoolStarted ? endBlock : startBlock)}>
            <Balance fontSize="16px" value={blocksToDisplay} decimals={0} color="primary" />
            <Text ml="4px" color="primary" textTransform="lowercase">
              {t('Blocks')}
            </Text>
            <TimerIcon ml="4px" color="white" />
          </StyledLinkExternal>
        </Flex>
      </Flex>
    ) : (
      <Skeleton width="56px" height="16px" />
    )

  const aprRow = (
    <Flex justifyContent="space-between" alignItems="center" mb="8px">
      <Text>{isAutoVault ? t('APY') : t('APR')}:</Text>
      <Apr pool={pool} showIcon performanceFee={isAutoVault ? performanceFeeAsDecimal : 0} />
    </Flex>
  )

  const totalStakedRow = (
    <Flex justifyContent="space-between" alignItems="center" mb="8px">
      <Text maxWidth={['50px', '100%']}>{t('Total staked')}:</Text>
      <Flex alignItems="center">
        {totalStaked && totalStaked.gte(0) ? (
          <>
            <Balance fontSize="16px" value={getTotalStakedBalance()} decimals={0} unit={` ${stakingToken.symbol}`} />
            <span ref={totalStakedTargetRef}>
              <HelpIcon color="textSubtle" width="20px" ml="4px" />
            </span>
          </>
        ) : (
          <Skeleton width="56px" height="16px" />
        )}
        {totalStakedTooltipVisible && totalStakedTooltip}
      </Flex>
    </Flex>
  )

  return (
    <StyledActionPanel expanded={expanded}>
      <InfoSection>
        {maxStakeRow}
        {(isXs || isSm) && aprRow}
        {(isXs || isSm || isMd) && totalStakedRow}
        {shouldShowBlockCountdown && blocksRow}
        <Flex mb="8px" justifyContent={['flex-end', 'flex-end', 'flex-start']}>
          <StyledLinkExternal href={`https://pancakeswap.info/token/${getAddress(earningToken.address)}`} bold={false}>
            {t('Info site')}
          </StyledLinkExternal>
        </Flex>
        <Flex mb="8px" justifyContent={['flex-end', 'flex-end', 'flex-start']}>
          <StyledLinkExternal href={earningToken.projectLink} bold={false}>
            {t('View Project Site')}
          </StyledLinkExternal>
        </Flex>
        {poolContractAddress && (
          <Flex mb="8px" justifyContent={['flex-end', 'flex-end', 'flex-start']}>
            <StyledLinkExternal
              href={`${BASE_BSC_SCAN_URL}/address/${isAutoVault ? cakeVaultContractAddress : poolContractAddress}`}
              bold={false}
            >
              {t('View Contract')}
            </StyledLinkExternal>
          </Flex>
        )}
        {account && isMetaMaskInScope && tokenAddress && (
          <Flex mb="8px" justifyContent={['flex-end', 'flex-end', 'flex-start']}>
            <Button
              variant="text"
              p="0"
              height="auto"
              onClick={() => registerToken(tokenAddress, earningToken.symbol, earningToken.decimals, imageSrc)}
            >
              <GradientText>{t('Add to Metamask')}</GradientText>
              <MetamaskIcon ml="4px" />
            </Button>
          </Flex>
        )}
        {isAutoVault ? <CompoundingPoolTag /> : <ManualPoolTag />}
        {tagTooltipVisible && tagTooltip}
        <span ref={tagTargetRef}>
          <HelpIcon ml="4px" width="20px" height="20px" color="textSubtle" />
        </span>
      </InfoSection>
      <ActionContainer>
        {showSubtitle && (
          <Text mt="4px" mb="16px" color="textSubtle">
            {isAutoVault ? t('Automatic restaking') : `${t('Earn')} CAKE ${t('Stake').toLocaleLowerCase()} CAKE`}
          </Text>
        )}
        <StyledGradientBorderBox
          colorLeft="#F0ECF4"
          colorRight="#F0ECF4"
          borderWidth="1px"
          style={{ flex: 1, margin: '4px 24px' }}
        >
          <Harvest {...pool} userDataLoaded={userDataLoaded} />
        </StyledGradientBorderBox>
        <StyledGradientBorderBox
          colorLeft="#F0ECF4"
          colorRight="#F0ECF4"
          borderWidth="1px"
          style={{ flex: 1, margin: '4px 24px' }}
        >
          <Stake pool={pool} userDataLoaded={userDataLoaded} />
        </StyledGradientBorderBox>
      </ActionContainer>
    </StyledActionPanel>
  )
}

export default ActionPanel
