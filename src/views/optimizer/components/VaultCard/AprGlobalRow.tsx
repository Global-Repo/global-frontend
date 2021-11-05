import React from 'react'
import { Flex, TooltipText, IconButton, useModal, CalculateIcon, Skeleton } from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import { GlobalVaultLocked, GlobalVaultStaked, GlobalVaultVested } from 'state/types'
import { BASE_EXCHANGE_URL } from 'config'
import { getVaultAprData } from 'views/Pools/helpers'

interface AprGlobalRowProps {
  vault: GlobalVaultLocked | GlobalVaultStaked | GlobalVaultVested
  performanceFee?: number
}

const AprGlobalRow: React.FC<AprGlobalRowProps> = ({ vault, performanceFee = 0 }) => {
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
  const globalAPR = vaultAPR - cakeAPR

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <TooltipText fontSize="12px" color="#c0c0c0">{`${t('APR Global')}:`}</TooltipText>
      {!aprArray[0].apr ? (
        <Skeleton width="82px" height="32px" />
      ) : (
        <Flex alignItems="center">
          <Balance  fontSize="12px" isDisabled={false} value={globalAPR} decimals={2} unit="%" bold />
          <IconButton onClick={onPresentApyModal} variant="text" scale="sm">
            <CalculateIcon color="textSubtle" width="18px" />
          </IconButton>
        </Flex>
      )}
    </Flex>
  )
}

export default AprGlobalRow
