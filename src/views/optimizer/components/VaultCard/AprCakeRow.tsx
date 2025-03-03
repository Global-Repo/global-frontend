import React from 'react'
import { Flex, TooltipText, IconButton, useModal, CalculateIcon, Skeleton } from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import { GlobalVaultLocked, GlobalVaultStaked, GlobalVaultVested } from 'state/types'
import { BASE_EXCHANGE_URL } from 'config'
import { getVaultAprData } from 'views/Pools/helpers'

interface AprCakeRowProps {
  vault: GlobalVaultLocked | GlobalVaultStaked | GlobalVaultVested
  performanceFee?: number
}

const AprCakeRow: React.FC<AprCakeRowProps> = ({ vault, performanceFee = 0 }) => {
  const { t } = useTranslation()
  const { stakingToken, earningToken, earningTokensPrice } = vault

  const aprArray = getVaultAprData(vault)

  const apyModalLink =
    stakingToken.address &&
    `${BASE_EXCHANGE_URL}/#/swap?outputCurrency=${stakingToken.address[process.env.REACT_APP_CHAIN_ID]}`

  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal
      tokenPrice={earningTokensPrice[0].earningTokenPrice}
      apr={aprArray[0].apr}
      linkLabel={t('Get %symbol%', { symbol: stakingToken.symbol })}
      linkHref={apyModalLink || BASE_EXCHANGE_URL}
      earningTokenSymbol={earningToken[0].symbol}
      roundingDecimals={aprArray[0].roundingDecimals}
      compoundFrequency={aprArray[0].compoundFrequency}
      performanceFee={performanceFee}
    />,
  )

  const vaultAPR = aprArray[0].apr - (aprArray[0].apr * 0.02) + (aprArray[0].apr * 0.4)
  const cakeAPR = aprArray[0].apr * (aprArray[0].apr * 0.3)

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <TooltipText fontSize="12px" color="black">{`${t('APR Cake')}:`}</TooltipText>
      {!aprArray[0].apr ? (
        <Skeleton width="82px" height="32px" />
      ) : (
        <Flex alignItems="center">
          <Balance  fontSize="12px" isDisabled={false} value={cakeAPR} decimals={2} unit="%" bold />
          <IconButton onClick={onPresentApyModal} variant="text" scale="sm">
            <CalculateIcon color="#69626E" width="18px" />
          </IconButton>
        </Flex>
      )}
    </Flex>
  )
}

export default AprCakeRow