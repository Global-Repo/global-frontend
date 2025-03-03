import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Heading, Flex, Text } from '@duhd4h/global-uikit'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { useTranslation } from 'contexts/Localization'
import usePersistState from 'hooks/usePersistState'
import { usePools, useFetchCakeVault, useFetchPublicPoolsData, usePollFarmsData, useCakeVault } from 'state/hooks'
import { latinise } from 'utils/latinise'
import Page from 'components/layout/Page'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import { Pool } from 'state/types'
import PoolCard from './components/PoolCard'
import CakeVaultCard from './components/CakeVaultCard'
import PoolTabButtons from './components/PoolTabButtons'
import BountyCard from './components/BountyCard'
import HelpButton from './components/HelpButton'
import PoolsTable from './components/PoolsTable/PoolsTable'
import { ViewMode } from './components/ToggleView/ToggleView'
import { getAprData, getCakeVaultEarnings } from './helpers'

const CardLayout = styled.div`
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

const PoolControls = styled(Flex)`
  flex-direction: column;
  margin-bottom: 24px;
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  };

  @media screen and (max-width: 992px) {
    flex-direction: column;
  }
  
  padding-top: 24px;
`

const SearchSortContainer = styled(Flex)`
  gap: 10px;
  justify-content: flex-end;
  
  @media screen and (max-width: 992px) {
    justify-content: space-between;
  };

  @media screen and (max-width: 420px) {
    flex-direction: column;
    align-items: center;
    div {
      width: 100%;
    }
  };
`

const TextWrapper = styled(Text)`
  @media screen and (max-width: 580px) {
    display: none;
  };
`

const ControlStretch = styled(Flex)`
  > div {
    flex: 1;
  }
`

const Content = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  //background: linear-gradient(45deg, #1748a0, #0b2761, #1c102b);
  z-index: -1;
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

const NUMBER_OF_POOLS_VISIBLE = 12

interface Props {
  isGlobal?: boolean
}

const Pools: React.FC<Props> = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { pools: poolsWithoutAutoVault, userDataLoaded } = usePools(account)
  const [stakedOnly, setStakedOnly] = usePersistState(false, { localStorageKey: 'pancake_pool_staked' })
  const [numberOfPoolsVisible, setNumberOfPoolsVisible] = useState(NUMBER_OF_POOLS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, { localStorageKey: 'pancake_farm_view' })
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('hot')
  const {
    userData: { cakeAtLastUserAction, userShares },
    fees: { performanceFee },
    pricePerFullShare,
    totalCakeInVault,
  } = useCakeVault()
  const accountHasVaultShares = userShares && userShares.gt(0)
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  const pools = useMemo(() => {
    const cakePool = poolsWithoutAutoVault.find((pool) => pool.sousId === 0)
    const cakeAutoVault = { ...cakePool, isAutoVault: true }
    return [cakeAutoVault, ...poolsWithoutAutoVault]
  }, [poolsWithoutAutoVault])

  // TODO aren't arrays in dep array checked just by reference, i.e. it will rerender every time reference changes?
  const [finishedPools, openPools] = useMemo(() => partition(pools, (pool) => pool.isFinished), [pools])
  const stakedOnlyFinishedPools = useMemo(
    () =>
      finishedPools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [finishedPools, accountHasVaultShares],
  )
  const stakedOnlyOpenPools = useMemo(
    () =>
      openPools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [openPools, accountHasVaultShares],
  )
  const hasStakeInFinishedPools = stakedOnlyFinishedPools.length > 0

  usePollFarmsData()
  useFetchCakeVault()
  useFetchPublicPoolsData()

  useEffect(() => {
    const showMorePools = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfPoolsVisible((poolsCurrentlyVisible) => poolsCurrentlyVisible + NUMBER_OF_POOLS_VISIBLE)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMorePools, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [observerIsSet])

  const showFinishedPools = location.pathname.includes('history')

  const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  const sortPools = (poolsToSort: Pool[]) => {
    switch (sortOption) {
      case 'apr':
        // Ternary is needed to prevent pools without APR (like MIX) getting top spot
        return orderBy(
          poolsToSort,
          (pool: Pool) => (pool.apr ? getAprData(pool, performanceFeeAsDecimal).apr : 0),
          'desc',
        )
      case 'earned':
        return orderBy(
          poolsToSort,
          (pool: Pool) => {
            if (!pool.userData || !pool.earningTokenPrice) {
              return 0
            }
            return pool.isAutoVault
              ? getCakeVaultEarnings(
                  account,
                  cakeAtLastUserAction,
                  userShares,
                  pricePerFullShare,
                  pool.earningTokenPrice,
                ).autoUsdToDisplay
              : pool.userData.pendingReward.times(pool.earningTokenPrice).toNumber()
          },
          'desc',
        )
      case 'totalStaked':
        return orderBy(
          poolsToSort,
          (pool: Pool) => (pool.isAutoVault ? totalCakeInVault.toNumber() : pool.totalStaked.toNumber()),
          'desc',
        )
      default:
        return poolsToSort
    }
  }

  const poolsToShow = () => {
    let chosenPools = []
    if (showFinishedPools) {
      chosenPools = stakedOnly ? stakedOnlyFinishedPools : finishedPools
    } else {
      chosenPools = stakedOnly ? stakedOnlyOpenPools : openPools
    }

    if (searchQuery) {
      const lowercaseQuery = latinise(searchQuery.toLowerCase())
      chosenPools = chosenPools.filter((pool) =>
        latinise(pool.earningToken.symbol.toLowerCase()).includes(lowercaseQuery),
      )
    }

    return sortPools(chosenPools).slice(0, numberOfPoolsVisible)
  }

  const cardLayout = (
    <CardLayout>
      {poolsToShow().map((pool) =>
        pool.isAutoVault ? (
          <CakeVaultCard key="auto-cake" pool={pool} showStakedOnly={stakedOnly} />
        ) : (
          <PoolCard key={pool.sousId} pool={pool} account={account} />
        ),
      )}
    </CardLayout>
  )

  const tableLayout = <PoolsTable pools={poolsToShow()} account={account} userDataLoaded={userDataLoaded} />

  return (
    <Page>
      {/* <PageHeader background="transparent">
      <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
        <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
          <Heading as="h1" scale="xxl" color="white" mb="24px">
            {t('Pools')}
          </Heading>
          <Heading scale="md" color="text">
            {t('Just stake some tokens to earn.')}
          </Heading>
          <Heading scale="md" color="text">
            {t('High APR, low risk.')}
          </Heading>
        </Flex>
        <Flex flex="1" height="fit-content" justifyContent="center" alignItems="center" mt={['24px', null, '0']}>
          <HelpButton />
        </Flex>
      </Flex>
    </PageHeader> */}
      <PageHeaderFarming background="transparent">
        <TitleSectionGlobal as="h1" scale="xxl" color="black" mb="24px">
          {t('Pools')}
        </TitleSectionGlobal>
        <SubTitleSectionGlobal scale="lg" color="black">
          {t('Just stake some tokens to earn. High APR, low risk.')}
        </SubTitleSectionGlobal>
      </PageHeaderFarming>
      <Content />
      <PoolControls justifyContent="space-between" marginX="24px">
        <PoolTabButtons
          stakedOnly={stakedOnly}
          setStakedOnly={setStakedOnly}
          hasStakeInFinishedPools={hasStakeInFinishedPools}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        <SearchSortContainer>
          <Flex flexDirection="row" alignItems="center" width="50%">
            <TextWrapper fontSize="12px" marginRight="10px" bold color="#69626E" textTransform="uppercase">
              {t('Sort by')}
            </TextWrapper>
            <ControlStretch>
              <Select
                options={[
                  {
                    label: t('Hot'),
                    value: 'hot',
                  },
                  {
                    label: t('APR'),
                    value: 'apr',
                  },
                  {
                    label: t('Earned'),
                    value: 'earned',
                  },
                  {
                    label: t('Total staked'),
                    value: 'totalStaked',
                  },
                ]}
                onChange={handleSortOptionChange}
              />
            </ControlStretch>
          </Flex>
          <Flex flexDirection="row" width="50%" >
            {/* <Text fontSize="12px" bold color="#69626E" textTransform="uppercase">
            { {t('Search')}
            </Text> */}
            <ControlStretch>
              <SearchInput onChange={handleChangeSearchQuery} placeholder="Search Pools" />
            </ControlStretch>
          </Flex>
        </SearchSortContainer>
      </PoolControls>
      {showFinishedPools && (
        <Text fontSize="20px" color="failure" pb="32px">
          {t('These pools are no longer distributing rewards. Please unstake your tokens.')}
        </Text>
      )}
      <PoolsTable pools={poolsToShow()} account={account} userDataLoaded={userDataLoaded} />
      <div ref={loadMoreRef} />
    </Page>
  )
}

export default Pools
