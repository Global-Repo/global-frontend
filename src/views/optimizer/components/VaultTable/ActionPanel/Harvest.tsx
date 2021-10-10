import React from 'react'
import { Button, Text, useModal, Flex, Skeleton, Heading } from '@duhd4h/global-uikit'
import { useWeb3React } from '@web3-react/core'
import { formatNumber, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { BIG_ZERO } from 'utils/bigNumber'

import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { ActionContainer, ActionTitles, ActionContent } from './styles'
import CollectModal from '../../VaultCard/Modals/CollectModal'
import { GlobalVaultLocked, GlobalVaultStaked, GlobalVaultVested } from '../../../../../state/types'

interface HarvestActionProps {
  vault: GlobalVaultLocked | GlobalVaultStaked | GlobalVaultVested
  userDataLoaded: boolean
}

const GradientText = styled(Text)`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
  padding-right: 4px;
  background: linear-gradient(to right, #e52420, #ce850e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({ vault, userDataLoaded }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { sousId, earningToken, userData, earningTokensPrice } = vault

  // const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
  const earnings = BIG_ZERO
  // These will be reassigned later if its Auto CAKE vault
  const earningTokenBalance = getBalanceNumber(earnings, earningToken[0].decimals)
  const earningTokenDollarBalance = getBalanceNumber(
    earnings.multipliedBy(earningTokensPrice[0].earningTokenPrice),
    earningToken[0].decimals,
  )
  const hasEarnings = earnings.gt(0)
  const fullBalance = getFullDisplayBalance(earnings, earningToken[0].decimals)
  const formattedBalance = formatNumber(earningTokenBalance, 3, 3)

  const [onPresentCollect] = useModal(
    <CollectModal
      formattedBalance={formattedBalance}
      fullBalance={fullBalance}
      earningToken={earningToken[0]}
      earningsDollarValue={earningTokenDollarBalance}
      sousId={sousId}
    />,
  )

  const actionTitle = (
    <>
      <GradientText fontSize="12px" bold color="secondary" as="span" textTransform="uppercase">
        {earningToken[0].symbol}{' '}
      </GradientText>
      <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
        {t('Earned')}
      </Text>
    </>
  )

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>{actionTitle}</ActionTitles>
        <ActionContent>
          <Balance pt="8px" lineHeight="1" bold fontSize="20px" decimals={5} value={0} />
          <Button disabled>{t('Harvest')}</Button>
        </ActionContent>
      </ActionContainer>
    )
  }

  if (!userDataLoaded) {
    return (
      <ActionContainer>
        <ActionTitles>{actionTitle}</ActionTitles>
        <ActionContent>
          <Skeleton width={180} height="32px" marginTop={14} />
        </ActionContent>
      </ActionContainer>
    )
  }

  return (
    <ActionContainer>
      <ActionTitles>{actionTitle}</ActionTitles>
      <ActionContent>
        <Flex flex="1" pt="16px" flexDirection="column" alignSelf="flex-start">
          <>
            {hasEarnings ? (
              <>
                <Balance lineHeight="1" bold fontSize="20px" decimals={5} value={earningTokenBalance} />
                {earningTokensPrice[0].earningTokenPrice > 0 && (
                  <Balance
                    display="inline"
                    fontSize="12px"
                    color="textSubtle"
                    decimals={2}
                    prefix="~"
                    value={earningTokenDollarBalance}
                    unit=" USD"
                  />
                )}
              </>
            ) : (
              <>
                <Heading color="textDisabled">0</Heading>
                <Text fontSize="12px" color="textDisabled">
                  0 USD
                </Text>
              </>
            )}
          </>
        </Flex>
        <Button
          disabled={!hasEarnings}
          onClick={onPresentCollect}
          variant={!hasEarnings ? 'danger' : 'full_gradient_pool'}
        >
          {t('Harvest')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction
