import React from 'react'
import styled from 'styled-components'
import { Card, CardBody } from '@duhd4h/global-uikit'
import { Timeline } from 'react-twitter-widgets'

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
  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Timeline
          dataSource={{ sourceType: 'profile', screenName: 'Beglobaldefi' }}
          options={{ theme: 'dark', height: '600' }}
        />
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default AnnouncementsCard
