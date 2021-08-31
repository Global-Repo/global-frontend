import React from 'react'
import styled from 'styled-components'
import { Spinner } from '@duhd4h/global-uikit'
import Page from './layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      <Spinner size={128} />
    </Wrapper>
  )
}

export default PageLoader
