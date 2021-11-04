import React from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from '@duhd4h/global-uikit'
import { Pool } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import BaseCell, { CellContent } from './BaseCell'
import Apr from '../Apr'
import { CellTitle } from './styles'

interface AprCellProps {
  pool: Pool
  performanceFee: number
}

const StyledCell = styled(BaseCell)`
  flex: 1 0 50px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex: 0 0 150px;
  }
`

const AprCell: React.FC<AprCellProps> = ({ pool, performanceFee }) => {
  const { t } = useTranslation()
  const { isXs, isSm } = useMatchBreakpoints()
  const { isAutoVault } = pool
  return (
    <StyledCell role="cell">
      <CellContent>
        <CellTitle>{isAutoVault ? t('APY') : t('APR')}</CellTitle>
        <Apr pool={pool} performanceFee={isAutoVault ? performanceFee : 0} showIcon={!isXs && !isSm} />
      </CellContent>
    </StyledCell>
  )
}

export default AprCell
