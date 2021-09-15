import React, { FC } from 'react'
import { Flex, Skeleton, Text } from '@duhd4h/global-uikit'
import { GlobalVaultLocked, GlobalVaultStaked, GlobalVaultVested } from '../../../../state/types'
import { useTranslation } from '../../../../contexts/Localization'
import Balance from '../../../../components/Balance'
import { secondsToDays } from '../../../../utils/getTimePeriods'

interface Props {
  vault: GlobalVaultVested
  performanceFee?: number
}

const PenaltyFeeRow: FC<Props> = ({ vault }) => {
  const { t } = useTranslation()
  const { vaultApr, penaltyFee } = vault
  const { fee, interval } = penaltyFee

  const ndays = secondsToDays(interval)

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text>{t('Penalty fee (before %ndays% days):', { ndays })}</Text>
      {vaultApr.length === 0 ? (
        <Skeleton width="82px" height="32px" />
      ) : (
        <Flex alignItems="center">
          <Balance fontSize="16px" value={fee} decimals={2} unit="%" bold />
        </Flex>
      )}
    </Flex>
  )
}

export default PenaltyFeeRow
