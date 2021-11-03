import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton, BorderGradientButton, Button } from '@duhd4h/global-uikit'
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
  background: #FFFFFF;
  box-shadow: 0px 2px 6px rgba(179, 165, 209, 0.15), 0px 4px 40px rgba(179, 165, 209, 0.3);
  border-radius: 16px;
  font-size:22px;
  color:black;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
  & > span {
      color:red;
      padding:0px;
      font-size:14px;
  }
`
const CardMidContent = styled(Heading).attrs({ scale: 'lg' })`
  line-height: 60px;
  background: linear-gradient(to right, #D41615, #F49F23);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`

const ButtonCustomGlobal = styled.div`
  & > div > span {
      -webkit-text-fill-color: #FF0000;
      -webkit-background-clip: text;
      color: #FF0000;
      padding:0px;
      font-size:14px;
  }
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
      // no pasa el if
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

  const styleInFarms = { color: '#66596F', fontSize: '14px' }

  return (
    <StyledFarmStakingCard>
      <CardBody style={{ height: '100%', color: '#000000'}}>
        <Heading color="black" scale="lg">
          {earnUpTo}
        </Heading>
        <CardMidContent color="black">
          {highestApr && !isFetchingFarmData ? (
            `${highestApr}%`
          ) : (
            <>
              <Skeleton animation="pulse" variant="rect" height="44px" />
              Cooming soon
              <div ref={observerRef} />
            </>
          )}
        </CardMidContent>
        <Flex justifyContent="space-between">
          <Heading style={styleInFarms} color="black" scale="lg">
            {InFarms}
          </Heading>
        </Flex>
        <ButtonCustomGlobal>
          <BorderGradientButton
            label="Details >"
            onClick={() => history.push('/')}
            style={{ padding: '8px', marginTop: '32px', width: '100%' , height: '40px', background: '#FFECEC', color: '#FF0000', fontSize: '14px', borderRadius: 10, border: '1px solid #FFDBDB'}}
            colorRight="#FFECEC"
            colorLeft="#FFECEC"
          />
        </ButtonCustomGlobal>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAPRCard
