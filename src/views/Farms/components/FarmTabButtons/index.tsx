import React from 'react'
import styled from 'styled-components'
import { useLocation, NavLink, useRouteMatch } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, NotificationDot } from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'

const ButtonMenuGlobal = styled(ButtonMenu)`
  background: #ffdbdb;
  border-radius: 12px;
  border: 0px;
  padding: 2px;
  a {
    color: white;
    font-weight: 500;
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
    color: #ffffff;
  }
`

interface FarmTabButtonsProps {
  hasStakeInFinishedFarms: boolean
}

const FarmTabButtons: React.FC<FarmTabButtonsProps> = ({ hasStakeInFinishedFarms }) => {
  const { url } = useRouteMatch()
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
      <ButtonMenuGlobal activeIndex={activeIndex} scale="sm">
        <ButtonMenuItem as={NavLink} exact to={`${url}`}>
          {t('Live')}
        </ButtonMenuItem>
        <NotificationDot show={hasStakeInFinishedFarms}>
          <ButtonMenuItem as={NavLink} exact to={`${url}/history`}>
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
