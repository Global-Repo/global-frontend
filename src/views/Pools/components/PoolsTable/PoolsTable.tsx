import React, { useRef } from 'react'
import styled from 'styled-components'
import { Button, ChevronUpIcon, Tag } from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'
import { Pool } from 'state/types'
import PoolRow from './PoolRow'

interface PoolsTableProps {
  pools: Pool[]
  userDataLoaded: boolean
  account: string
}

const StyledTable = styled.div`
  overflow: visible;
  border: 1px solid;
  border-radius: 8px;
  border-image: linear-gradient(to right, #e52420, #ce850e) 30;

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

const PoolsTable: React.FC<PoolsTableProps> = ({ pools, userDataLoaded, account }) => {
  const { t } = useTranslation()
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const scrollToTop = (): void => {
    tableWrapperEl.current.scrollIntoView({
      behavior: 'smooth',
    })
  }
  return (
    <StyledTableBorder>
      <StyledTable role="table" ref={tableWrapperEl}>
        {pools.map((pool) => (
          <PoolRow
            key={pool.isAutoVault ? 'auto-cake' : pool.sousId}
            pool={pool}
            account={account}
            userDataLoaded={userDataLoaded}
          />
        ))}
      </StyledTable>
      <ScrollButtonContainer>
        <Wrapper onClick={scrollToTop}>
          <Tag variant="gradient" outline>
            <span>{t('To Top')}</span>
            <ChevronUpIcon />
          </Tag>
        </Wrapper>
      </ScrollButtonContainer>
    </StyledTableBorder>
  )
}

export default PoolsTable
