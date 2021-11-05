// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import { ListViewIcon, CardViewIcon, IconButton } from '@duhd4h/global-uikit'
import { ViewMode } from '../types'

interface ToggleViewProps {
  viewMode: ViewMode
  onToggle: (mode: ViewMode) => void
}

const Container = styled.div`
  margin-right: 0px;
  margin-left: -8px;
  background-color: #FFDBDB;
  border-radius: 12px;
  padding: 2px;
  
  button:first-child {
    background-color: ${(props) => props.mode === 'CARD' ? '#FF0000' : '#FFDBDB'};
    svg {
      fill: ${(props) => props.mode === 'CARD' ? '#FFFFFF' : '#FF0000'};
    }
  }
  > button:last-child {
    background-color: ${(props) => props.mode === 'CARD' ? '#FFDBDB' : '#FF0000'};
    svg {
      fill: ${(props) => props.mode === 'CARD' ? '#FF0000' : '#FFFFFF'};
    }
  }

  & > button > svg {
    fill:#FF0000;
  }
  @media screen and (max-width: 580px) {
    margin-left: 0;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 0;
    margin-right: 16px;
  }
`

const ToggleView: React.FunctionComponent<ToggleViewProps> = ({ viewMode, onToggle }) => {
  const handleToggle = (mode: ViewMode) => {
    if (viewMode !== mode) {
      onToggle(mode)
    }
  }
  return (
    <Container>
      <IconButton variant="text" scale="sm" id="clickFarmCardView" onClick={() => handleToggle(ViewMode.CARD)}>
        <CardViewIcon color={viewMode === ViewMode.CARD ? 'primary' : 'textDisabled'} />
      </IconButton>
      <IconButton variant="text" scale="sm" id="clickFarmTableView" onClick={() => handleToggle(ViewMode.TABLE)}>
        <ListViewIcon color={viewMode === ViewMode.TABLE ? 'primary' : 'textDisabled'} />
      </IconButton>
    </Container>
  )
}

export default ToggleView
