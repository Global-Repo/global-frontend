import React from 'react'
import styled from 'styled-components'
import ApyButton from 'views/Farms/components/FarmCard/ApyButton'
import { Address } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { HelpIcon, Skeleton, useTooltip } from '@duhd4h/global-uikit'
import { useTranslation } from '../../../../contexts/Localization'

export interface ApyProps {
  value: string
  multiplier: string
  lpLabel: string
  tokenAddress?: Address
  quoteTokenAddress?: Address
  cakePrice: BigNumber
  originalValue: number
  hideButton?: boolean
  aprOriginalValue: number
}

const Container = styled.div`
  display: flex;
  align-items: center;
  color: black;
  font-weight:500;
  button {
    width: 20px;
    height: 20px;
    svg {
      path {
        fill: ${({ theme }) => theme.colors.textSubtle};
      }
    }
  }
`

const AprWrapper = styled.div`
  text-align: left;
  font-weight: bold;
`

const HelpIconWrapper = styled.div`
  display: inline-flex;
  align-self: center;
  margin-left: 4px;
`

const Apy: React.FC<ApyProps> = ({
  value,
  lpLabel,
  tokenAddress,
  quoteTokenAddress,
  cakePrice,
  originalValue,
  hideButton = false,
  aprOriginalValue,
}) => {
  const { t } = useTranslation()

  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddress, tokenAddress })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  const { targetRef, tooltip, tooltipVisible } = useTooltip(t('APY considering daily and manual autocompound.'), {
    placement: 'bottom',
  })


  return originalValue !== 0 ? (
    <Container>
      {tooltipVisible && tooltip}
      {originalValue ? (
        <>
          <AprWrapper>{value}%</AprWrapper>
          {!hideButton && (
            <ApyButton
              lpLabel={lpLabel}
              globalPrice={cakePrice}
              apr={aprOriginalValue}
              addLiquidityUrl={addLiquidityUrl}
            />
          )}
          <HelpIconWrapper ref={targetRef}>
            <HelpIcon color="#A099A5" width={16} />
          </HelpIconWrapper>
        </>
      ) : (
        <AprWrapper>
          <Skeleton width={60} />
        </AprWrapper>
      )}
    </Container>
  ) : (
    <Container>
      {tooltipVisible && tooltip}
      <AprWrapper>{originalValue}%</AprWrapper>
      <HelpIconWrapper ref={targetRef}>
        <HelpIcon color="#A099A5" width={16} />
      </HelpIconWrapper>
    </Container>
  )
}

export default Apy
