import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import {
  Button,
  useModal,
  IconButton,
  AddIcon,
  MinusIcon,
  Skeleton,
  useTooltip,
  Flex,
  Text,
} from '@duhd4h/global-uikit'
import UnlockButton from 'components/UnlockButton'
import { useWeb3React } from '@web3-react/core'
import { useCakeVault } from 'state/hooks'
import { Pool } from 'state/types'
import Balance from 'components/Balance'
import { useTranslation } from 'contexts/Localization'
import { useCheckVaultApprovalStatus, useSousApprove, useVaultApprove } from 'hooks/useApprove'
import { getBalanceNumber } from 'utils/formatBalance'
import { PoolCategory } from 'config/constants/types'
import { BIG_ZERO } from 'utils/bigNumber'
import { getAddress } from 'utils/addressHelpers'
import { useERC20 } from 'hooks/useContract'
import { convertSharesToCake } from 'views/Pools/helpers'
import { ActionContainer, ActionTitles, ActionContent } from './styles'
import NotEnoughTokensModal from '../../PoolCard/Modals/NotEnoughTokensModal'
import StakeModal from '../../PoolCard/Modals/StakeModal'
import VaultStakeModal from '../../CakeVaultCard/VaultStakeModal'

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

const WrappedButton = styled(Button)`
  background-color: #FF0000;
  color: #fff;
`

interface StackedActionProps {
  pool: Pool
  userDataLoaded: boolean
}

const Staked: React.FunctionComponent<StackedActionProps> = ({ pool, userDataLoaded }) => {
  const {
    sousId,
    stakingToken,
    earningToken,
    stakingLimit,
    isFinished,
    poolCategory,
    userData,
    stakingTokenPrice,
    isAutoVault,
  } = pool
  const { t } = useTranslation()
  const { account } = useWeb3React()

  const stakingTokenContract = useERC20(stakingToken.address ? getAddress(stakingToken.address) : '')
  const { handleApprove: handlePoolApprove, requestedApproval: requestedPoolApproval } = useSousApprove(
    stakingTokenContract,
    sousId,
    earningToken.symbol,
  )

  const { isVaultApproved, setLastUpdated } = useCheckVaultApprovalStatus()
  const { handleApprove: handleVaultApprove, requestedApproval: requestedVaultApproval } =
    useVaultApprove(setLastUpdated)

  const handleApprove = isAutoVault ? handleVaultApprove : handlePoolApprove
  const requestedApproval = isAutoVault ? requestedVaultApproval : requestedPoolApproval

  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const allowance = userData?.allowance ? new BigNumber(userData.allowance) : BIG_ZERO
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const isNotVaultAndHasStake = !isAutoVault && stakedBalance.gt(0)

  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO

  const stakedTokenBalance = getBalanceNumber(stakedBalance, stakingToken.decimals)
  const stakedTokenDollarBalance = getBalanceNumber(
    stakedBalance.multipliedBy(stakingTokenPrice),
    stakingToken.decimals,
  )

  const {
    userData: { userShares },
    pricePerFullShare,
  } = useCakeVault()

  const { cakeAsBigNumber, cakeAsNumberBalance } = convertSharesToCake(userShares, pricePerFullShare)
  const hasSharesStaked = userShares && userShares.gt(0)
  const isVaultWithShares = isAutoVault && hasSharesStaked
  const stakedAutoDollarValue = getBalanceNumber(cakeAsBigNumber.multipliedBy(stakingTokenPrice), stakingToken.decimals)

  const needsApproval = isAutoVault ? !isVaultApproved : !allowance.gt(0) && !isBnbPool

  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)

  const [onPresentStake] = useModal(
    <StakeModal
      isBnbPool={isBnbPool}
      pool={pool}
      stakingTokenBalance={stakingTokenBalance}
      stakingTokenPrice={stakingTokenPrice}
    />,
  )

  const [onPresentVaultStake] = useModal(<VaultStakeModal stakingMax={stakingTokenBalance} pool={pool} />)

  const [onPresentUnstake] = useModal(
    <StakeModal
      stakingTokenBalance={stakingTokenBalance}
      isBnbPool={isBnbPool}
      pool={pool}
      stakingTokenPrice={stakingTokenPrice}
      isRemovingStake
    />,
  )

  const [onPresentVaultUnstake] = useModal(<VaultStakeModal stakingMax={cakeAsBigNumber} pool={pool} isRemovingStake />)

  const onStake = () => {
    if (isAutoVault) {
      onPresentVaultStake()
    } else {
      onPresentStake()
    }
  }

  const onUnstake = () => {
    if (isAutoVault) {
      onPresentVaultUnstake()
    } else {
      onPresentUnstake()
    }
  }

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t("You've already staked the maximum amount you can stake in this pool!"),
    { placement: 'bottom' },
  )

  const reachStakingLimit = stakingLimit.gt(0) && userData.stakedBalance.gte(stakingLimit)

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text fontSize="12px" bold color="#69626E" as="span" textTransform="uppercase">
            {t('Start staking')}
          </Text>
        </ActionTitles>
        <ActionContent>
          <UnlockButton isPool width="100%" />
        </ActionContent>
      </ActionContainer>
    )
  }

  if (!userDataLoaded) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text fontSize="12px" bold color="#69626E" as="span" textTransform="uppercase">
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
          <Text fontSize="12px" bold color="black" as="span" textTransform="uppercase">
            {t('Enable pool')}
          </Text>
        </ActionTitles>
        <ActionContent>
          <WrappedButton width="100%" disabled={requestedApproval} onClick={handleApprove}>
            {t('Enable')}
          </WrappedButton>
        </ActionContent>
      </ActionContainer>
    )
  }

  // Wallet connected, user data loaded and approved
  if (isNotVaultAndHasStake || isVaultWithShares) {
    return (
      <ActionContainer>
        <ActionTitles>
          <GradientText as="span">{stakingToken.symbol} </GradientText>
          <Text fontSize="12px" bold color="#69626E" as="span" textTransform="uppercase">
            {isAutoVault ? t('Staked (compounding)') : t('Staked')}
          </Text>
        </ActionTitles>
        <ActionContent>
          <Flex flex="1" pt="16px" flexDirection="column" alignSelf="flex-start">
            <Balance
              lineHeight="1"
              bold
              fontSize="20px"
              decimals={5}
              value={isAutoVault ? cakeAsNumberBalance : stakedTokenBalance}
            />
            <Balance
              fontSize="12px"
              display="inline"
              color="#69626E"
              decimals={2}
              value={isAutoVault ? stakedAutoDollarValue : stakedTokenDollarBalance}
              unit=" USD"
              prefix="~"
            />
          </Flex>
          <IconButtonWrapper>
            <IconButton variant="full_gradient_pool" onClick={onUnstake} mr="6px">
              <MinusIcon color="white" width="14px" />
            </IconButton>
            {reachStakingLimit ? (
              <span ref={targetRef}>
                <IconButton variant="full_gradient_pool" disabled>
                  <AddIcon color="textDisabled" width="24px" height="24px" />
                </IconButton>
              </span>
            ) : (
              <IconButton
                variant="full_gradient_pool"
                onClick={stakingTokenBalance.gt(0) ? onStake : onPresentTokenRequired}
                disabled={isFinished}
              >
                <AddIcon color="white" width="14px" />
              </IconButton>
            )}
          </IconButtonWrapper>
          {tooltipVisible && tooltip}
        </ActionContent>
      </ActionContainer>
    )
  }

  return (
    <ActionContainer>
      <ActionTitles>
        <Text fontSize="12px" bold color="#69626E" as="span" textTransform="uppercase">
          {t('Stake')}{' '}
        </Text>
        <GradientText as="span">{stakingToken.symbol}</GradientText>
      </ActionTitles>
      <ActionContent>
        <WrappedButton
          width="100%"
          onClick={stakingTokenBalance.gt(0) ? onStake : onPresentTokenRequired}
          disabled={isFinished}
        >
          {t('Stake')}
        </WrappedButton>
      </ActionContent>
    </ActionContainer>
  )
}

export default Staked
