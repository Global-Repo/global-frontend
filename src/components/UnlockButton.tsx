import React from 'react'
import { BorderGradientButton, Button, useWalletModal } from '@duhd4h/global-uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const UnlockButton = ({ isPool = false, ...props }) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  if (isPool) {
    return (
      <Button
        onClick={onPresentConnectModal}
        {...props}
        style={{ padding: '8px', width: '100%' }}
        variant="full_gradient_pool"
      >
        {t('Unlock Wallet')}
      </Button>
    )
  }

  return (
    <BorderGradientButton
      onClick={onPresentConnectModal}
      {...props}
      label={t('Unlock Wallet')}
      style={{ padding: '8px', width: '100%' }}
    />
  )
}

export default UnlockButton
