import React from 'react'
import styled from 'styled-components'
import { Box } from '@duhd4h/global-uikit'
import Container from '../layout/Container'

const Outer = styled(Box)<{ background?: string }>`
  // background: linear-gradient(139.73deg, #f4bd23 0%, #d50000 100%);
`

const Inner = styled(Container)`
  padding-top: 32px;
  padding-bottom: 32px;
`

const PageHeader: React.FC<{ background?: string }> = ({ background, children, ...props }) => (
  <Outer background={background} {...props}>
    <Inner>{children}</Inner>
  </Outer>
)

export default PageHeader
