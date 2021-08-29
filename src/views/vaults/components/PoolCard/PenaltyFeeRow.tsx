import React, { FC } from 'react'
import { CalculateIcon, Flex, IconButton, Skeleton, Text } from '@duhd4h/global-uikit'
import { Pool } from '../../../../state/types'
import { useTranslation } from '../../../../contexts/Localization'
import Balance from '../../../../components/Balance'
import { getAprData } from '../../../Pools/helpers'

interface Props {
  vault: Pool
  performanceFee?: number
}

const PenaltyFeeRow: FC<Props> = ({ vault, performanceFee }) => {
  const { t } = useTranslation()
  const { isFinished, apr } = vault
  const { apr: earningsPercentageToDisplay } = getAprData(vault, performanceFee)

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text>{t('Penalty fee (before XX days):')}</Text>
      {isFinished || !apr ? (
        <Skeleton width="82px" height="32px" />
      ) : (
        <Flex alignItems="center">
          <Balance
            fontSize="16px"
            isDisabled={isFinished}
            value={earningsPercentageToDisplay}
            decimals={2}
            unit="%"
            bold
          />
        </Flex>
      )}
    </Flex>
  )
}

export default PenaltyFeeRow
