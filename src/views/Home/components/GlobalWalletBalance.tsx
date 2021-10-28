import React from 'react'
import { Text } from '@duhd4h/global-uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getGlobalAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceGlobalBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const GlobalWalletBalance = () => {
  const { t } = useTranslation()
  const { balance: globalBalance } = useTokenBalance(getGlobalAddress())
  const globalPriceBusd = usePriceGlobalBusd()
  const busdBalance = new BigNumber(getBalanceNumber(globalBalance)).multipliedBy(globalPriceBusd).toNumber()
  const { account } = useWeb3React()

  if (!account) {
    return (
      <Text color="textDisabled" style={{lineHeight: '56px', fontSize: '18px', color:'#000000', fontWeight: 'bold'}}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <>
      <CardValue value={getBalanceNumber(globalBalance)} decimals={4} fontSize="24px" lineHeight="36px" />
      {globalPriceBusd.gt(0) ? <CardBusdValue value={busdBalance} /> : <br />}
    </>
  )
}

export default GlobalWalletBalance
