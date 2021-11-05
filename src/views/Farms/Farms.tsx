import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Heading, RowType, Toggle, Text } from '@duhd4h/global-uikit'
import { ChainId } from '@duhd4h/global-sdk'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import { useFarms, usePollFarmsData, usePriceGlobalBusd } from 'state/hooks'
import usePersistState from 'hooks/usePersistState'
import { Farm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { getFarmApr } from 'utils/apr'
import { orderBy } from 'lodash'
import isArchivedPid from 'utils/farmHelpers'
import { latinise } from 'utils/latinise'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import FarmTabButtons from './components/FarmTabButtons'
import { RowProps } from './components/FarmTable/Row'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema, ViewMode } from './components/types'
import { getApy } from '../../utils/apy'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  ${Text} {
    margin-left: 8px;
  }

  & > div:first-child {
    background-color: #FFDBDB;
    box-shadow: none;
  }

  & > div:first-child > div{
    background-color: red;
  }

`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
    color:black;
  }
`

const Content = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  #root > div > div > div:first-of-type {

  }
  & 

`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 280px;
    max-width: 31.5%;
    width: 100%;
    margin: 0 8px;
    margin-bottom: 32px;
  }
`

const TitleSectionGlobal = styled(Heading)`
  font-size: 38px;
  text-align:center;
`

const SubTitleSectionGlobal = styled(Heading)`
  font-size: 22px;
  line-height: 34px;
  text-align: center;
  color: #000000;
  font-weight:300;
`

const PageFarming = styled(Page)`

`

const PageHeaderFarming = styled(PageHeader)`
  background-image: url('/images/home/farms_pyramid.png'), url('/images/home/farms_cube.png');
  background-repeat: no-repeat;
  background-size:   129px 158px, 119px 152px;
  background-position:  top left, bottom right;
  z-index: 0;
  ${({ theme }) => theme.mediaQueries.lg} {
    min-height: 220px;
    margin-top:15px;
  }
`



const NUMBER_OF_FARMS_VISIBLE = 12

const Farms: React.FC = () => {
  console.log("llega");
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { data: farmsLP, userDataLoaded } = useFarms()
  console.log(farmsLP)
  const globalPrice = usePriceGlobalBusd()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = usePersistState(ViewMode.CARD, { localStorageKey: 'pancake_farm_view' })
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  usePollFarmsData(isArchived)

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useState(!isActive)
  useEffect(() => {
    setStakedOnly(!isActive)
  }, [isActive])

  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X' && !isArchivedPid(farm.pid))
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X' && !isArchivedPid(farm.pid))
  const archivedFarms = farmsLP.filter((farm) => isArchivedPid(farm.pid))

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedArchivedFarms = archivedFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteToken.busdPrice) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
        console.log(totalLiquidity, "total liquisty")
        const apr = isActive
          ? getFarmApr(new BigNumber(farm.poolWeight), globalPrice, totalLiquidity, farm.lpAddresses[ChainId.MAINNET])
          : 0

        const apy = apr ? getApy(apr) : 0

        return { ...farm, apr, apy, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [globalPrice, query, isActive],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)

  const farmsStakedMemoized = useMemo(() => {
    let farmsStaked = []

    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr, 'desc')
        case 'apy':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apy, 'desc')
        case 'multiplier':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            'desc',
          )
        case 'earned':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.userData ? Number(farm.userData.earnings) : 0),
            'desc',
          )
        case 'liquidity':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
        default:
          return farms
      }
    }

    if (isActive) {
      farmsStaked = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    }
    if (isInactive) {
      farmsStaked = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    }
    if (isArchived) {
      farmsStaked = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
    }

    return sortFarms(farmsStaked).slice(0, numberOfFarmsVisible)
  }, [
    sortOption,
    activeFarms,
    farmsList,
    inactiveFarms,
    archivedFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ])

  useEffect(() => {
    const showMoreFarms = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfFarmsVisible((farmsCurrentlyVisible) => farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreFarms, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [farmsStakedMemoized, observerIsSet])

  const rowData = farmsStakedMemoized.map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')

    const row: RowProps = {
      apr: {
        value: farm.apr && farm.apr.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        multiplier: farm.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        cakePrice: globalPrice,
        originalValue: farm.apr,
      },
      apy: {
        value: farm.apy && farm.apy.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        multiplier: farm.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        cakePrice: globalPrice,
        originalValue: farm.apy,
        aprOriginalValue: farm.apr,
      },
      farm: {
        label: lpLabel,
        pid: farm.pid,
        token: farm.token,
        quoteToken: farm.quoteToken,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }

    return row
  })

  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.CARD && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apy':
              if (a.original.apy.value && b.original.apy.value) {
                return Number(a.original.apy.value) - Number(b.original.apy.value)
              }

              return 0
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} userDataReady={userDataReady} />
    }

    return (
      <CardsContainer>
        <Route exact path={`${path}`}>
          {farmsStakedMemoized.map((farm) => (
            <FarmCard key={farm.pid} farm={farm} globalPrice={globalPrice} account={account} removed={false} />
          ))}
        </Route>
        <Route exact path={`${path}/history`}>
          {farmsStakedMemoized.map((farm) => (
            <FarmCard key={farm.pid} farm={farm} globalPrice={globalPrice} account={account} removed />
          ))}
        </Route>
        <Route exact path={`${path}/archived`}>
          {farmsStakedMemoized.map((farm) => (
            <FarmCard key={farm.pid} farm={farm} globalPrice={globalPrice} account={account} removed />
          ))}
        </Route>
      </CardsContainer>
    )
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  return (
    <PageFarming>
      <PageHeaderFarming background="transparent">
        <TitleSectionGlobal as="h1" scale="xxl" color="black" mb="24px">
          {t('Farms')}
        </TitleSectionGlobal>
        <SubTitleSectionGlobal scale="lg" color="black">
          {t('Stake Liquidity Pool (LP) tokens to earn.')}
        </SubTitleSectionGlobal>
      </PageHeaderFarming>
      <Content />
      <ControlContainer>
        <ViewControls>
          <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => null} />
          {/* <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} /> */}
          <ToggleWrapper>
            <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="sm" />
            <Text color="black"> {t('Staked only')}</Text>
          </ToggleWrapper>
          <FarmTabButtons hasStakeInFinishedFarms={stakedInactiveFarms.length > 0} />
        </ViewControls>
        <FilterContainer>
          <LabelWrapper>
            <Text textTransform="uppercase" color="black">{t('Sort by')}</Text>
            <Select
              options={[
                {
                  label: t('Hot'),
                  value: 'hot',
                },
                {
                  label: t('APY'),
                  value: 'apy',
                },
                {
                  label: t('APR'),
                  value: 'apr',
                },
                {
                  label: t('Multiplier'),
                  value: 'multiplier',
                },
                {
                  label: t('Earned'),
                  value: 'earned',
                },
                {
                  label: t('Liquidity'),
                  value: 'liquidity',
                },
              ]}
              onChange={handleSortOptionChange}
            />
          </LabelWrapper>
          <LabelWrapper style={{ marginLeft: 16 }}>
            <Text textTransform="uppercase" color="black">{t('Search')}</Text>
            <SearchInput onChange={handleChangeQuery} placeholder="Search Farms" />
          </LabelWrapper>
        </FilterContainer>
      </ControlContainer>
      {renderContent()}
      <div ref={loadMoreRef} />
    </PageFarming>
  )
}

export default Farms
