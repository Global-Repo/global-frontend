import React, { useMemo, useRef } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Heading, Flex } from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'
import usePersistState from 'hooks/usePersistState'
import { useFetchGlobalVaults } from 'state/hooks'
import Page from 'components/layout/Page'
import PageHeader from 'components/PageHeader'
import VaultCard from './components/VaultCard'
import VaultTabButtons from './components/VaultTabButtons'
import HelpButton from './components/HelpButton'
import VaultsTable from './components/VaultTable/VaultsTable'
import { ViewMode } from './components/ToggleView/ToggleView'
import { GlobalVaultLocked, GlobalVaultStaked, GlobalVaultVested, } from '../../state/types'

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

const VaultsControls = styled(Flex)`
  padding-top: 24px;
  flex-direction: column;
  margin-bottom: 24px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

const Content = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #1748a0, #0b2761, #1c102b);
  z-index: -1;
`

interface Props {
  isGlobal?: boolean
}

const Optimizer: React.FC<Props> = ({ isGlobal }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const vaults = useFetchGlobalVaults(account)
  const [stakedOnly, setStakedOnly] = usePersistState(false, { localStorageKey: 'pancake_pool_staked' })
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, { localStorageKey: 'pancake_farm_view' })

  const filteredVaults = useMemo(() => {
    const { globalVaultStakedToBnb, globalVaultStakedToGlobal, globalVaultVested, globalVaultLocked, globalVaultCake, globalVaultCakeMaximizer, } =
      vaults
    const globalVaults = [
      // globalVaultStakedToBnb,
      // globalVaultStakedToGlobal,
      // globalVaultVested,
      // globalVaultLocked,
      // globalVaultCake,
      globalVaultCakeMaximizer,
    ].filter((el) => el != null)

    const tokenVaults = [globalVaultCake].filter((el) => el != null)

    return isGlobal ? globalVaults : tokenVaults
  }, [vaults, isGlobal])

  // const cardLayout = (
  //   <CardLayout>
  //     {filteredVaults.map((vault) => (
  //       <VaultCard key={vault.sousId} vault={vault} account={account} />
  //     ))}
  //   </CardLayout>
  // )

  const tableLayout = <VaultsTable vaults={filteredVaults} account={account} userDataLoaded={vaults.userDataLoaded} />

  return (
    <Page>
      <PageHeader background="transparent">
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
            <Heading as="h1" scale="xxl" color="white" mb="24px">
              {t('Optimizer')}
            </Heading>
            <Heading scale="md" color="text">
              {t('Something, something, TODO')}
            </Heading>
            <Heading scale="md" color="text">
              {t('High APR, low risk.')}
            </Heading>
          </Flex>
          <Flex flex="1" height="fit-content" justifyContent="center" alignItems="center" mt={['24px', null, '0']}>
            {/* <HelpButton /> */}
          </Flex>
        </Flex>
      </PageHeader>
      <Content />
      <VaultsControls justifyContent="space-between" marginX="24px">
        <VaultTabButtons
          stakedOnly={stakedOnly}
          setStakedOnly={setStakedOnly}
          viewMode={viewMode}
          setViewMode={setViewMode}
          hasStakeInFinishedPools={false}
        />
      </VaultsControls>
      <CardLayout>
      {filteredVaults.map((vault) => (
        <VaultCard key={vault.sousId} vault={vault} account={account} />
      ))}
    </CardLayout>
      <div ref={loadMoreRef} />
    </Page>
  )
}

export default Optimizer
