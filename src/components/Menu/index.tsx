import React from 'react'
import { Menu as UikitMenu } from '@duhd4h/global-uikit'
import { useWeb3React } from '@web3-react/core'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import { useProfile, useGetCustomPrice } from 'state/hooks'
import { useLocation } from 'react-router'
import config from './config'

const Menu = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { toggleTheme, isDark } = useTheme()
  const globalPriceUsd = useGetCustomPrice()
  const { profile } = useProfile()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const location = useLocation()

  return (
    <>
      <UikitMenu
        account={account}
        login={login}
        logout={logout}
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentLang={currentLanguage.code}
        langs={languageList}
        setLang={setLanguage}
        links={config(t)}
        globalPriceUsd={globalPriceUsd}
        profile={{
          username: profile?.username,
          image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
          profileLink: '/profile',
          noProfileLink: '/profile',
          showPip: !profile?.username,
        }}
        {...props}
      />
      <style
        // prevent home from highlighting on any route other than /
        // currently it gets an active class on every route, since match is not exact
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            a.active { color: red; }
            a.active[href="/"] { color: ${location.pathname === '/' ? 'red' : 'black'} }
          `,
        }}
      />
    </>
  )
}

export default Menu
