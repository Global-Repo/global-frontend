import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Flex, CardFooter, ExpandableLabel, HelpIcon, Text } from '@duhd4h/global-uikit'
import { GlobalVaultLocked, GlobalVaultStaked, GlobalVaultVested } from 'state/types'
import ExpandedFooter from './ExpandedFooter'
import ExpandActionCell from '../../../../Pools/components/PoolsTable/Cells/ExpandActionCell'

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

const Button = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
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
              <HelpIcon ml="4px" width="20px" height="20px" color="#69626E" />
            </Flex>
          </Flex>
          <Button onClick={() => setIsExpanded(!isExpanded)}>
            <ExpandActionCell expanded={isExpanded} isFullLayout/>
          </Button>
          {/* <ExpandableLabelWrapper expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
        <Text color="black">{isExpanded ? t('Hide') : t('Details')}</Text>
          </ExpandableLabelWrapper> */}
        </ExpandableButtonWrapper>
        {isExpanded && <ExpandedFooter vault={vault} account={account} />}
      </CardFooterWrapper>
    </>
  )
}

export default Footer
