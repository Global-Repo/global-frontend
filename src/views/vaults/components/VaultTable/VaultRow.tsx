import React, { useState } from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from '@duhd4h/global-uikit'
import { GlobalVaultLocked, GlobalVaultStaked, GlobalVaultVested } from 'state/types'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import NameCell from './Cells/NameCell'
import EarningsCell from './Cells/EarningsCell'
import AprCell from './Cells/AprCell'
import TotalStakedCell from './Cells/TotalStakedCell'
import ExpandActionCell from './Cells/ExpandActionCell'
import ActionPanel from './ActionPanel/ActionPanel'

interface PoolRowProps {
  vault: GlobalVaultLocked | GlobalVaultStaked | GlobalVaultVested
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

const VaultRow: React.FC<PoolRowProps> = ({ vault, account, userDataLoaded }) => {
  const { isXs, isSm, isMd, isLg, isXl } = useMatchBreakpoints()
  const [expanded, setExpanded] = useState(false)
  const shouldRenderActionPanel = useDelayedUnmount(expanded, 300)

  const toggleExpanded = () => {
    setExpanded((prev) => !prev)
  }

  return (
    <>
      <StyledRow role="row" onClick={toggleExpanded}>
        <NameCell vault={vault} />
        <EarningsCell vault={vault} account={account} userDataLoaded={userDataLoaded} />
        <AprCell vault={vault} />
        {(isLg || isXl) && <TotalStakedCell vault={vault} />}
        <ExpandActionCell expanded={expanded} isFullLayout={isMd || isLg || isXl} />
      </StyledRow>
      {shouldRenderActionPanel && (
        <ActionPanel
          account={account}
          vault={vault}
          userDataLoaded={userDataLoaded}
          expanded={expanded}
          breakpoints={{ isXs, isSm, isMd, isLg, isXl }}
        />
      )}
    </>
  )
}

export default VaultRow
