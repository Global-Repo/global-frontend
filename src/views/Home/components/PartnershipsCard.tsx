import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading } from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'

const StyledPredictionCard = styled(Card)`
  min-height: 200px;
  box-shadow: 5px 5px 5px black;
`

const PartnershipsCard = () => {
  const { t } = useTranslation()

  return (
    <StyledPredictionCard>
      <CardBody>
        <Heading scale="lg" mb="24px">
          {t('Partnerships')}
        </Heading>
      </CardBody>
    </StyledPredictionCard>
  )
}

export default PartnershipsCard
