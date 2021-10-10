import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Flex, CardFooter, ExpandableLabel, HelpIcon, Text } from '@duhd4h/global-uikit'
import { GlobalVaultLocked, GlobalVaultStaked, GlobalVaultVested } from 'state/types'
import ExpandedFooter from './ExpandedFooter'

interface FooterProps {
  vault: GlobalVaultLocked | GlobalVaultStaked | GlobalVaultVested
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

const Footer: React.FC<FooterProps> = ({ vault, account }) => {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <Divider />
      <CardFooterWrapper>
        <ExpandableButtonWrapper>
          <Flex alignItems="center">
            <Flex>
              <HelpIcon ml="4px" width="20px" height="20px" color="textSubtle" />
            </Flex>
          </Flex>
          <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
            <GradientText>{isExpanded ? t('Hide') : t('Details')}</GradientText>
          </ExpandableLabel>
        </ExpandableButtonWrapper>
        {isExpanded && <ExpandedFooter vault={vault} account={account} />}
      </CardFooterWrapper>
    </>
  )
}

export default Footer
