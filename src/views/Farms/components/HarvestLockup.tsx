import React, { FC } from 'react'
import { Flex, Text, HelpIcon, useTooltip } from '@duhd4h/global-uikit'
import styled from 'styled-components'
import { useTranslation } from '../../../contexts/Localization'

const HelpIconWrapper = styled.div`
  align-self: center;
  margin-left: 4px;
`

const TextGlobal = styled(Text)`
   font-weight: 600;
   font-size:14px;
   color: #000000;
   line-height: 17px;
`

const TextGlobalApr = styled(Text)`
   font-weight: 600;
   font-size:14px;
   color: #000000;
   display:flex;
   line-height: 17px;
`

interface Props {
  harvestInterval: string
}

const HarvestLockup: FC<Props> = ({ harvestInterval }) => {
  const { t } = useTranslation()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(t('How often you can claim rewards.'), {
    placement: 'bottom',
  })
  
  return (
    <Flex justifyContent="space-between">
      {tooltipVisible && tooltip}
      <Flex>
        <TextGlobal>{t('Harvest Lockup')}:</TextGlobal>
      </Flex>
      <TextGlobalApr>
        {harvestInterval ? <div>{parseInt(harvestInterval) / 3600} {t('Hour(s)')} </div> : ""}
      </TextGlobalApr>
       <HelpIconWrapper ref={targetRef}>
          <HelpIcon color="textSubtle" />
        </HelpIconWrapper>
    </Flex>
  )
}

export default HarvestLockup
