import React from 'react'
import styled from 'styled-components'
import { Text, useMatchBreakpoints } from '@duhd4h/global-uikit'
import { GlobalVaultLocked, GlobalVaultStaked, GlobalVaultVested } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import BaseCell, { CellContent } from './BaseCell'
import Apr from '../Apr'

interface AprCellProps {
  vault: GlobalVaultLocked | GlobalVaultStaked | GlobalVaultVested
}

const StyledCell = styled(BaseCell)`
  flex: 1 0 50px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex: 0 0 120px;
  }
`

const AprCell: React.FC<AprCellProps> = ({ vault }) => {
  const { t } = useTranslation()
  const { isXs, isSm } = useMatchBreakpoints()
  return (
    <StyledCell role="cell">
      <CellContent>
        <Text fontSize="12px" color="#69626E" textAlign="left">
          {t('APY')}
        </Text>
        <Apr vault={vault} performanceFee={0} showIcon={!isXs && !isSm} />
      </CellContent>
    </StyledCell>
  )
}

export default AprCell
