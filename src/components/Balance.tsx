import React, { useEffect, useRef } from 'react'
import CountUp from 'react-countup'
import { Text, TextProps } from '@duhd4h/global-uikit'
import styled from 'styled-components'

interface BalanceProps extends TextProps {
  value: number
  decimals?: number
  unit?: string
  isDisabled?: boolean
  prefix?: string
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

const StyledText = styled(Text)`
font-family: Gotham;
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 19px;
display: flex;
align-items: center;

/* black */

color: #000000;
  
  
`

const Balance: React.FC<BalanceProps> = ({
  value,
  color = 'text',
  decimals = 3,
  isDisabled = false,
  unit,
  prefix,
  onClick,
  width,
  ...props
}) => {
  const previousValue = useRef(0)

  useEffect(() => {
    previousValue.current = value
  }, [value])

  return (
    <StyledText width={width} color={isDisabled ? 'textDisabled' : color} onClick={onClick} {...props}>
      {prefix && <span>{prefix}</span>}
      <CountUp start={Number(previousValue.current.toString().slice(0,9))} end={Number(value.toString().slice(0,9))} decimals={decimals} duration={1} separator="," />
      {unit && <span>{unit}</span>}
    </StyledText>
  )
}

export default Balance
