import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'
import { useGetStats } from 'hooks/api'

const StyledTotalValueLockedCard = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  flex: 1;
`

const CardMidContent = styled(Heading).attrs({ scale: 'xxl' })`
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 61px;
  font-weight: 600;
  margin-bottom: 25px;
  color: #FF0000;
`

const styleHeading = {
  color: '#000000',
  fontSize: '22px'
}


const TotalValueLockedCard = () => {
  const { t } = useTranslation()
  const data = useGetStats()
  const tvl = data ? data.tvl.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null

  return (
    <StyledTotalValueLockedCard>
      <Heading style={styleHeading} scale="xl" mb="24px" mt="80px">
        {t('Total Value Locked (TVL)')}
      </Heading>
      {data ? (
        <>
          <CardMidContent>{`$${tvl}`}</CardMidContent>
        </>
      ) : (
        <Skeleton height={66} width={500} mb="36px" />
      )}
      <Text color="black" fontSize="22px">{t('Across all LPs and Pools')}</Text>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
