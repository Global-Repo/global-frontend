import React from 'react'
import styled from 'styled-components'
import { Text } from '@duhd4h/global-uikit'
import { Nft } from 'config/constants/types'

interface CollectibleCardProps {
  nft: Nft
}

const PreviewImage = styled.img`
  border-radius: 4px;
  margin-bottom: 8px;
`

const CollectibleCard: React.FC<CollectibleCardProps> = ({ nft }) => {
  return (
    <div>
      <PreviewImage src={`/images/nfts/${nft.images.lg}`} />
      <Text bold mb="8px">
        {nft.name}
      </Text>
      <Text as="p" fontSize="12px" color="#69626E">
        {nft.description}
      </Text>
    </div>
  )
}

export default CollectibleCard
