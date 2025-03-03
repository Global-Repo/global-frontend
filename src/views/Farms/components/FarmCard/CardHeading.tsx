import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading } from '@duhd4h/global-uikit'
import { CommunityTag, CoreTag } from 'components/Tags'
import { Token } from 'config/constants/types'
import TokenPairImage from 'components/TokenPairImage'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  token: Token
  quoteToken: Token
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({ lpLabel, multiplier, isCommunityFarm, token, quoteToken }) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <TokenPairImage variant="inverted" primaryToken={token} secondaryToken={quoteToken} width={64} height={64} />
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading mb="6px" style={{background:'linear-gradient(to right, #e52420, #ce850e)', borderRadius:'10px', padding:'4px 12px'}}>{lpLabel.split(' ')[0]}</Heading>
        <Flex justifyContent="center">
          {/* {isCommunityFarm ? <CommunityTag variant="gradient" /> : <CoreTag variant="gradient" />} */}
          <MultiplierTag variant="gradient">{multiplier}</MultiplierTag>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
