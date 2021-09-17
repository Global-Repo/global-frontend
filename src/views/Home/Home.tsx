import React from 'react'
import styled from 'styled-components'
import { BaseLayout, Flex, Image, LogoIcon, SocialLinks, Text, useMatchBreakpoints } from '@duhd4h/global-uikit'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import CakeStats from 'views/Home/components/CakeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPRCard from 'views/Home/components/EarnAPRCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import PartnershipsCard from './components/PartnershipsCard'
import AnnouncementsCard from './components/AnnouncementsCard'
import { useTranslation } from '../../contexts/Localization'

const HomeBackground = styled.div``

const HomeHeader = styled.div`
  // height: 180px;

  ${({ theme }) => theme.mediaQueries.lg} {
    // height: 280px;
    padding: 40px 0 64px 0;
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
  const { t } = useTranslation()
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  const header = (
    <HomeHeader>
      <Flex height="100%" alignItems="center">
        <Flex flexDirection="column" maxWidth="50%">
          <Text bold fontSize={isMobile ? '18px' : '48px'}>
            {t('One-stop-shop for all your DeFi needs')}
          </Text>
          <Text bold mt="32px" fontSize={isMobile ? '18px' : '26px'}>
            {t('Take advantage of our cheap DEX, yield optimizer and APR boost rewards')}
          </Text>
        </Flex>
        <Flex flexGrow={1} justifyContent="flex-end">
          <Image src="/images/home/tothemoon.png" width={368} height={373} />
        </Flex>
      </Flex>
    </HomeHeader>
  )

  return (
    <Page isHome>
      {header}
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
    </Page>
  )
}

export default Home
