import styled from 'styled-components'
import { Text } from '@duhd4h/global-uikit'

export const CellTitle = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacing[2]}px;
  font-size: 11px;
  color: #a099a5;
  text-align: left;
  text-transform: uppercase;
`
