import React, { FC } from 'react'
import { Flex, HelpIcon, Text, useTooltip } from '@duhd4h/global-uikit'
import styled from 'styled-components'
import { useTranslation } from '../../../contexts/Localization'

const HelpIconWrapper = styled.div`
  align-self: center;
  margin-left: 4px;
`

const MultiLineWrapper = styled.div`
  white-space: break-spaces;
  font-size: 14px;
`

const TextGlobal = styled(Text)`
  font-weight: 600;
  font-size: 14px;
  color: #000000;
  line-height: 17px;
`

const WithdrawalFee: FC = () => {
  const { t } = useTranslation()
  const days = 99 // TODO: fetch from contract

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <MultiLineWrapper>
      {t(
        `Before ${days} days, a percentage of the user's LP deposit is charged.\nAfter 99 days, only rewards are charged. \nEach deposit resets the counter.`,
      )}
    </MultiLineWrapper>,
    {
      placement: 'bottom',
    },
  )

  return (
    <Flex>
      {tooltipVisible && tooltip}
      <TextGlobal bold color="black">
        {t('Withdrawal Fee')}
      </TextGlobal>
      <HelpIconWrapper style={{ display: 'flex' }} ref={targetRef}>
        <HelpIcon width={14} height={14} color="#A099A5" />
      </HelpIconWrapper>
    </Flex>
  )
}

export default WithdrawalFee
