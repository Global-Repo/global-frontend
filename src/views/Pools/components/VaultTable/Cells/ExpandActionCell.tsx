import React from 'react'
import styled from 'styled-components'
import { Text, ChevronDownIcon } from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'
import BaseCell from './BaseCell'

interface ExpandActionCellProps {
  expanded: boolean
  isFullLayout: boolean
}

const StyledCell = styled(BaseCell)`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  padding-right: 12px;
  padding-left: 0px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex: 0 0 120px;
    padding-right: 32px;
    padding-left: 8px;
  }
`

const StyledText = styled(Text)`
  color: black;
`

const ArrowIcon = styled(ChevronDownIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(180deg)' : 'rotate(0)')};
  height: 24px;
`

const GradientText = styled(Text)`
  background: black;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const TotalStakedCell: React.FC<ExpandActionCellProps> = ({ expanded, isFullLayout }) => {
  const { t } = useTranslation()
  return (
    <StyledCell role="cell">
      {isFullLayout && (
        <StyledText color="primary" bold>
          <GradientText>{expanded ? t('Hide') : t('Details')}</GradientText>
        </StyledText>
      )}
      <ArrowIcon color="primary" toggled={expanded} />
    </StyledCell>
  )
}

export default TotalStakedCell
