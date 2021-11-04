import React from 'react'
import {
  Tag,
  VerifiedIcon,
  CommunityIcon,
  BinanceIcon,
  RefreshIcon,
  AutoRenewIcon,
  TagProps,
} from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'

const StyledTag = styled(Tag)`
  background: #00C696;
  border-radius: 40px;
  color: white;
  border: none;
`

const CoreTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <StyledTag variant="secondary" outline startIcon={<VerifiedIcon width="18px" color="secondary" mr="4px" />} {...props}>
      <span color="white">{t('Core')}</span>
    </StyledTag>
  )
}

const CommunityTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <StyledTag variant="failure" outline startIcon={<CommunityIcon width="18px" color="failure" mr="4px" />} {...props}>
      <span>{t('Community')}</span>
    </StyledTag>
  )
}

const BinanceTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <StyledTag variant="binance" outline startIcon={<BinanceIcon width="18px" color="secondary" mr="4px" />} {...props}>
      <span>{t('Binance')}</span>
    </StyledTag>
  )
}

const DualTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <StyledTag variant="textSubtle" outline {...props}>
      <span>{t('Dual')}</span>
    </StyledTag>
  )
}

const ManualPoolTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <StyledTag variant="secondary" outline startIcon={<RefreshIcon width="18px" color="secondary" mr="4px" />} {...props}>
      <span>{t('Manual')}</span>
    </StyledTag>
  )
}

const CompoundingPoolTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <StyledTag variant="success" outline startIcon={<AutoRenewIcon width="18px" color="success" mr="4px" />} {...props}>
      <span>{t('Auto')}</span>
    </StyledTag>
  )
}

export { CoreTag, CommunityTag, BinanceTag, DualTag, ManualPoolTag, CompoundingPoolTag }
