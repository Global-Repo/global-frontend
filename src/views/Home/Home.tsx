import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { BaseLayout, Flex, Image, LogoIcon, SocialLinks, Text, useMatchBreakpoints } from '@duhd4h/global-uikit'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import GlobalStats from 'views/Home/components/GlobalStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPRCard from 'views/Home/components/EarnAPRCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import ProgressBar from './components/ProgressBar'
import PartnershipsCard from './components/PartnershipsCard'
import AnnouncementsCard from './components/AnnouncementsCard'
import { useTranslation } from '../../contexts/Localization'

const HomeHeader = styled.div`
  // height: 180px;

  ${({ theme }) => theme.mediaQueries.lg} {
    // height: 280px;
    padding: 35px 60px 60px 60px;
    margin-top:20px;
    margin-top: 20px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    box-shadow: 0px 4px 20px rgb(179 165 209 / 31%);
    backdrop-filter: blur(56px);
    /* Note: backdrop-filter has minimal browser support */

    border-radius: 16px;
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

const styleBlack = { color: 'black' }

const CustomCountdown = styled.div`
    padding: 80px;
    border-radius: 20px;
    background-color: #141519;
    -webkit-box-shadow: 0 80px 110px 0 rgb(0 0 0 / 30%);
    box-shadow: 0 80px 110px 0 rgb(0 0 0 / 30%);
    background-repeat: no-repeat;
    background-position: 50% 50%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: space-around;
    height: 300px;
    h1 {   
      margin: 0.4 em 0;
      font-size: 26px;
      line-height: 1.3em;
      font-weight: 700;
      color: #fff;
      font-family: comfortaa, Arial, helvetica neue, Helvetica, sans-serif;
      letter-spacing: -.02em;
  }
  span {

  }
  div {
    display: flex;
    justify-content: space-between;
    color: #c3c9d4;
  }
`



const Home: React.FC = () => {
  const { t } = useTranslation()
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  const header = (
    <HomeHeader>
      <Flex height="100%" alignItems="center">
        <Flex flexDirection="column" maxWidth="50%">
          <Text style={styleBlack} bold fontSize={isMobile ? '18px' : '60px'}>
            {t('One-stop-shop for all your DeFi needs')}
          </Text>
          <Text style={styleBlack} mt="32px" fontSize={isMobile ? '18px' : '28px'}>
            {t('Take advantage of our cheap ')}
            <b>{t('DEX, yield optimizer ')}</b>
            {t('and ')}
            <b>{t('APR boost rewards')}</b>
          </Text>
        </Flex>
        <Flex flexGrow={1} justifyContent="center">
          <Image src="/images/home/tothemoon.png" width={480} height={450} />
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
          <GlobalStats />
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
