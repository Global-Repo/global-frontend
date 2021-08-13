import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody } from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`

const AnnouncementsCard = () => {
  const { t } = useTranslation()

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="contrast" scale="lg">
          {t('Announcements')}
        </Heading>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default AnnouncementsCard
