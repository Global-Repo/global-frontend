import React, { FC } from 'react'
import { Flex, HelpIcon, Text, useTooltip } from '@duhd4h/global-uikit'
import styled from 'styled-components'
import { useTranslation } from '../../../contexts/Localization'

const HelpIconWrapper = styled.div`
  align-self: center;
`

const MultiLineWrapper = styled.div`
  white-space: break-spaces;
  font-size: 14px;
`

const WithdrawalFee: FC = () => {
  const { t } = useTranslation()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <MultiLineWrapper>
      {t(
        "Before X days, a percentage of the user's LP deposit is charged.\nAfter X days, only rewards are charged ... etc TODO.\nEach deposit resets the counter.",
      )}
    </MultiLineWrapper>,
    {
      placement: 'bottom',
    },
  )

  return (
    <Flex justifyContent="space-between">
      {tooltipVisible && tooltip}
      <Text>{t('Withdrawal Fee')}:</Text>
      <HelpIconWrapper ref={targetRef}>
        <HelpIcon color="textSubtle" />
      </HelpIconWrapper>
    </Flex>
  )
}

export default WithdrawalFee
