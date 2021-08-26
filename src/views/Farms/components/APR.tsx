import React, { FC } from 'react'
import { Flex, Text, Skeleton } from '@duhd4h/global-uikit'
import { useTranslation } from '../../../contexts/Localization'

interface Props {
  apr?: number
}

const APR: FC<Props> = ({ apr }) => {
  const { t } = useTranslation()

  const farmAPR = apr && apr.toLocaleString('en-US', { maximumFractionDigits: 2 })

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Text>{t('APR')}:</Text>
      <Text bold style={{ display: 'flex', alignItems: 'center' }}>
        {apr ? <>{farmAPR}%</> : <Skeleton height={24} width={80} />}
      </Text>
    </Flex>
  )
}

export default APR
