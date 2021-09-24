import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import {
  AddIcon,
  Button,
  Flex,
  IconButton,
  MinusIcon,
  Skeleton,
  Text,
  useModal,
  useTooltip,
} from '@duhd4h/global-uikit'
import UnlockButton from 'components/UnlockButton'
import { useWeb3React } from '@web3-react/core'
import { useCakeVault } from 'state/hooks'
import { GlobalVaultLocked, GlobalVaultStaked, GlobalVaultVested } from 'state/types'
import Balance from 'components/Balance'
import { useTranslation } from 'contexts/Localization'
import { useGlobalVaultApprove, useSousApprove } from 'hooks/useApprove'
import { getBalanceNumber } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import { getAddress } from 'utils/addressHelpers'
import { useERC20 } from 'hooks/useContract'
import { ActionContainer, ActionContent, ActionTitles } from './styles'
import NotEnoughTokensModal from '../../VaultCard/Modals/NotEnoughTokensModal'

const IconButtonWrapper = styled.div`
  display: flex;
`

const GradientText = styled(Text)`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
  padding-right: 4px;
  background: linear-gradient(to right, #e52420, #ce850e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

interface StackedActionProps {
  vault: GlobalVaultLocked | GlobalVaultStaked | GlobalVaultVested
  userDataLoaded: boolean
}

const Staked: React.FunctionComponent<StackedActionProps> = ({ vault, userDataLoaded }) => {
  const { sousId, stakingToken, earningToken, userData } = vault
  const { t } = useTranslation()
  const { account } = useWeb3React()

  const stakingTokenContract = useERC20(stakingToken.address ? getAddress(stakingToken.address) : '')
  const { handleApprove: handlePoolApprove, requestedApproval: requestedPoolApproval } = useGlobalVaultApprove(
    stakingTokenContract,
    sousId,
    earningToken[0].symbol,
  )

  const handleApprove = handlePoolApprove
  const requestedApproval = requestedPoolApproval

  const allowance = userData?.allowance ? new BigNumber(userData.allowance) : BIG_ZERO
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const isNotVaultAndHasStake = stakedBalance.gt(0)

  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO

  const stakedTokenBalance = getBalanceNumber(stakedBalance, stakingToken.decimals)

  const {
    userData: { userShares },
  } = useCakeVault()

  const isVaultWithShares = userShares && userShares.gt(0)

  const needsApproval = !allowance.gt(0)

  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t("You've already staked the maximum amount you can stake in this pool!"),
    { placement: 'bottom' },
  )

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
            {t('Start staking')}
          </Text>
        </ActionTitles>
        <ActionContent>
          <UnlockButton width="100%" isPool />
        </ActionContent>
      </ActionContainer>
    )
  }

  if (!userDataLoaded) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
            {t('Start staking')}
          </Text>
        </ActionTitles>
        <ActionContent>
          <Skeleton width={180} height="32px" marginTop={14} />
        </ActionContent>
      </ActionContainer>
    )
  }

  if (needsApproval) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
            {t('Enable pool')}
          </Text>
        </ActionTitles>
        <ActionContent>
          <Button width="100%" disabled={requestedApproval} onClick={handleApprove} variant="full_gradient_pool">
            {t('Enable')}
          </Button>
        </ActionContent>
      </ActionContainer>
    )
  }

  // Wallet connected, user data loaded and approved
  if (isNotVaultAndHasStake || isVaultWithShares) {
    return (
      <ActionContainer>
        <ActionTitles>
          <GradientText fontSize="12px" bold color="secondary" as="span" textTransform="uppercase">
            {stakingToken.symbol}{' '}
          </GradientText>
          <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
            {t('Staked')}
          </Text>
        </ActionTitles>
        <ActionContent>
          <Flex flex="1" pt="16px" flexDirection="column" alignSelf="flex-start">
            <Balance lineHeight="1" bold fontSize="20px" decimals={5} value={stakedTokenBalance} />
          </Flex>
          <IconButtonWrapper>
            <IconButton variant="full_gradient_pool" mr="6px">
              <MinusIcon color="white" width="14px" />
            </IconButton>
            <IconButton variant="full_gradient_pool" onClick={onPresentTokenRequired}>
              <AddIcon color="white" width="14px" />
            </IconButton>
          </IconButtonWrapper>
          {tooltipVisible && tooltip}
        </ActionContent>
      </ActionContainer>
    )
  }

  return (
    <ActionContainer>
      <ActionTitles>
        <Text fontSize="12px" bold color="secondary" as="span" textTransform="uppercase">
          {t('Stake')}{' '}
        </Text>
        <GradientText fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
          {stakingToken.symbol}
        </GradientText>
      </ActionTitles>
      <ActionContent>
        <Button width="100%" onClick={onPresentTokenRequired} variant="full_gradient_pool">
          {t('Stake')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default Staked
