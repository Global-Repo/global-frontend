// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import { useLocation, Link, useRouteMatch } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, NotificationDot } from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'


const ButtonMenuGlobal = styled(ButtonMenu)` 
  background: #FFDBDB;
  border-radius: 12px;
  border:0px;
  padding:2px;
  a {
    color: #FF0000;
    background: #FFDBDB;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    &.active {
      background-color: #FF0000;
      color: #FFFFFF;
    }
  }
  > a {
    border-radius: 10px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #FF0000;
    background: #FFDBDB;
    &.active {
      background-color: #FF0000;
      color: #FFFFFF;
    }
    
  }
`


interface FarmTabButtonsProps {
  hasStakeInFinishedFarms: boolean
}

const FarmTabButtons: React.FC<FarmTabButtonsProps> = ({ hasStakeInFinishedFarms }) => {
  const { url, isExact } = useRouteMatch()
  const location = useLocation()
  const { t } = useTranslation()

  let activeIndex
  switch (location.pathname) {
    case '/farms':
      activeIndex = 0
      break
    case '/farms/history':
      activeIndex = 1
      break
    case '/farms/archived':
      activeIndex = 2
      break
    default:
      activeIndex = 0
      break
  }

  return (
    <Wrapper>
      <ButtonMenuGlobal activeIndex={isExact ? 0 : 1} scale="sm" color='red'>
        <ButtonMenuItem as={Link} to={`${url}`} className={isExact ? 'active' : null}>
          {t('Live')}
        </ButtonMenuItem>
        <NotificationDot show={hasStakeInFinishedFarms}>
          <ButtonMenuItem as={Link} to={`${url}/history`} className={!isExact ? 'active' : null}>
            {t('Finished')}
          </ButtonMenuItem>
        </NotificationDot>
      </ButtonMenuGlobal>
    </Wrapper>
  )
}

export default FarmTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    padding-left: 12px;
    padding-right: 12px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 16px;
  }
`
