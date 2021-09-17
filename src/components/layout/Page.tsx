import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router'
import { DEFAULT_META, getCustomMeta } from 'config/constants/meta'
import { usePriceCakeBusd } from 'state/hooks'
import Container from './Container'

const StyledBackground = styled.div`
  width: 100%;
`

const HomeStyledBackground = styled(StyledBackground)`
  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/home/logo.png'), url('/images/home/logo1.png'), url('/images/home/logo2.png'),
      url('/images/home/logo3.png'), url('/images/home/logo4.png'), url('/images/home/logo5.png');
    background-repeat: no-repeat;
    background-size: 200px 200px, 200px 200px, 400px 400px, 300px 300px, 350px 350px, 500px 500px;
    background-position: 60% 0, 10% 20%, 96% 30%, 5% 60%, 30% 80%, 95% 100%;
  }
`

const StyledPage = styled(Container)`
  min-height: calc(100vh - 64px);
  padding-bottom: 16px;
  width: 100%;

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
  const cakePriceUsd = usePriceCakeBusd()
  const cakePriceUsdDisplay = cakePriceUsd.gt(0)
    ? `$${cakePriceUsd.toNumber().toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      })}`
    : ''

  const pageMeta = getCustomMeta(pathname, t) || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }
  const pageTitle = cakePriceUsdDisplay ? [title, cakePriceUsdDisplay].join(' - ') : title

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
