import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, HelpIcon, Modal, Text, useTooltip } from '@duhd4h/global-uikit'
import ModalActions from 'components/ModalActions'
import ModalInput from 'components/ModalInput'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance } from 'utils/formatBalance'
import styled from 'styled-components'

interface WithdrawModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
  farm: any
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ onConfirm, onDismiss, max, farm, tokenName = '' }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const valNumber = new BigNumber(val)
  const fullBalanceNumber = new BigNumber(fullBalance)

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const { maxWithdrawalInterval, performanceFeesOfNativeTokens, withDrawalFeeOfLps } = farm
  const days = parseInt(maxWithdrawalInterval, 10) / (60 * 60 * 24)

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <MultiLineWrapper>
      {t(
        `Fee before ${days} days: ${withDrawalFeeOfLps / 100}% on LPs plus ${
          (performanceFeesOfNativeTokens * 2) / 100
        }% on rewards.\nFee after ${days} days: ${performanceFeesOfNativeTokens / 100}% on rewards.`,
      )}
    </MultiLineWrapper>,
    {
      placement: 'bottom',
    },
  )

  return (
    <Modal title={t('Unstake LP tokens')} onDismiss={onDismiss}>
      <ModalInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={fullBalance}
        symbol={tokenName}
        inputTitle={t('Unstake')}
      />
      {tooltipVisible && tooltip}
      <FeeWarning>
        {t(`Fees`)}{' '}
        <HelpIconWrapper style={{ display: 'flex' }} ref={targetRef}>
          <HelpIcon width={14} height={14} color="#A099A5" />
        </HelpIconWrapper>
      </FeeWarning>
      <ModalActions>
        <Button variant="secondary" onClick={onDismiss} width="100%" disabled={pendingTx}>
          {t('Cancel')}
        </Button>
        <Button
          disabled={pendingTx || !valNumber.isFinite() || valNumber.eq(0) || valNumber.gt(fullBalanceNumber)}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            onDismiss()
          }}
          width="100%"
        >
          {pendingTx ? t('Pending Confirmation') : t('Confirm')}
        </Button>
      </ModalActions>
    </Modal>
  )
}

const FeeWarning = styled(Text)`
  margin-top: 24px;
  font-size: 14px;
  display: flex;
  color: black;
`

const MultiLineWrapper = styled.div`
  white-space: break-spaces;
  font-size: 14px;
`

const HelpIconWrapper = styled.span`
  align-self: center;
  margin-left: 4px;
`

export default WithdrawModal
