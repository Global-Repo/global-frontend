import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { BorderGradientButton, Button, Text, useWalletModal } from '@duhd4h/global-uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'


const WrappedButton = styled(Button)`
  background-color: #FF0000;
`

const UnlockButton = ({ isPool = false, ...props }) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  if (isPool) {
    return (
      <WrappedButton
        onClick={onPresentConnectModal}
        {...props}
        style={{ padding: '8px', width: '100%' }}
        variant="danger"
      >
        {t('Unlock Wallet')}
      </WrappedButton>
    )
  }

  return (
    <BorderGradientButton
      onClick={onPresentConnectModal}
      {...props}
      label={t('Unlock Wallet')}
      style={{ padding: '8px', width: '100%' }}
      colorRight="#F49F23"
      colorLeft="#D41615"
    />
  )
}

export default UnlockButton
