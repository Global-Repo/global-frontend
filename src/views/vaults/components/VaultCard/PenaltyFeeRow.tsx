import React, { FC } from 'react'
import { Flex, Skeleton, Text } from '@duhd4h/global-uikit'
import { GlobalVaultLocked, GlobalVaultStaked, GlobalVaultVested } from '../../../../state/types'
import { useTranslation } from '../../../../contexts/Localization'
import Balance from '../../../../components/Balance'
import { getVaultAprData } from '../../../Pools/helpers'

interface Props {
  vault: GlobalVaultLocked | GlobalVaultStaked | GlobalVaultVested
  performanceFee?: number
}

const PenaltyFeeRow: FC<Props> = ({ vault }) => {
  const { t } = useTranslation()
  const { vaultApr } = vault
  const aprArray = getVaultAprData(vault)

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text>{t('Penalty fee (before XX days):')}</Text>
      {vaultApr.length === 0 ? (
        <Skeleton width="82px" height="32px" />
      ) : (
        <Flex alignItems="center">
          {aprArray.map((item) => (
            <Balance fontSize="16px" value={item.apr} decimals={2} unit="%" bold />
          ))}
        </Flex>
      )}
    </Flex>
  )
}

export default PenaltyFeeRow
