import React from 'react'
import { Timeline } from 'react-twitter-widgets'
import styled from 'styled-components'

const TimelineWrapper = styled.div`
  background: transparent;
  border: 2px solid white;
  border-radius: 24px;
  height: 600px;
  padding: 8px;
`

const AnnouncementsCard = () => {
  return (
    <TimelineWrapper>
      <Timeline
        dataSource={{ sourceType: 'profile', screenName: 'Beglobaldefi' }}
        options={{ theme: 'dark', height: '584' }}
      />
    </TimelineWrapper>
  )
}

export default AnnouncementsCard
