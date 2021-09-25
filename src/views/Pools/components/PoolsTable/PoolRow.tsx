import React, { useState } from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from '@duhd4h/global-uikit'
import { Pool } from 'state/types'
import { useCakeVault } from 'state/hooks'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import NameCell from './Cells/NameCell'
import EarningsCell from './Cells/EarningsCell'
import AprCell from './Cells/AprCell'
import TotalStakedCell from './Cells/TotalStakedCell'
import EndsInCell from './Cells/EndsInCell'
import ExpandActionCell from './Cells/ExpandActionCell'
import ActionPanel from './ActionPanel/ActionPanel'

interface PoolRowProps {
  pool: Pool
  account: string
  userDataLoaded: boolean
}

const StyledRow = styled.div`
  display: flex;
  cursor: pointer;
  background: linear-gradient(to right, rgba(229, 36, 32, 0.1), rgba(206, 133, 14, 0.1));
  border-top: 1px solid rgb(229, 36, 32);

  &:first-child {
    border-top: 0;
  }

  &:nth-child(even) {
    border-top: 1px solid rgb(206, 133, 14);
  }
`

const PoolRow: React.FC<PoolRowProps> = ({ pool, account, userDataLoaded }) => {
  const { isXs, isSm, isMd, isLg, isXl } = useMatchBreakpoints()
  const [expanded, setExpanded] = useState(false)
  const shouldRenderActionPanel = useDelayedUnmount(expanded, 300)

  const toggleExpanded = () => {
    setExpanded((prev) => !prev)
  }

  const {
    fees: { performanceFee },
  } = useCakeVault()
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  return (
    <>
      <StyledRow role="row" onClick={toggleExpanded}>
        <NameCell pool={pool} />
        <EarningsCell pool={pool} account={account} userDataLoaded={userDataLoaded} />
        <AprCell pool={pool} performanceFee={performanceFeeAsDecimal} />
        {(isLg || isXl) && <TotalStakedCell pool={pool} />}
        {isXl && <EndsInCell pool={pool} />}
        <ExpandActionCell expanded={expanded} isFullLayout={isMd || isLg || isXl} />
      </StyledRow>
      {shouldRenderActionPanel && (
        <ActionPanel
          account={account}
          pool={pool}
          userDataLoaded={userDataLoaded}
          expanded={expanded}
          breakpoints={{ isXs, isSm, isMd, isLg, isXl }}
        />
      )}
    </>
  )
}

export default PoolRow
