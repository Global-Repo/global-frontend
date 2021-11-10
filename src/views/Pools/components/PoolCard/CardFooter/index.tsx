import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Flex, CardFooter, ExpandableLabel, HelpIcon, useTooltip, Text } from '@duhd4h/global-uikit'
import { Pool } from 'state/types'
import { CompoundingPoolTag, ManualPoolTag } from 'components/Tags'
import ExpandedFooter from './ExpandedFooter'

interface FooterProps {
  pool: Pool
  account: string
  totalCakeInVault?: BigNumber
}

const ExpandableButtonWrapper = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  button {
    padding: 0;
  }
`

const CardFooterWrapper = styled(CardFooter)`
  border-width: 0;
`

const Divider = styled.div`
  background: linear-gradient(to right, #e52420, #ce850e);
  height: 1px;
  margin: 0 auto;
  width: 90%;
`

const GradientText = styled(Text)`
  background: linear-gradient(to right, #d86186, #f39e21);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Footer: React.FC<FooterProps> = ({ pool, account }) => {
  const { isAutoVault } = pool
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)

  const manualTooltipText = t('You must harvest and compound your earnings from this pool manually.')
  const autoTooltipText = t(
    'Any funds you stake in this pool will be automagically harvested and restaked (compounded) for you.',
  )

  const { targetRef, tooltip, tooltipVisible } = useTooltip(isAutoVault ? autoTooltipText : manualTooltipText, {
    placement: 'bottom',
  })

  return (
    <>
      <Divider />
      <CardFooterWrapper>
        <ExpandableButtonWrapper>
          <Flex alignItems="center">
            {isAutoVault ? <CompoundingPoolTag /> : <ManualPoolTag />}
            {tooltipVisible && tooltip}
            <Flex ref={targetRef}>
              <HelpIcon ml="4px" width="20px" height="20px" color="#69626E" />
            </Flex>
          </Flex>
          <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
            <GradientText>{isExpanded ? t('Hide') : t('Details')}</GradientText>
          </ExpandableLabel>
        </ExpandableButtonWrapper>
        {isExpanded && <ExpandedFooter pool={pool} account={account} />}
      </CardFooterWrapper>
    </>
  )
}

export default Footer
