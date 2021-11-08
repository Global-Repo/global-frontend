import React from 'react'
import {
  TokenPairImage as UIKitTokenPairImage,
  TokenPairImageProps as UIKitTokenPairImageProps,
} from '@duhd4h/global-uikit'
import tokens from 'config/constants/tokens'
import { Token } from 'config/constants/types'
import { getAddress } from 'utils/addressHelpers'

interface DualTokenImageProps extends Omit<UIKitTokenPairImageProps, 'primarySrc' | 'secondarySrc'> {
  primaryToken: string
  secondaryToken: string
}

const getImageUrlFromToken = (token: string) => {
  const address = token
  return `/images/tokens/${token}.svg`
}

const DualTokenImage: React.FC<DualTokenImageProps> = ({ primaryToken, secondaryToken, ...props }) => {
  return (
    <div>
      <img style={{width:"40%", height:"50px", zIndex:2}} src={getImageUrlFromToken(primaryToken)} alt="Logo" />
      <img style={{width:"40%", height:"50px", marginLeft:'-20%', zIndex:1, display:'inline-block'}} src={getImageUrlFromToken(secondaryToken)} alt="Logo" />
    </div>
  )
}

export default DualTokenImage
