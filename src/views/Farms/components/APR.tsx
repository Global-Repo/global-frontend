import React, { FC } from 'react'
import { Flex, Text, Skeleton } from '@duhd4h/global-uikit'
import styled from 'styled-components'
import { useTranslation } from '../../../contexts/Localization'


const TextGlobalApr = styled(Text)`
   font-weight: 600;
   font-size:14px;
   color: #000000;
   line-height: 17px;
`

const TextGlobalAprDes = styled(Text)`
   font-weight: 600;
   font-size:14px;
   color: #000000;
   display:flex;
   
`

interface Props {
  apr?: number
}

const APR: FC<Props> = ({ apr }) => {
  const { t } = useTranslation()

  const farmAPR = apr && apr.toLocaleString('en-US', { maximumFractionDigits: 2 })

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <TextGlobalApr>APR:</TextGlobalApr>
      <TextGlobalAprDes>
        {apr ? <>{farmAPR}%</> : <Skeleton height={24} width={80} />}
      </TextGlobalAprDes>
    </Flex>
  )
}

export default APR
