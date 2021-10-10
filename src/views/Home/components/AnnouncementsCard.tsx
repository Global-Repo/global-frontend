import React from 'react'
import { Timeline } from 'react-twitter-widgets'
import styled from 'styled-components'

const TimelineWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 800px;
`

const AnnouncementsCard = () => {
  return (
    <TimelineWrapper>
      <Timeline
        dataSource={{ sourceType: 'profile', screenName: 'Beglobaldefi' }}
        options={{ theme: 'light', height: '550', width: '600'}}
      />
    </TimelineWrapper>
  )
}

export default AnnouncementsCard
