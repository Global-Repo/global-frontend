import React, { FC } from 'react'
import { Flex, Text, Skeleton } from '@duhd4h/global-uikit'
import styled from 'styled-components'

const TextGlobalApr = styled(Text)`
   font-weight: 600;
   font-size:14px;
   color: #000000;
   line-height: 17px;
`

interface Props {
  apr?: number
}

const APR: FC<Props> = ({ apr }) => {
  const farmAPR = apr && apr.toLocaleString('en-US', { maximumFractionDigits: 2 })

  return (
    <Flex>
      <TextGlobalApr>APR: {apr ? <>{farmAPR}%</> : <Skeleton height={24} width={80} />}</TextGlobalApr>
    </Flex>
  )
}

export default APR
