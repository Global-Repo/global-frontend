import React from 'react'
import { CardHeader, Heading, Text, Flex } from '@duhd4h/global-uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Token } from 'config/constants/types'
import TokenPairImage from 'components/TokenPairImage'

const Wrapper = styled(CardHeader)<{ isFinished?: boolean; background?: string }>`
  background: transparent;
  border-radius: ${({ theme }) => `${theme.radii.card} ${theme.radii.card} 0 0`};
`

const StyledCardHeader: React.FC<{
  earningToken: Token[]
  stakingToken: Token
  isFinished?: boolean
  isStaking?: boolean
}> = ({ earningToken, stakingToken, isFinished = false, isStaking = false }) => {
  const { t } = useTranslation()
  const background = 'transparent'

  const getHeadingPrefix = () => {
    return t('Earn')
  }

  const getSubHeading = () => {
    return t('Stake %symbol%', { symbol: stakingToken.symbol })
  }

  return (
    <Wrapper isFinished={isFinished} background={background}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column">
          <Heading color={isFinished ? 'textDisabled' : 'white'} scale="lg">
            {`${getHeadingPrefix()} ${earningToken[0].symbol}`}
          </Heading>
          <Text bold color={isFinished ? 'textDisabled' : 'textSubtle'}>
            {getSubHeading()}
          </Text>
        </Flex>
        <TokenPairImage primaryToken={earningToken[0]} secondaryToken={stakingToken} width={64} height={64} />
      </Flex>
    </Wrapper>
  )
}

export default StyledCardHeader
