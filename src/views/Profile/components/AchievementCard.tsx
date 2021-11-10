import React from 'react'
import styled from 'styled-components'
import { Flex, PrizeIcon, Text } from '@duhd4h/global-uikit'
import { Achievement } from 'state/types'
import AchievementAvatar from './AchievementAvatar'
import AchievementTitle from './AchievementTitle'
import AchievementDescription from './AchievementDescription'

interface AchievementCardProps {
  achievement: Achievement
}

const Details = styled(Flex)`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding-left: 8px;
  padding-right: 8px;
`

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  return (
    <Flex>
      <AchievementAvatar badge={achievement.badge} />
      <Details>
        <AchievementTitle title={achievement.title} />
        <AchievementDescription description={achievement.description} />
      </Details>
      <Flex alignItems="center">
        <PrizeIcon width="18px" color="#69626E" mr="4px" />
        <Text color="#69626E">{achievement.points.toLocaleString()}</Text>
      </Flex>
    </Flex>
  )
}

export default AchievementCard
