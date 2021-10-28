import React from 'react'
import { Text } from '@duhd4h/global-uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { FarmWithBalance } from 'hooks/useFarmsWithBalance'
import { usePriceGlobalBusd } from 'state/hooks'
import styled from 'styled-components'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-bottom: 24px;
`

interface GlobalHarvestBalanceProps {
  farmsWithBalance: FarmWithBalance[]
}

const GlobalHarvestBalance: React.FC<GlobalHarvestBalanceProps> = ({ farmsWithBalance }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const earningsSum = farmsWithBalance.reduce((accum, earning) => {
    const earningNumber = new BigNumber(earning.balance)
    if (earningNumber.eq(0)) {
      return accum
    }
    return accum + earningNumber.div(DEFAULT_TOKEN_DECIMAL).toNumber()
  }, 0)
  const globalPriceBusd = usePriceGlobalBusd()
  const earningsBusd = new BigNumber(earningsSum).multipliedBy(globalPriceBusd).toNumber()

  if (!account) {
    return (
      <Text color="textDisabled" style={{lineHeight: '56px', fontSize: '18px', color:'#000000', fontWeight: 'bold'}}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <Block>
      <CardValue value={earningsSum} lineHeight="1.5" fontSize="24px" />
      {globalPriceBusd.gt(0) && <CardBusdValue value={earningsBusd} />}
    </Block>
  )
}

export default GlobalHarvestBalance
