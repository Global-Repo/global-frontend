import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Button, useModal, IconButton, AddIcon, MinusIcon, Skeleton, Text } from '@duhd4h/global-uikit'
import { useLocation } from 'react-router-dom'
import { BigNumber } from 'bignumber.js'
import UnlockButton from 'components/UnlockButton'
import Balance from 'components/Balance'
import { useWeb3React } from '@web3-react/core'
import { useFarmUser, useLpTokenPrice } from 'state/hooks'
import { fetchFarmUserDataAsync } from 'state/farms'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { useTranslation } from 'contexts/Localization'
import { useApprove } from 'hooks/useApprove'
import { useERC20 } from 'hooks/useContract'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { useAppDispatch } from 'state'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getBalanceAmount, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import useStake from 'hooks/useStake'
import useUnstake from 'hooks/useUnstake'
import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'
import { ActionContainer, ActionTitles, ActionContent, Earned } from './styles'

const IconButtonWrapper = styled.div`
  display: flex;
`

const GradientText = styled(Text)`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
  padding-right: 4px;
  background: linear-gradient(to right, #e52420, #ce850e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const GlobalTextInfo = styled(Text)`
  font-size: 11px;
  line-height: 13px;
  display: flex;
  align-items: center;
  color: #69626E;

`

const GlobalActionContentUnlockButton = styled.div`
  > div:before{
    background:red;
    content:none;
  }
  > div {
    background: #FF0000;
    border-radius: 10px;
    border:0px;
    margin-top: 5px;
  }
  > div > span{
    color: white;
    -webkit-background-clip: text;
    -webkit-text-fill-color: white;
    font-size: 16px;
    font-weight: 500;
  }
`

const ButtonGlobalUnlockStyle = styled(UnlockButton)`
  /* Auto Layout */
`

const ButtonGlobalStyle = styled(Button)`
  background:red;
  margin-top:5px;
  box-shadow:none;
  font-size: 16px;
  font-weight: 500;
`

interface StackedActionProps extends FarmWithStakedValue {
  userDataReady: boolean
}

const Staked: React.FunctionComponent<StackedActionProps> = ({
  pid,
  lpSymbol,
  lpAddresses,
  quoteToken,
  token,
  userDataReady,
}) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { allowance, tokenBalance, stakedBalance } = useFarmUser(pid)
  const { onStake } = useStake(pid)
  const { onUnstake } = useUnstake(pid)
  const location = useLocation()
  const lpPrice = useLpTokenPrice(lpSymbol)

  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const lpAddress = lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  const handleStake = async (amount: string) => {
    await onStake(amount)
    dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
  }

  const handleUnstake = async (amount: string) => {
    await onUnstake(amount)
    dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
  }

  const displayBalance = useCallback(() => {
    const stakedBalanceBigNumber = getBalanceAmount(stakedBalance)
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0001)) {
      return getFullDisplayBalance(stakedBalance).toLocaleString()
    }
    return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  }, [stakedBalance])

  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={handleStake} tokenName={lpSymbol} addLiquidityUrl={addLiquidityUrl} />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={handleUnstake} tokenName={lpSymbol} />,
  )
  const lpContract = useERC20(lpAddress)
  const dispatch = useAppDispatch()
  const { onApprove } = useApprove(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))

      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, dispatch, account, pid])

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>
          <GlobalTextInfo bold textTransform="uppercase">
            {t('Start Farming')}
          </GlobalTextInfo>
        </ActionTitles>
        <GlobalActionContentUnlockButton>
            <UnlockButton width="100%" />
        </GlobalActionContentUnlockButton>
      </ActionContainer>
    )
  }

  if (isApproved) {
    if (stakedBalance.gt(0)) {
      return (
        <ActionContainer>
          <ActionTitles>
            <GradientText>{lpSymbol}</GradientText>
            <Text bold textTransform="uppercase" color="#69626E" fontSize="12px">
              {t('Staked')}
            </Text>
          </ActionTitles>
          <ActionContent>
            <div>
              <Earned>{displayBalance()}</Earned>
              {stakedBalance.gt(0) && lpPrice.gt(0) && (
                <Balance
                  fontSize="12px"
                  color="#69626E"
                  decimals={2}
                  value={getBalanceNumber(lpPrice.times(stakedBalance))}
                  unit=" USD"
                  prefix="~"
                />
              )}
            </div>
            <IconButtonWrapper>
              <IconButton variant="full_gradient_pool" onClick={onPresentWithdraw} mr="6px">
                <MinusIcon color="white" width="14px" />
              </IconButton>
              <IconButton
                variant="full_gradient_pool"
                onClick={onPresentDeposit}
                disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
              >
                <AddIcon color="white" width="14px" />
              </IconButton>
            </IconButtonWrapper>
          </ActionContent>
        </ActionContainer>
      )
    }

    return (
      <ActionContainer>
        <ActionTitles>
          <Text bold textTransform="uppercase" color="black" fontSize="12px" pr="4px">
            {t('Stake').toUpperCase()}
          </Text>
          <GradientText>{lpSymbol}</GradientText>
        </ActionTitles>
        <ActionContent>
          <ButtonGlobalStyle
            width="100%"
            onClick={onPresentDeposit}
            variant="full_gradient_pool"
            disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
          >
            {t('Stake LP')}
          </ButtonGlobalStyle>
        </ActionContent>
      </ActionContainer>
    )
  }

  if (!userDataReady) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text bold textTransform="uppercase" color="black" fontSize="12px">
            {t('Start Farming')}
          </Text>
        </ActionTitles>
        <ActionContent>
          <Skeleton width={180} marginBottom={28} marginTop={14} />
        </ActionContent>
      </ActionContainer>
    )
  }

  return (
    <ActionContainer>
      <ActionTitles>
        <Text bold textTransform="uppercase" color="black" fontSize="12px">
          {t('Enable Farm')}
        </Text>
      </ActionTitles>
      <ActionContent>
        <ButtonGlobalStyle width="100%" disabled={requestedApproval} onClick={handleApprove} variant="full_gradient_pool">
          {t('Enable')}
        </ButtonGlobalStyle>
      </ActionContent>
    </ActionContainer>
  )
}

export default Staked
