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

  background-image: url('/images/home/e_1.svg'), url('/images/home/e_2.svg'), url('/images/home/e_3.svg'),
    url('/images/home/e_4.svg'), url('/images/home/e_5.svg'), url('/images/home/e_6.svg');
  background-repeat: no-repeat;
  // background-position: top left, top left, top left, top left, top left, top left;
  background-position-x: 500px, -250px, -600px, -600px, 500px, 200px;
  background-position-y: 120%, 100%, 80%, 0%, 40%, -400px;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-position-x: 500px, -250px, -600px, -600px, 500px, 200px;
    background-position-y: 120%, 100%, 80%, 0%, 40%, -400px;
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

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <StyledBackground>
      <PageMeta />
      <StyledPage {...props}>{children}</StyledPage>
    </StyledBackground>
  )
}

export default Page
