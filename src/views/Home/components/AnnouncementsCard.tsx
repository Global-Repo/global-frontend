import React from 'react'
import { Timeline } from 'react-twitter-widgets'
import styled from 'styled-components'

const TimelineWrapper = styled.div`
  margin-top: 32px;
  box-shadow: 5px 5px 5px black;
`

const AnnouncementsCard = () => {
  return (
    <TimelineWrapper>
      <Timeline
        dataSource={{ sourceType: 'profile', screenName: 'Beglobaldefi' }}
        options={{ theme: 'dark', height: '600' }}
      />
    </TimelineWrapper>
  )
}

export default AnnouncementsCard
