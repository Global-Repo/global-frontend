import styled, { css, keyframes } from 'styled-components'
import { Card, Box } from '@duhd4h/global-uikit'

const PromotedGradient = keyframes`
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
`

interface PromotedStyleCardProps {
  isDesktop: boolean
}

export const StyledCard = styled(Card)<{ isPromoted?: boolean; isFinished?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: baseline;
  position: relative;
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'secondary']};
  // box-shadow: 0px 1px 4px rgba(25, 19, 38, 0.15);
  
  ${({ isPromoted, theme }) =>
    isPromoted
      ? css`
          background: transparent;
          padding: 1px 1px 3px 1px;
          background-size: 400% 400%;
        `
      : `background: transparent;`}

  ${({ isPromoted }) =>
    isPromoted && css`
      animation: ${PromotedGradient} 3s ease infinite;
    `}

  ${({ theme }) => theme.mediaQueries.sm} {
    // margin: 0 12px 46px;
  }
`

export const StyledCardInner = styled(Box)`
  background: #FFFFFF;
  box-shadow: 0px 2px 6px rgba(179, 165, 209, 0.15), 0px 4px 40px rgba(179, 165, 209, 0.3);
  border-radius: 32px;
  border: solid 1px #d8d8d870;
    // border-radius: ${({ theme }) => theme.radii.card};
`

export const GradientBorderBoxWrapper = styled.div`
  width: 100%;
`

export default StyledCard
