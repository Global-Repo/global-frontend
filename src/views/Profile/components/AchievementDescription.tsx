import React from 'react'
import { Text, TextProps } from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'
import { TranslatableText as AchievementDescriptionType } from 'state/types'
import styled from 'styled-components'

interface AchievementDescriptionProps extends TextProps {
  description?: AchievementDescriptionType
}

const Description = styled(Text).attrs({ as: 'p', fontSize: '14px' })`
  display: none;

  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`

const AchievementDescription: React.FC<AchievementDescriptionProps> = ({ description, ...props }) => {
  const { t } = useTranslation()

  if (!description) {
    return null
  }

  if (typeof description === 'string') {
    return (
      <Text as="p" color="#69626E" fontSize="14px" {...props}>
        {description}
      </Text>
    )
  }

  const { key, data = {} } = description

  return (
    <Description color="#69626E" {...props}>
      {t(key, data)}
    </Description>
  )
}

export default AchievementDescription
