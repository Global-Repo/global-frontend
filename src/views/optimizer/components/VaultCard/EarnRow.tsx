import React, { FC } from 'react'
import { Flex, Text } from '@duhd4h/global-uikit'
import { useTranslation } from '../../../../contexts/Localization'

const EarnRow: FC = () => {
  const { t } = useTranslation()

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text>{t('Earn:')}</Text>
      <Text>BNB</Text>
    </Flex>
  )
}

export default EarnRow
