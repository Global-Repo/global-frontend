import React from 'react'
import { Card, CardBody, Heading, Text } from '@duhd4h/global-uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const StyledCakeStats = styled(Card)`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  background-color: #134894;
  border: 2px solid white;
  border-radius: 24px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CakeStats = () => {
  const { t } = useTranslation()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()))
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading scale="lg" mb="24px">
          {t('Global Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{t('Total GLOGBAL Supply')}</Text>
          {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total GLOGBAL Burned')}</Text>
          <CardValue fontSize="14px" decimals={0} value={burnedBalance} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('New GLOGBAL/block')}</Text>
          <CardValue fontSize="14px" decimals={0} value={20} />
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
