import React from 'react'
import styled from 'styled-components'
import { BaseLayout } from '@duhd4h/global-uikit'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import CakeStats from 'views/Home/components/CakeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPRCard from 'views/Home/components/EarnAPRCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import PartnershipsCard from './components/PartnershipsCard'
import AnnouncementsCard from './components/AnnouncementsCard'

const Title = styled.div`
  margin: auto;
  width: 256px;
  height: 50px;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 512px;
    height: 100px;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 24px;
  grid-gap: 24px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 32px;
    grid-gap: 32px;

    & > div {
      grid-column: span 6;
    }
  }
`

/* const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 24px;
  grid-gap: 24px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 32px;
    grid-gap: 32px;

    & > div {
      grid-column: span 4;
    }
  }
` */

const Home: React.FC = () => {
  return (
    <Page>
      <Title>
        <img src="/textLogo.png" alt="BeGlobal Finance logo" />
      </Title>
      <div>
        <Cards>
          <FarmStakingCard />
          <PartnershipsCard />
        </Cards>
        <Cards>
          <EarnAPRCard />
          <EarnAssetCard />
        </Cards>
        <Cards>
          <CakeStats />
          <TotalValueLockedCard />
        </Cards>
        <Cards>
          <AnnouncementsCard />
        </Cards>
      </div>
    </Page>
  )
}

export default Home
