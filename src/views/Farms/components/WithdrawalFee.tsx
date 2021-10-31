import React, { FC } from 'react'
import { Flex, HelpIcon, Text, useTooltip } from '@duhd4h/global-uikit'
import styled from 'styled-components'
import useUnstake from 'hooks/useUnstake'
import { useTranslation } from '../../../contexts/Localization'

const HelpIconWrapper = styled.div`
  align-self: center;
`

const MultiLineWrapper = styled.div`
  white-space: break-spaces;
  font-size: 14px;
`

const TextGlobal = styled(Text)`
   font-weight: 600;
   font-size:14px;
   color: #000000;
   line-height: 17px;
`

const TextGlobalDesc = styled(Text)`
   font-weight: 600;
   font-size:14px;
   color: #000000;
   display:flex;
   line-height: 17px;
`



const WithdrawalFee: FC = () => {
  const { t } = useTranslation()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <MultiLineWrapper>
      {t(
        "Before 99 days, a percentage of the user's LP deposit is charged.\nAfter 99 days, only rewards are charged. \nEach deposit resets the counter.",
      )}
    </MultiLineWrapper>,
    {
      placement: 'bottom',
    },
  )

  // const penaltyFee = useUnstake(process.env.REACT_APP_CAKE_BNB_PID)
  const penaltyFee = 0

  return (
    <Flex justifyContent="space-between" style={{width:"100%"}}>
      {tooltipVisible && tooltip}
      <TextGlobal bold color="black">{t('Withdrawal Fee')}:</TextGlobal>
      <HelpIconWrapper style={{display:"flex"}} ref={targetRef}>
      <TextGlobal bold color="black">{penaltyFee}</TextGlobal>
        <HelpIcon color="textSubtle" />
      </HelpIconWrapper>
    </Flex>
  )
}

export default WithdrawalFee
