import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Text } from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'

const StyledPredictionCard = styled(Card)`
  min-height: 376px;
`

const StyledHeaderText = styled(Text)`
  font-size: 28px;
  line-height: 1.1;
  font-weight: 600;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 40px;
  }
`

const PartnershipsCard = () => {
  const { t } = useTranslation()

  return (
    <StyledPredictionCard>
      <CardBody>
        <StyledHeaderText mb="24px">{t('Partnerships')}</StyledHeaderText>
      </CardBody>
    </StyledPredictionCard>
  )
}

export default PartnershipsCard
