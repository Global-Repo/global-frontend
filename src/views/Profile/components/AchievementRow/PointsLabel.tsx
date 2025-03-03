import React from 'react'
import { Flex, FlexProps, PrizeIcon, Text } from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'

interface PointsLabelProps extends FlexProps {
  points: number
}

const PointsLabel: React.FC<PointsLabelProps> = ({ points, ...props }) => {
  const { t } = useTranslation()
  const localePoints = points.toLocaleString()

  return (
    <Flex alignItems="center" {...props}>
      <PrizeIcon mr="4px" color="#69626E" />
      <Text color="#69626E">{t('%num% points', { num: localePoints })}</Text>
    </Flex>
  )
}

export default PointsLabel
