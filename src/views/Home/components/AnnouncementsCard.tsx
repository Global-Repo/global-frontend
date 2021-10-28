import React from 'react'
import { Timeline } from 'react-twitter-widgets'
import styled from 'styled-components'

const TimelineWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 800px;
  border-radius: 16px;
  & > div > div > iframe {
    border-radius: 16px;
    min-height: 630px !important;
  }
`

const AnnouncementsCard = () => {
  return (
    <TimelineWrapper>
      <Timeline
        dataSource={{ sourceType: 'profile', screenName: 'Beglobaldefi' }}
        options={{ theme: 'light', height: '600', width: '600'}}
      />
    </TimelineWrapper>
  )
}

export default AnnouncementsCard
