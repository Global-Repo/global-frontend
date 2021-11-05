import React, { useRef } from 'react'
import styled from 'styled-components'
import { useTable, Button, ChevronUpIcon, ColumnType, Tag } from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'

import Row, { RowProps } from './Row'

export interface ITableProps {
  data: RowProps[]
  columns: ColumnType<RowProps>[]
  userDataReady: boolean
  sortColumn?: string
}

const Container = styled.div`
  // filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  background: transparent;
  border-radius: 8px;
  margin: 16px 0px;
`

const TableWrapper = styled.div`
  overflow: visible;
  border: 0px solid;
  border-radius: 32px;
  box-shadow: 0px 2px 6px rgba(179, 165, 209, 0.15), 0px 4px 40px rgba(179, 165, 209, 0.3);
  border-image: none;
  background:white;
  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`

const TableBody = styled.tbody`
  & tr {
    background: transparent;
    td {
      font-size: 16px;
      vertical-align: middle;
      div  {

      }
    }
  }
`

const TableContainer = styled.div`
  position: relative;
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
const TagToTopCustom = styled(Tag)`
  background: red;
  color: white;
  border-color: red;
  font-weight: bold;
`


const FarmTable: React.FC<ITableProps> = (props) => {
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  const { data, columns, userDataReady } = props

  const { rows } = useTable(columns, data, { sortable: true, sortColumn: 'farm' })

  const scrollToTop = (): void => {
    tableWrapperEl.current.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <Container>
      <TableContainer>
        <TableWrapper ref={tableWrapperEl}>
          <StyledTable>
            <TableBody>
              {rows.map((row) => {
                return <Row {...row.original} userDataReady={userDataReady} key={`table-row-${row.id}`} />
              })}
            </TableBody>
          </StyledTable>
        </TableWrapper>
        <ScrollButtonContainer>
          <Wrapper onClick={scrollToTop}>
            <TagToTopCustom variant="primary" outline>
              <span>{t('To Top')}</span>
              <ChevronUpIcon />
            </TagToTopCustom>
          </Wrapper>
        </ScrollButtonContainer>
      </TableContainer>
    </Container>
  )
}

export default FarmTable
