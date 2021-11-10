import React from 'react'
import { Flex, Text, Button, Heading, useModal, Skeleton } from '@duhd4h/global-uikit'
import BigNumber from 'bignumber.js'
import { Token } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance, getBalanceNumber, formatNumber } from 'utils/formatBalance'
import Balance from 'components/Balance'
import CollectModal from '../Modals/CollectModal'

interface HarvestActionsProps {
  earnings: BigNumber
  earningToken: Token
  sousId: number
  earningTokenPrice: number
  isLoading?: boolean
}

const HarvestActions: React.FC<HarvestActionsProps> = ({
  earnings,
  earningToken,
  sousId,
  earningTokenPrice,
  isLoading = false,
}) => {
  const { t } = useTranslation()
  const earningTokenBalance = getBalanceNumber(earnings, earningToken.decimals)
  const formattedBalance = formatNumber(earningTokenBalance, 3, 3)

  const earningTokenDollarBalance = getBalanceNumber(earnings.multipliedBy(earningTokenPrice), earningToken.decimals)

  const fullBalance = getFullDisplayBalance(earnings, earningToken.decimals)
  const hasEarnings = earnings.toNumber() > 0
  const isCompoundPool = sousId === 0

  const [onPresentCollect] = useModal(
    <CollectModal
      formattedBalance={formattedBalance}
      fullBalance={fullBalance}
      earningToken={earningToken}
      earningsDollarValue={earningTokenDollarBalance}
      sousId={sousId}
      isCompoundPool={isCompoundPool}
    />,
  )

  return (
    <Flex flexDirection="column" mb="16px">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex flexDirection="column">
          {isLoading ? (
            <Skeleton width="80px" height="48px" />
          ) : (
            <>
              {hasEarnings ? (
                <>
                  <Balance bold fontSize="20px" color="black" decimals={5} value={earningTokenBalance} />
                  {earningTokenPrice > 0 && (
                    <Balance
                      display="inline"
                      fontSize="12px"
                      color="black"
                      decimals={2}
                      prefix="~"
                      value={earningTokenDollarBalance}
                      unit=" USD"
                    />
                  )}
                </>
              ) : (
                <>
                  <Heading color="black">0</Heading>
                  <Text fontSize="12px" color="#69626E">
                    0 USD
                  </Text>
                </>
              )}
            </>
          )}
        </Flex>
        <Flex>
          <Button
            disabled={!hasEarnings}
            onClick={onPresentCollect}
            variant='danger'
          >
            {isCompoundPool ? t('Collect') : t('Harvest')}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default HarvestActions
