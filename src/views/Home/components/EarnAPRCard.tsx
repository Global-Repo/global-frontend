import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton, BorderGradientButton } from '@duhd4h/global-uikit'
import { ChainId } from '@duhd4h/global-sdk'
import max from 'lodash/max'
import { NavLink, useHistory } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { useFarms, usePriceGlobalBusd } from 'state/hooks'
import { fetchFarmsPublicDataAsync, nonArchivedFarms } from 'state/farms'
import { getFarmApr } from 'utils/apr'
import useIntersectionObserver from 'hooks/useIntersectionObserver'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  background: transparent;
  border: 2px solid white;
  border-radius: 24px;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ scale: 'lg' })`
  line-height: 44px;
  background: linear-gradient(to right, #bb5370, #529dd6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`

const EarnAPRCard = () => {
  const [isFetchingFarmData, setIsFetchingFarmData] = useState(true)
  const { t } = useTranslation()
  const { data: farmsLP } = useFarms()
  const globalPrice = usePriceGlobalBusd()
  const dispatch = useAppDispatch()
  const { observerRef, isIntersecting } = useIntersectionObserver()

  const history = useHistory()

  // Fetch farm data once to get the max APR
  useEffect(() => {
    const fetchFarmData = async () => {
      try {
        await dispatch(fetchFarmsPublicDataAsync(nonArchivedFarms.map((nonArchivedFarm) => nonArchivedFarm.pid)))
      } finally {
        setIsFetchingFarmData(false)
      }
    }

    if (isIntersecting) {
      fetchFarmData()
    }
  }, [dispatch, setIsFetchingFarmData, isIntersecting])

  const highestApr = useMemo(() => {
    if (globalPrice.gt(0)) {
      const aprs = farmsLP.map((farm) => {
        // Filter inactive farms, because their theoretical APR is super high. In practice, it's 0.
        if (farm.pid !== 0 && farm.multiplier !== '0X' && farm.lpTotalInQuoteToken && farm.quoteToken.busdPrice) {
          const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
          return getFarmApr(
            new BigNumber(farm.poolWeight),
            globalPrice,
            totalLiquidity,
            farm.lpAddresses[ChainId.MAINNET],
          )
        }
        return null
      })

      const maxApr = max(aprs)
      return maxApr?.toLocaleString('en-US', { maximumFractionDigits: 2 })
    }
    return null
  }, [globalPrice, farmsLP])

  const aprText = highestApr || '-'
  const earnAprText = t('Earn up to %highestApr% APR in Farms', { highestApr: aprText })
  const [earnUpTo, InFarms] = earnAprText.split(aprText)

  return (
    <StyledFarmStakingCard>
      <CardBody style={{ height: '100%' }}>
        <Heading color="contrast" scale="lg">
          {earnUpTo}
        </Heading>
        <CardMidContent color="primary">
          {highestApr && !isFetchingFarmData ? (
            `${highestApr}%`
          ) : (
            <>
              <Skeleton animation="pulse" variant="rect" height="44px" />
              <div ref={observerRef} />
            </>
          )}
        </CardMidContent>
        <Flex justifyContent="space-between">
          <Heading color="contrast" scale="lg">
            {InFarms}
          </Heading>
        </Flex>
        <BorderGradientButton
          label="Details >"
          onClick={() => history.push('/farms')}
          style={{ padding: '8px', marginTop: '32px', width: '100%' }}
        />
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAPRCard
