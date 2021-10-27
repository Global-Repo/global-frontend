import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router'
import { DEFAULT_META, getCustomMeta } from 'config/constants/meta'
import { usePriceGlobalBusd } from 'state/hooks'
import Container from './Container'

const StyledBackground = styled.div`
  width: 100%;
`

const HomeStyledBackground = styled(StyledBackground)`
  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/home/logo1.png'), url('/images/home/logo2.png'),
       url('/images/home/cube2.png'), url('/images/home/pyramid_2.png'),url('/images/home/header_bg.svg'),url('/images/home/bg_partneships.svg');
    background-repeat: no-repeat;
    background-size:   292px 225px, 164px 272px, 272px 208px, 330px 244px, 100% 50%, 500px 500px;
    background-position:  14% 19%, 87% -1%, 11% 65%, 88% 92%, 0% -25%, 100% 100%;
  }
`

const StyledPage = styled(Container)`
  min-height: calc(100vh - 64px);
  padding-bottom: 16px;
  width: 100%;
  color:black;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-bottom: 32px;
  }
`

const PageMeta = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const globalPriceBusd = usePriceGlobalBusd()
  const globalPriceUsdDisplay = globalPriceBusd.gt(0)
    ? `$${globalPriceBusd.toNumber().toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      })}`
    : ''

  const pageMeta = getCustomMeta(pathname, t) || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }
  const pageTitle = globalPriceUsdDisplay ? [title, globalPriceUsdDisplay].join(' - ') : title

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Helmet>
  )
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isHome?: boolean
}

const Page: React.FC<Props> = ({ children, isHome, ...props }) => {
  if (isHome) {
    return (
      <HomeStyledBackground>
        <PageMeta />
        <StyledPage {...props}>{children}</StyledPage>
      </HomeStyledBackground>
    )
  }
  return (
    <StyledBackground>
      <PageMeta />
      <StyledPage {...props}>{children}</StyledPage>
    </StyledBackground>
  )
}

export default Page
