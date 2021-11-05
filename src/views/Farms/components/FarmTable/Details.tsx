import React from 'react'
import styled from 'styled-components'
import { ChevronDownIcon, Text, useMatchBreakpoints } from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'

interface DetailsProps {
  actionPanelToggled: boolean
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 8px;
  color: ${({ theme }) => theme.colors.primary};

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 0px;
  }
`

const ArrowIcon = styled(ChevronDownIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(180deg)' : 'rotate(0)')};
  height: 20px;
`

const GradientText = styled(Text)`
  background: black;
  font-weight:500;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Details: React.FC<DetailsProps> = ({ actionPanelToggled }) => {
  const { t } = useTranslation()
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  return (
    <Container>
      {!isMobile && <GradientText>{t('Details')}</GradientText>}
      <ArrowIcon color="black" toggled={actionPanelToggled} />
    </Container>
  )
}

export default Details
