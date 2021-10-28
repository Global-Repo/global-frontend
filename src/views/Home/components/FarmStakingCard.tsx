import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, BorderGradientButton } from '@duhd4h/global-uikit'
import { harvest } from 'utils/callHelpers'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import { useMasterchef } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import UnlockButton from 'components/UnlockButton'
import GlobalHarvestBalance from './GlobalHarvestBalance'
import GlobalWalletBalance from './GlobalWalletBalance'

const StyledFarmStakingCard = styled(Card)`
  min-height: 200px;
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 2px 6px rgba(179, 165, 209, 0.15), 0px 4px 40px rgba(179, 165, 209, 0.3);
  border-radius: 16px;
  margin-top:20px;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  font-weight: bold;
`

const Actions = styled.div`
  margin-top: 24px;
`

const ButtonCustomGlobal = styled.div`
  & > div > span {
      -webkit-text-fill-color: #FF0000;
      -webkit-background-clip: text;
      color: #FF0000;
      padding:0px;
      font-size:14px;
  }
  & > div:before {
      background: #FFECEC;
      -webkit-mask: none;
      border: 1px solid rgb(255, 219, 219);
      border-radius:10px;
  }
  & > div {
    padding:12px !important;
  }
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const { toastError } = useToast()
  const farmsWithBalance = useFarmsWithBalance()
  const masterChefContract = useMasterchef()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.gt(0))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    // eslint-disable-next-line no-restricted-syntax
    for (const farmWithBalance of balancesWithValue) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await harvest(masterChefContract, farmWithBalance.pid, account)
      } catch (error) {
        toastError(t('Error'), error?.message)
      }
    }
    setPendingTx(false)
  }, [account, balancesWithValue, masterChefContract, toastError, t])

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="black" scale="lg" mb="24px">
          {t('Farms & Staking')}
        </Heading>
        <Block>
          <Label>{t('GLOBAL to Harvest')}:</Label>
          <GlobalHarvestBalance farmsWithBalance={balancesWithValue} />
        </Block>
        <Block>
          <Label>{t('GLOBAL in Wallet')}:</Label>
          <GlobalWalletBalance />
        </Block>
        <Actions>
          {account ? (
            <BorderGradientButton
              label={
                pendingTx
                  ? t('Collecting GLOBAL')
                  : t('Harvest all (%count%)', {
                      count: balancesWithValue.length,
                    })
              }
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              width="100%"
              style={{ padding: '8px', width: '100%' }}
              colorRight="#F49F23"
              colorLeft="#D41615"
            />

          ) : (
            <ButtonCustomGlobal>
              <UnlockButton
              style={{ padding: '12px', marginTop: '32px', width: '100%' , height: '40px', background: '#FFECEC', color: '#FF0000', fontSize: '14px', borderRadius: 10, border: '1px solid #FFDBDB'}}
              width="100%"
              colorRight="#FFECEC"
              colorLeft="#FFECEC" />
            </ButtonCustomGlobal>
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
