// @ts-nocheck
import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import {
  ButtonMenu,
  ButtonMenuItem,
  Toggle,
  Text,
  Flex,
  NotificationDot,
  useMatchBreakpoints,
} from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import ToggleView, { ViewMode } from './ToggleView/ToggleView'


const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 20px 0 10px;
  
  ${Text} {
    margin-left: 8px;
  }

  & > div:first-child {
    background-color: #FFDBDB;
    box-shadow: none;
  }

  & > div:first-child > div{
    background-color: #FF0000;
  }

  @media screen and (max-width: 580px) {
    margin: 24px 0 0 0;
  }
`

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

const VaultTabButtons = ({ stakedOnly, setStakedOnly, hasStakeInFinishedPools, viewMode, setViewMode }) => {
  const { url, isExact } = useRouteMatch()
  const { isXs, isSm } = useMatchBreakpoints()
  const { t } = useTranslation()

  const viewModeToggle = <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => null} />
  // const viewModeToggle = <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />

  const liveOrFinishedSwitch = (
    <ButtonMenuGlobal activeIndex={isExact ? 0 : 1} scale="sm" color='red'>
      <ButtonMenuItem as={Link} to={`${url}`} className={isExact ? 'active' : null}>
        {t('Live')}
      </ButtonMenuItem>
      <NotificationDot show={hasStakeInFinishedPools}>
        <ButtonMenuItem as={Link} to={`${url}/history`} className={!isExact ? 'active' : null}>
          {t('Finished')}
        </ButtonMenuItem>
      </NotificationDot>
    </ButtonMenuGlobal>
  )

  // const liveOrFinishedSwitch = (
  //   <ButtonMenu activeIndex={isExact ? 0 : 1} scale="sm" variant="full_gradient_orange_yellow">
  //     <ButtonMenuItem as={Link} to={`${url}`}>
  //       {t('Live')}
  //     </ButtonMenuItem>
  //     <NotificationDot show={hasStakeInFinishedPools}>
  //       <ButtonMenuItem as={Link} to={`${url}/history`}>
  //         {t('Finished')}
  //       </ButtonMenuItem>
  //     </NotificationDot>
  //   </ButtonMenu>
  // )

  // const stakedOnlySwitch = (
  //   <Flex mt={['4px', null, 0, null]} ml={[0, null, '24px', null]} justifyContent="center" alignItems="center">
  //     <Toggle scale="sm" checked={stakedOnly} onChange={() => setStakedOnly((prev) => !prev)} />
  //     <Text ml={['4px', '4px', '8px']}>{t('Staked only')}</Text>
  //   </Flex>
  // )

  const stakedOnlySwitch = (
    <ToggleWrapper>
      <Toggle scale="sm" checked={stakedOnly} onChange={() => setStakedOnly((prev) => !prev)} />
      <Text ml={['4px', '4px', '8px']} color="black" fontWeight="600">{t('Staked only')}</Text>
    </ToggleWrapper>
  )

  if (isXs || isSm) {
    return (
      <Flex flexDirection="column" alignItems="flex-start" mb="24px">
        <Flex width="100%" justifyContent="space-between">
          {viewModeToggle}
          {liveOrFinishedSwitch}
        </Flex>
        {stakedOnlySwitch}
      </Flex>
    )
  }

  return (
    <Flex
      alignItems="center"
      justifyContent={['space-around', 'space-around', 'flex-start']}
      mb={['24px', '24px', '24px', '0px']}
    >
      {viewModeToggle}
      {liveOrFinishedSwitch}
      {stakedOnlySwitch}
    </Flex>
  )
}

export default VaultTabButtons
