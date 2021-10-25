import React from 'react'
import { CardHeader, Heading, Text, Flex } from '@duhd4h/global-uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Token } from 'config/constants/types'
import TokenPairImage from 'components/TokenPairImage'

const Wrapper = styled(CardHeader)<{ isFinished?: boolean; background?: string }>`
  background: transparent;
  border-radius: ${({ theme }) => `${theme.radii.card} ${theme.radii.card} 0 0`};
  h1{
    text-align:center;
  }
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
      <Title>Cake maximizer</Title>
      <Flex alignItems="center" justifyContent="space-between">
        <FlexCustom>
          <Heading color={isFinished ? 'textDisabled' : 'white'} scale="lg">
            {`${getHeadingPrefix()} ${earningToken[0].symbol} + GLOBAL`}
          </Heading>
          <Text bold color={isFinished ? 'textDisabled' : 'textSubtle'}>
            {getSubHeading()}
          </Text>
        </FlexCustom>
        <TokenPairImage primaryToken={earningToken[0]} secondaryToken={stakingToken} width={64} height={64} />
      </Flex>
    </Wrapper>
  )
}

export default StyledCardHeader

const FlexCustom = styled.div `
  display:flex;
  flex-direction:column;
  h1{
    text-align:center;
  }
`

const Title = styled.h1 `
  width:100%;
  font-size:25px;
  color: white;
  margin:auto;
  margin-bottom:30px;
`