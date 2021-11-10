import BigNumber from 'bignumber.js'
import React from 'react'
import { CardBody, Flex, Text, CardRibbon, GradientBorderBox } from '@duhd4h/global-uikit'
import UnlockButton from 'components/UnlockButton'
import { useTranslation } from 'contexts/Localization'
import { BIG_ZERO } from 'utils/bigNumber'
import { Pool } from 'state/types'
import AprRow from './AprRow'
import { StyledCard, StyledCardInner } from './StyledCard'
import CardFooter from './CardFooter'
import StyledCardHeader from './StyledCardHeader'
import CardActions from './CardActions'

const PoolCard: React.FC<{ pool: Pool; account: string }> = ({ pool, account }) => {
  const { sousId, stakingToken, earningToken, isFinished, userData } = pool
  const { t } = useTranslation()
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const accountHasStakedBalance = stakedBalance.gt(0)

  return (
    <div>
      <GradientBorderBox colorLeft="#e52420" colorRight="#ce850e" borderWidth="1px" style={{ width: '100%' }}>
        <StyledCard
          isFinished={isFinished && sousId !== 0}
          ribbon={isFinished && <CardRibbon variantColor="textDisabled" text={t('Finished')} />}
        >
          <StyledCardInner>
            <StyledCardHeader
              isStaking={accountHasStakedBalance}
              earningToken={earningToken}
              stakingToken={stakingToken}
              isFinished={isFinished && sousId !== 0}
            />
            <CardBody>
              <AprRow pool={pool} />
              <Flex mt="24px" flexDirection="column">
                {account ? (
                  <CardActions pool={pool} stakedBalance={stakedBalance} />
                ) : (
                  <>
                    <Text mb="10px" textTransform="uppercase" fontSize="12px" color="#69626E" bold>
                      {t('Start earning')}
                    </Text>
                    <UnlockButton isPool />
                  </>
                )}
              </Flex>
            </CardBody>
            <CardFooter pool={pool} account={account} />
          </StyledCardInner>
        </StyledCard>
      </GradientBorderBox>
    </div>
  )
}

export default PoolCard
