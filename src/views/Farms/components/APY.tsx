import React, { FC } from 'react'
import { Flex, Text, Skeleton, HelpIcon, useTooltip } from '@duhd4h/global-uikit'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useTranslation } from '../../../contexts/Localization'
import ApyButton from './FarmCard/ApyButton'
import APR from './APR'

const HelpIconWrapper = styled.div`
  align-self: center;
  margin-left: 4px;
`

interface Props {
  apy?: number
  apr?: number
  globalPrice?: BigNumber
  lpLabel: string
  addLiquidityUrl: string
}

const APY: FC<Props> = ({ apy, apr, globalPrice, lpLabel, addLiquidityUrl }) => {
  const { t } = useTranslation()

  // const { targetRef, tooltip, tooltipVisible } = useTooltip(t('APY considering daily and manual autocompound.'), {
  //   placement: 'bottom',
  // })

  const { targetRef, tooltip, tooltipVisible } = useTooltip(apr ? <APR apr={apr} /> : "No APR found", {
    placement: 'bottom',
  })

  const farmAPY = apy && apy.toLocaleString('en-US', { maximumFractionDigits: 2 })

  return (
    <Flex justifyContent="space-between" alignItems="center">
      {tooltipVisible && tooltip}
      <Flex>
        <Text>{t('APY')}:</Text>
        <HelpIconWrapper ref={targetRef}>
          <HelpIcon color="textSubtle" />
        </HelpIconWrapper>
      </Flex>
      <Text bold style={{ display: 'flex', alignItems: 'center' }}>
        {apy ? (
          <>
            {/* <ApyButton lpLabel={lpLabel} addLiquidityUrl={addLiquidityUrl} globalPrice={globalPrice} apr={apr} /> */}
            {farmAPY}%
          </>
        ) : (
          <Skeleton height={24} width={80} />
        )}
      </Text>
    </Flex>
  )
}

export default APY
