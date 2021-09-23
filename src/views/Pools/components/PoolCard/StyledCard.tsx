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

export const StyledCard = styled(Card)<{ isPromoted?: PromotedStyleCardProps; isFinished?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: baseline;
  position: relative;
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'secondary']};
  // box-shadow: 0px 1px 4px rgba(25, 19, 38, 0.15);
  background: transparent;

  ${({ isPromoted, theme }) =>
    isPromoted
      ? css`
          background: transparent;
          background-size: 400% 400%;
        `
      : `background: transparent`}

  ${({ isPromoted }) =>
    isPromoted &&
    isPromoted.isDesktop &&
    css`
      animation: ${PromotedGradient} 3s ease infinite;
    `}
`

export const StyledCardInner = styled(Box)`
  background: transparent;
  // border-radius: ${({ theme }) => theme.radii.card};
`

export default StyledCard
