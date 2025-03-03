import styled from 'styled-components'

export const ActionContainer = styled.div`
  padding: 16px;
  // border: 2px solid ${({ theme }) => theme.colors.input};
  // border-radius: 8px;
  flex-grow: 1;
  flex-basis: 0;
  margin-bottom: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 12px;
    margin-right: 12px;
    margin-bottom: 0;
    height: 130px;
    max-height: 130px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    margin-left: 0px;
    margin-right: 0;
    margin-bottom: 0;
    height: 130px;
    max-height: 130px;
  }
`

export const ActionTitles = styled.div`
  font-weight: 600;
  font-size: 12px;
`

export const ActionContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
