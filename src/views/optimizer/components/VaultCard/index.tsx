import BigNumber from 'bignumber.js'
import React from 'react'
import { CardBody, Flex, Text, CardRibbon, GradientBorderBox, Box } from '@duhd4h/global-uikit'
import UnlockButton from 'components/UnlockButton'
import { useTranslation } from 'contexts/Localization'
import { BIG_ZERO } from 'utils/bigNumber'
import { GlobalVaultLocked, GlobalVaultStaked, GlobalVaultVested } from 'state/types'
import AprRow from './AprRow'
import { StyledCard, StyledCardInner, GradientBorderBoxWrapper } from './StyledCard'
import CardFooter from './CardFooter'
import StyledCardHeader from './StyledCardHeader'
import CardActions from './CardActions'
import EarnRow from './EarnRow'
import PenaltyFeeRow from './PenaltyFeeRow'
import AprCakeRow from './AprCakeRow'
import AprGlobalRow from './AprGlobalRow'




const VaultCard: React.FC<{ vault: GlobalVaultLocked | GlobalVaultVested | GlobalVaultStaked; account: string }> = ({
  vault,
  account,
}) => {
  const { stakingToken, earningToken, userData } = vault
  const { t } = useTranslation()
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const accountHasStakedBalance = stakedBalance.gt(0)

  return (
    <div>
      <GradientBorderBoxWrapper>
        <StyledCard
          isPromoted
          isFinished={false}
          ribbon={false && <CardRibbon variantColor="textDisabled" text={t('Finished')} />}
        >
          <StyledCardInner>
            <StyledCardHeader
              isStaking={accountHasStakedBalance}
              earningToken={earningToken}
              stakingToken={stakingToken}
              isFinished={false}
            />
            <CardBody>
              <AprRow vault={vault} />
              <AprCakeRow vault={vault}/>
              <AprGlobalRow vault={vault}/>
              <EarnRow />
              {'penaltyFee' in vault && <PenaltyFeeRow vault={vault} />}
              <Flex mt="24px" flexDirection="column">
                {account ? (
                  <CardActions vault={vault} stakedBalance={stakedBalance} />
                ) : (
                  <>
                    <Text mb="10px" textTransform="uppercase" fontSize="12px" color="black" bold>
                      {t('Start earning')}
                    </Text>
                    <UnlockButton />
                  </>
                )}
              </Flex>
            </CardBody>
            <CardFooter vault={vault} account={account} />
          </StyledCardInner>
        </StyledCard>
      </GradientBorderBoxWrapper>
    </div>
  )
}

export default VaultCard