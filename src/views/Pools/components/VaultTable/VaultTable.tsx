import React, { useRef } from 'react'
import styled from 'styled-components'
import { Button, ChevronUpIcon, Tag } from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'
import { Pool } from 'state/types'
import VaultRow from './VaultRow'

interface VaultTableProps {
  pools: Pool[]
  userDataLoaded: boolean
  account: string
}

const StyledTable = styled.div`
  /* overflow: visible;
  border: 1px solid;
  border-radius: 8px;
  border-image: linear-gradient(to right, #e52420, #ce850e) 30; */
  background: #FFFFFF;
  box-shadow: 0px 2px 6px rgba(179, 165, 209, 0.15), 0px 4px 40px rgba(179, 165, 209, 0.3);
  border-radius: 32px;
  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTableBorder = styled.div`
  // border-radius: ${({ theme }) => theme.radii.card};
  background-color: transparent;
  padding: 1px 1px 3px 1px;
  background-size: 400% 400%;
`

const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
`

const Wrapper = styled.div`
  cursor: pointer;
  margin-top: 24px;
`

const StyledTag = styled(Tag)`
  background: #FF0000;
  border-radius: 40px;
  color: white;
  border: none;
`

const VaultTable: React.FC<VaultTableProps> = ({ pools, userDataLoaded, account }) => {
  const { t } = useTranslation()
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const scrollToTop = (): void => {
    tableWrapperEl.current.scrollIntoView({
      behavior: 'smooth',
    })
  }

  if (!pools.length) {
    return null
  }

  return (
    <StyledTableBorder>
      <StyledTable role="table" ref={tableWrapperEl}>
        {pools.map((pool) => (
          <VaultRow
            key={pool.isAutoVault ? 'auto-cake' : pool.sousId}
            pool={pool}
            account={account}
            userDataLoaded={userDataLoaded}
          />
        ))}
      </StyledTable>
    </StyledTableBorder>
  )
}

export default VaultTable
