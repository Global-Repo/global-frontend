import React, { FC } from 'react'
import { Flex, Text, HelpIcon, useTooltip } from '@duhd4h/global-uikit'
import styled from 'styled-components'
import { useTranslation } from '../../../contexts/Localization'

const HelpIconWrapper = styled.div`
  align-self: center;
  margin-left: 4px;
`

interface Props {
  harvestInterval: string
}

const HarvestLockup: FC<Props> = ({ harvestInterval }) => {
  const { t } = useTranslation()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(t('How soon can you harvest or compound again.'), {
    placement: 'bottom',
  })

  return (
    <Flex justifyContent="space-between">
      {tooltipVisible && tooltip}
      <Flex>
        <Text>{t('Harvest Lockup')}:</Text>
        <HelpIconWrapper ref={targetRef}>
          <HelpIcon color="textSubtle" />
        </HelpIconWrapper>
      </Flex>
      <Text bold>
        {harvestInterval} {t('Hour(s)')}
      </Text>
    </Flex>
  )
}

export default HarvestLockup
