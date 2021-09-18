import React from 'react'
import { BorderGradientButton, Button, useWalletModal } from '@duhd4h/global-uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const UnlockButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <BorderGradientButton
      onClick={onPresentConnectModal}
      {...props}
      label={t('Unlock Wallet')}
      style={{ padding: '8px' }}
    />
  )
}

export default UnlockButton
