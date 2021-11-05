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

const WithdrawalFee: FC<{ farm: any }> = ({ farm }) => {
  const { t } = useTranslation()
  const { maxWithdrawalInterval, performanceFeesOfNativeTokens, withDrawalFeeOfLps } = farm
  const days = parseInt(maxWithdrawalInterval, 10) / (60 * 60 * 24)

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <MultiLineWrapper>
      {t(
        `Fee before ${days} days: ${withDrawalFeeOfLps / 100}% on LPs plus ${
          (performanceFeesOfNativeTokens * 2) / 100
        }% on rewards.\nFee after ${days} days: ${performanceFeesOfNativeTokens / 100}% on rewards.`,
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
        {t('Fees')}
      </TextGlobal>
      <HelpIconWrapper style={{ display: 'flex' }} ref={targetRef}>
        <HelpIcon width={14} height={14} color="#A099A5" />
      </HelpIconWrapper>
    </Flex>
  )
}

export default WithdrawalFee
