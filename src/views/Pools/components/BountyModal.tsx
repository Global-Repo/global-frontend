import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { DEFAULT_GAS_LIMIT } from 'config'
import styled from 'styled-components'
import { Modal, Text, Flex, Button, HelpIcon, AutoRenewIcon, useTooltip } from '@duhd4h/global-uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { useCakeVaultContract } from 'hooks/useContract'
import useTheme from 'hooks/useTheme'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'
import UnlockButton from 'components/UnlockButton'
import Balance from 'components/Balance'
import { useCakeVault, usePriceGlobalBusd } from 'state/hooks'

interface BountyModalProps {
  onDismiss?: () => void
  TooltipComponent: React.ElementType
}

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundDisabled};
  height: 1px;
  margin: 16px auto;
  width: 100%;
`

const BountyModal: React.FC<BountyModalProps> = ({ onDismiss, TooltipComponent }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { theme } = useTheme()
  const { toastError, toastSuccess } = useToast()
  const cakeVaultContract = useCakeVaultContract()
  const [pendingTx, setPendingTx] = useState(false)
  const {
    estimatedCakeBountyReward,
    totalPendingCakeHarvest,
    fees: { callFee },
  } = useCakeVault()
  const globalPriceBusd = usePriceGlobalBusd()
  const callFeeAsDecimal = callFee / 100
  const totalYieldToDisplay = getBalanceNumber(totalPendingCakeHarvest, 18)

  const estimatedDollarBountyReward = useMemo(() => {
    return new BigNumber(estimatedCakeBountyReward).multipliedBy(globalPriceBusd)
  }, [globalPriceBusd, estimatedCakeBountyReward])

  const hasFetchedDollarBounty = estimatedDollarBountyReward.gte(0)
  const hasFetchedCakeBounty = estimatedCakeBountyReward ? estimatedCakeBountyReward.gte(0) : false
  const dollarBountyToDisplay = hasFetchedDollarBounty ? getBalanceNumber(estimatedDollarBountyReward, 18) : 0
  const cakeBountyToDisplay = hasFetchedCakeBounty ? getBalanceNumber(estimatedCakeBountyReward, 18) : 0

  const { targetRef, tooltip, tooltipVisible } = useTooltip(<TooltipComponent fee={callFee} />, {
    placement: 'bottom',
    tooltipPadding: { right: 15 },
  })

  const handleConfirmClick = async () => {
    cakeVaultContract.methods
      .harvest()
      .send({ from: account, gas: DEFAULT_GAS_LIMIT })
      .on('sending', () => {
        setPendingTx(true)
      })
      .on('receipt', () => {
        toastSuccess(t('Bounty collected!'), t('CAKE bounty has been sent to your wallet.'))
        setPendingTx(false)
        onDismiss()
      })
      .on('error', (error) => {
        console.error(error)
        toastError(
          t('Could not be collected'),
          t('There may be an issue with your transaction, or another user claimed the bounty first.'),
        )
        setPendingTx(false)
        onDismiss()
      })
  }

  return (
    <Modal title={t('Claim Bounty')} onDismiss={onDismiss} headerBackground={theme.colors.gradients.cardHeader}>
      {tooltipVisible && tooltip}
      <Flex alignItems="flex-start" justifyContent="space-between">
        <Text>{t('You’ll claim')}</Text>
        <Flex flexDirection="column">
          <Balance bold value={cakeBountyToDisplay} decimals={7} unit=" CAKE" />
          <Text fontSize="12px" color="#69626E">
            <Balance
              fontSize="12px"
              color="#69626E"
              value={dollarBountyToDisplay}
              decimals={2}
              unit=" USD"
              prefix="~"
            />
          </Text>
        </Flex>
      </Flex>
      <Divider />
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="14px" color="#69626E">
          {t('Pool total pending yield')}
        </Text>
        <Balance color="#69626E" value={totalYieldToDisplay} unit=" CAKE" />
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="24px">
        <Text fontSize="14px" color="#69626E">
          {t('Bounty')}
        </Text>
        <Text fontSize="14px" color="#69626E">
          {callFeeAsDecimal}%
        </Text>
      </Flex>
      {account ? (
        <Button
          isLoading={pendingTx}
          disabled={!dollarBountyToDisplay || !cakeBountyToDisplay || !callFee}
          endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
          onClick={handleConfirmClick}
          mb="28px"
        >
          {pendingTx ? t('Confirming') : t('Confirm')}
        </Button>
      ) : (
        <UnlockButton mb="28px" />
      )}
      <Flex justifyContent="center" alignItems="center">
        <Text fontSize="16px" bold color="#69626E" mr="4px">
          {t('What’s this?')}
        </Text>
        <span ref={targetRef}>
          <HelpIcon color="#69626E" />
        </span>
      </Flex>
    </Modal>
  )
}

export default BountyModal
