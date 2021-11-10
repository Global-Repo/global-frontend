import React from 'react'
import { Flex, useModal, CalculateIcon, Skeleton, FlexProps, Button } from '@duhd4h/global-uikit'
import { BASE_EXCHANGE_URL } from 'config'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import Balance from 'components/Balance'
import { GlobalVaultLocked, GlobalVaultStaked, GlobalVaultVested } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getVaultAprData } from 'views/Pools/helpers'

interface AprProps extends FlexProps {
  vault: GlobalVaultLocked | GlobalVaultStaked | GlobalVaultVested
  showIcon: boolean
  performanceFee?: number
}

const Apr: React.FC<AprProps> = ({ vault, showIcon, performanceFee = 0, ...props }) => {
  const { stakingToken, earningToken, earningTokensPrice } = vault
  const { t } = useTranslation()

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

  const openRoiModal = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    onPresentApyModal()
  }

  return (
    <Flex alignItems="center" justifyContent="space-between" {...props}>
      {aprArray[0].apr ? (
        <>
          <Balance onClick={openRoiModal} fontSize="16px" value={aprArray[0].apr} decimals={2} unit="%" />
          {showIcon && (
            <Button onClick={openRoiModal} variant="text" width="20px" height="20px" padding="0px" marginLeft="4px">
              <CalculateIcon color="#69626E" width="20px" />
            </Button>
          )}
        </>
      ) : (
        <Skeleton width="80px" height="16px" />
      )}
    </Flex>
  )
}

export default Apr
