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

const HomeHeader = styled.div`
  // height: 180px;

  ${({ theme }) => theme.mediaQueries.lg} {
    // height: 280px;
    padding: 40px 0 64px 0;
  }
`

const CardsRowOf2 = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin: auto;
  margin-bottom: 24px;
  grid-gap: 24px;
  width: 100%;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 80%;
    margin-bottom: 80px;
    grid-gap: 32px;

    & > div {
      grid-column: span 6;
    }
  }
`

const CardsRowOf3 = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin: auto;
  margin-bottom: 24px;
  grid-gap: 24px;
  width: 100%;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 80px;
    grid-gap: 32px;

    & > div {
      grid-column: span 4;
    }
  }
`
const Test = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-around;
  margin-top: 100px;
`

const Test2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60%;
  height: 550px;
  :nth-child(1){
    align-items: start;
    width: 330px;
  }
  :nth-child(2){
    align-items: start;
    width: 330px;
  }
`

const Test3 = styled.div`
  width: 40%;
`

const CardsRowOf1 = styled.div`
  margin-bottom: 80px;
`

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
      <TotalValueLockedCard />
      <PartnershipsCard />
      <Test>
        <Test2>
          <EarnAPRCard />
          <EarnAssetCard />
        </Test2>
        <Test2>
          <CakeStats />
          <FarmStakingCard />

        </Test2>
        <Test3>
          <AnnouncementsCard />
        </Test3>
      </Test>
      {/* <CardsRowOf1>
        
      </CardsRowOf1>
      <CardsRowOf1>
        
      </CardsRowOf1>
      <CardsRowOf3>
        
      </CardsRowOf3>
      <CardsRowOf3>
        
      </CardsRowOf3>
      <CardsRowOf1>
        
      </CardsRowOf1> */}
    </Page>
  )
}

export default Home
