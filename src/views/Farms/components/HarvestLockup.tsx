import React, { FC } from 'react'
import { Flex, Text, HelpIcon, useTooltip } from '@duhd4h/global-uikit'
import styled from 'styled-components'
import { useTranslation } from '../../../contexts/Localization'

const HelpIconWrapper = styled.div`
  align-self: center;
  display: inline-flex;
  margin-left: 4px;
`

const TextGlobal = styled(Text)`
  font-weight: 600;
  font-size: 14px;
  color: #000000;
  line-height: 17px;
`

interface Props {
  harvestInterval: string
}

const HarvestLockup: FC<Props> = ({ harvestInterval }) => {
  const { t } = useTranslation()
  const hours = parseInt(harvestInterval) / 3600

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t(`You can claim rewards every ${hours} ${t('Hour(s)')}.`),
    {
      placement: 'bottom',
    },
  )

  return (
    <Flex alignItems="center">
      {tooltipVisible && tooltip}
      <Flex>
        <TextGlobal>
          {t('Harvest Lockup')}: {hours ? `${hours}h` : ''}
        </TextGlobal>
      </Flex>
      <HelpIconWrapper ref={targetRef}>
        <HelpIcon width={14} height={14} color="#A099A5" />
      </HelpIconWrapper>
    </Flex>
  )
}

export default HarvestLockup
