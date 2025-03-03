import React from 'react'
import BigNumber from 'bignumber.js'
import { IconButton, useModal, CalculateIcon } from '@duhd4h/global-uikit'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'

export interface ApyButtonProps {
  lpLabel?: string
  globalPrice?: BigNumber
  apr?: number
  addLiquidityUrl?: string
}


const CalculatorWrapper = styled(CalculateIcon)`
  path {
    fill: #69626E !important;
  }

`

const ApyButton: React.FC<ApyButtonProps> = ({ lpLabel, globalPrice, apr, addLiquidityUrl }) => {
  const { t } = useTranslation()
  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal
      linkLabel={t('Get %symbol%', { symbol: lpLabel })}
      tokenPrice={globalPrice.toNumber()}
      apr={apr}
      linkHref={addLiquidityUrl}
      isFarm
    />,
  )

  const handleClickButton = (event): void => {
    event.stopPropagation()
    onPresentApyModal()
  }

  return (
    <IconButton onClick={handleClickButton} variant='text' scale='sm' ml='4px'>
      <CalculatorWrapper width='18px' />
    </IconButton>
  )
}

export default ApyButton
