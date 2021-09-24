import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import {
  Box,
  Button,
  Flex,
  HelpIcon,
  LinkExternal,
  MetamaskIcon,
  Skeleton,
  Text,
  useTooltip,
} from '@duhd4h/global-uikit'
import { BASE_BSC_SCAN_URL, BASE_URL } from 'config'
import { GlobalVaultLocked, GlobalVaultStaked, GlobalVaultVested } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { getAddress } from 'utils/addressHelpers'
import { registerToken } from 'utils/wallet'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
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
  background: ${({ theme }) => theme.colors.dropdown};
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  padding: 12px;

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

type MediaBreakpoints = {
  isXs: boolean
  isSm: boolean
  isMd: boolean
  isLg: boolean
  isXl: boolean
}

interface ActionPanelProps {
  account: string
  vault: GlobalVaultLocked | GlobalVaultStaked | GlobalVaultVested
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

const ActionPanel: React.FC<ActionPanelProps> = ({ account, vault, userDataLoaded, expanded, breakpoints }) => {
  const { sousId, stakingToken, earningToken, totalStaked, contractAddress } = vault
  const { t } = useTranslation()
  const vaultContractAddress = getAddress(contractAddress)
  const { isXs, isSm, isMd } = breakpoints
  const showSubtitle = (isXs || isSm) && sousId === 0

  const isMetaMaskInScope = !!(window as WindowChain).ethereum?.isMetaMask
  const tokenAddress = earningToken[0].address ? getAddress(earningToken[0].address) : ''
  const imageSrc = `${BASE_URL}/images/tokens/${tokenAddress}.png`

  const getTotalStakedBalance = () => {
    return getBalanceNumber(new BigNumber(totalStaked), stakingToken.decimals)
  }

  const {
    targetRef: totalStakedTargetRef,
    tooltip: totalStakedTooltip,
    tooltipVisible: totalStakedTooltipVisible,
  } = useTooltip(t('Total amount of %symbol% staked in this pool', { symbol: stakingToken.symbol }), {
    placement: 'bottom',
  })

  const maxStakeRow = null

  const aprRow = (
    <Flex justifyContent="space-between" alignItems="center" mb="8px">
      <Text>{t('APR')}:</Text>
      <Apr vault={vault} showIcon performanceFee={0} />
    </Flex>
  )

  const totalStakedRow = (
    <Flex justifyContent="space-between" alignItems="center" mb="8px">
      <Text maxWidth={['50px', '100%']}>{t('Total staked')}:</Text>
      <Flex alignItems="center">
        {totalStaked && new BigNumber(totalStaked).gte(0) ? (
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
        {earningToken[0].symbol !== 'BNB' && (
          <Flex mb="8px" justifyContent={['flex-end', 'flex-end', 'flex-start']}>
            <LinkExternal href={`https://pancakeswap.info/token/${getAddress(earningToken[0].address)}`} bold={false}>
              {t('Info site')}
            </LinkExternal>
          </Flex>
        )}
        <Flex mb="8px" justifyContent={['flex-end', 'flex-end', 'flex-start']}>
          <LinkExternal href={earningToken[0].projectLink} bold={false}>
            {t('View Project Site')}
          </LinkExternal>
        </Flex>
        {vaultContractAddress && (
          <Flex mb="8px" justifyContent={['flex-end', 'flex-end', 'flex-start']}>
            <LinkExternal href={`${BASE_BSC_SCAN_URL}/address/${vaultContractAddress}`} bold={false}>
              {t('View Contract')}
            </LinkExternal>
          </Flex>
        )}
        {account && isMetaMaskInScope && tokenAddress && (
          <Flex mb="8px" justifyContent={['flex-end', 'flex-end', 'flex-start']}>
            <Button
              variant="text"
              p="0"
              height="auto"
              onClick={() => registerToken(tokenAddress, earningToken[0].symbol, earningToken[0].decimals, imageSrc)}
            >
              <Text color="primary">{t('Add to Metamask')}</Text>
              <MetamaskIcon ml="4px" />
            </Button>
          </Flex>
        )}
        <span>
          <HelpIcon ml="4px" width="20px" height="20px" color="textSubtle" />
        </span>
      </InfoSection>
      <ActionContainer>
        {showSubtitle && (
          <Text mt="4px" mb="16px" color="textSubtle">
            {`${t('Earn')} CAKE ${t('Stake').toLocaleLowerCase()} CAKE`}
          </Text>
        )}
        <Harvest vault={vault} userDataLoaded={userDataLoaded} />
        <Stake vault={vault} userDataLoaded={userDataLoaded} />
      </ActionContainer>
    </StyledActionPanel>
  )
}

export default ActionPanel
