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

const HomeBackground = styled.div`
  background-image: url('/logo.svg');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 30%;
  background-attachment: fixed;
  background-position-y: 40px;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-position-y: 80px;
  }
`

const HomeHeader = styled.div`
  height: 180px;

  ${({ theme }) => theme.mediaQueries.lg} {
    height: 280px;
  }
`

const HomeContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }
`

const SideBar = styled.div`
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 400px;
    margin-left: 48px;
  }
`

const CardWrapper = styled.div``

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

const GlobalPrice = styled.div`
  width: 140px;
  height: 140px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 16px;
  right: 24px;
  top: calc(10vh);
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Home: React.FC = () => {
  const { t } = useTranslation()
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  const header = (
    <HomeHeader>
      <Flex height="100%" justifyContent="center" alignItems="center">
        <Flex flexDirection="column" flexGrow={0} alignItems="center" width="80%">
          <Image src="/textLogo.svg" width={512} height={70} mb="16px" />
          <Text bold fontSize={isMobile ? '18px' : '26px'}>
            {t(
              'One-stop-shop for all your DeFi needs. Take advantage of our cheap DEX, yield optimizer and APR boost rewards.',
            )}
          </Text>
        </Flex>
      </Flex>
    </HomeHeader>
  )

  return (
    <>
      <Page>
        <HomeBackground>
          {header}
          <HomeContent>
            <CardWrapper>
              <Cards>
                <FarmStakingCard />
                <EarnAssetCard />
              </Cards>
              <Cards>
                <EarnAPRCard />
                <EarnAssetCard />
              </Cards>
              <Cards>
                <CakeStats />
                <TotalValueLockedCard />
              </Cards>
            </CardWrapper>
            <SideBar>
              <PartnershipsCard />
              <AnnouncementsCard />
            </SideBar>
          </HomeContent>
        </HomeBackground>
      </Page>
      {!isMobile && (
        <GlobalPrice>
          <LogoIcon width={50} height={50} mb="8px" />
          <Text bold>20.00$</Text>
          <SocialLinks />
        </GlobalPrice>
      )}
    </>
  )
}

export default Home
