import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { BorderGradientButton, BaseLayout, Flex, Image, LogoIcon, SocialLinks, Text, useMatchBreakpoints } from '@duhd4h/global-uikit'
import { NavLink, useHistory } from 'react-router-dom'
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
  ${({ theme }) => theme.mediaQueries.xs} {
    padding: 15px;
    margin-top: 20px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    box-shadow: 0px 4px 20px rgb(179 165 209 / 31%);
    backdrop-filter: blur(56px);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 16px;
  }

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
  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    align-items: start;
    justify-content: space-around;
    margin-top: 100px;
  }
`

const Test2 = styled.div`
  ${({ theme }) => theme.mediaQueries.xs} {
    & > div {
      margin-top:20px;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 70%;
    height: 630px;
    :nth-child(1){
      align-items: start;
      width: 380px;
    }
    :nth-child(2){
      align-items: start;
      width: 380px;
    }
    & > div {
      margin-top:0px;
    }
  }
`

const Test3 = styled.div`
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 30%;
  }
`

const CardsRowOf1 = styled.div`
  margin-bottom: 80px;
`

const styleBlack = { color: 'black' }


const CustomCountdownImages = styled.div`

  position:relative;

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-top:40px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 50px;
    margin-top:70px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 50px;
    margin-top:20px;
  }

`

const CustomCountdown = styled.div`
    padding: 40px;
    background: #FFFFFF;
    border: 2px solid white;
    box-shadow: 0px 4px 95px rgba(179, 165, 209, 0.31);
    border-radius: 16px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: space-around;
    height: 270px;
    h1 {
      margin: 0.4 em 0;
      font-size: 28px;
      line-height: 1.3em;
      font-weight: 700;
      color: #000000;
      font-family: comfortaa, Arial, helvetica neue, Helvetica, sans-serif;
      letter-spacing: -.02em;
  }
  span {

  }
  div {
    display: flex;
    justify-content: space-between;
    color: #FF0000;
  }
  & > div > p > b > span {
    color:black;
  }
`

const ButtonCustomGlobal = styled.div`
  & > div > span {
      -webkit-text-fill-color: #FF0000;
      -webkit-background-clip: text;
      color: #FF0000;
      padding:0px;
      font-size:14px;
  }
  & > div  {
      // restyle button width force
      width: 141px !important;
  }
`

const HomeHeaderImages = styled.div`
  & > img  {
      position: absolute;
      display:none;
  }
`



const Home: React.FC = () => {
  const { t } = useTranslation()
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl
  const history = useHistory()

  const header = (
    <HomeHeaderImages>

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

            <ButtonCustomGlobal>
              <BorderGradientButton
                label="Trade now"
                onClick={() => history.push('/farms')}
                style={{ padding: '8px', marginTop: '32px', width: '100%' , height: '40px', background: '#FFECEC', color: '#FF0000', fontSize: '14px', borderRadius: 10, border: '1px solid #FFDBDB'}}
                colorRight="#FFECEC"
                colorLeft="#FFECEC"
              />
            </ButtonCustomGlobal>

          </Flex>
          <Flex flexGrow={1} justifyContent="center">
            <Image src="/images/home/tothemoon.png" width={480} height={450} />
          </Flex>
        </Flex>
      </HomeHeader>
      <img src="/images/home/logo1.png" alt="global Cube" id="cube_homeHeader" width="292" height="225"/>
    </HomeHeaderImages>
  )

  return (
    <Page isHome>
      {header}
      <TotalValueLockedCard />

      <CustomCountdownImages>
        <img src="/images/home/dots_left.png" alt="global Cube" id="points_in_progress" width="292" height="225"/>
        <img src="/images/home/dots_right.png" alt="global Cube" id="points_in_progress_2" width="292" height="225"/>
        <CustomCountdown>
          <h1>{t('Whitelist Presale')}</h1>
          <ProgressBar/>
          <div>
            <p> <b> <span color="black">No</span> {t('Softcap')} </b> </p>
            <p> <b> Hardcap 7345 <span color="black"> BNB </span> </b> </p>
          </div>
        </CustomCountdown>
      </CustomCountdownImages>

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
