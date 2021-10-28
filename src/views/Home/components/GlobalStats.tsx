import React from 'react'
import { Card, CardBody, Heading, Text } from '@duhd4h/global-uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getCakeAddress, getGlobalAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const StyledCakeStats = styled(Card)`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  background: #FFFFFF;
  box-shadow: 0px 2px 6px rgba(179, 165, 209, 0.15), 0px 4px 40px rgba(179, 165, 209, 0.3);
  border-radius: 16px;
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
  const burnedBalance = getBalanceNumber(useBurnedBalance(getGlobalAddress()))
  const globalSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  return (
    <StyledCakeStats>
      <CardBody>

        <Heading color="black" scale="lg" mb="24px">
          {t('Global Stats')}
        </Heading>

        <Row>
          <Text color="#66596F" fontSize="14px">{t('Total GLOBAL Supply')}</Text>
        </Row>
        <Row>
          {globalSupply && <CardValue fontSize="18px" color="black" value={globalSupply} />}
        </Row>

        <Row>
          <Text color="#66596F" fontSize="14px">{t('Total GLOBAL Burned')}</Text>
        </Row>
        <Row>
          <CardValue fontSize="18px" color="black" decimals={0} value={burnedBalance} />
        </Row>

        <Row>
          <Text color="#66596F" fontSize="14px">{t('New GLOBAL/block')}</Text>
        </Row>
        <Row>
          <CardValue fontSize="18px" color="black" decimals={0} value={20} />
        </Row>

      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
