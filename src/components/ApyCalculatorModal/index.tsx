import React from 'react'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex, Box } from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'
import { tokenEarnedPerThousandDollarsCompounding, getRoi } from 'utils/compoundApyHelpers'

interface ApyCalculatorModalProps {
  onDismiss?: () => void
  tokenPrice: number
  apr: number
  linkLabel: string
  linkHref: string
  earningTokenSymbol?: string
  roundingDecimals?: number
  compoundFrequency?: number
  performanceFee?: number
  isFarm?: boolean
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 12px;
`

const GridItem = styled.div``

const GridHeaderItem = styled.div`
  max-width: 180px;
`

const BulletList = styled.ul`
  li::marker {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textSubtle};
  }
`

const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = ({
  onDismiss,
  tokenPrice,
  apr,
  linkLabel,
  linkHref,
  earningTokenSymbol = 'CAKE',
  roundingDecimals = 2,
  compoundFrequency = 1,
  performanceFee = 0,
  isFarm = false,
}) => {
  const { t } = useTranslation()
  const oneThousandDollarsWorthOfToken = 1000 / tokenPrice

  const tokenEarnedPerThousand1D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 1,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })
  const tokenEarnedPerThousand7D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 7,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })
  const tokenEarnedPerThousand30D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 30,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })
  const tokenEarnedPerThousand365D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 365,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })

  return (
    <Modal title={t('ROI')} onDismiss={onDismiss}>
      {isFarm && (
        <Flex mb="24px" justifyContent="space-between">
          <Text small color="black">
            {t('APR (incl. LP rewards)')}
          </Text>
          <Text color="#69626E" small>{apr.toFixed(roundingDecimals)}%</Text>
        </Flex>
      )}
      <Grid>
        <GridHeaderItem>
          <Text fontSize="12px" bold color="black" textTransform="uppercase" mb="12px">
            {t('Timeframe')}
          </Text>
        </GridHeaderItem>
        <GridHeaderItem>
          <Text
            textAlign="right"
            fontSize="12px"
            bold
            color="black"
            textTransform="uppercase"
            mr="12px"
            ml="12px"
            mb="12px"
          >
            {t('ROI')}
          </Text>
        </GridHeaderItem>
        <GridHeaderItem>
          <Text textAlign="right" fontSize="12px" bold color="black" textTransform="uppercase" mb="12px">
            {t('%symbol% per $1,000', { symbol: earningTokenSymbol })}
          </Text>
        </GridHeaderItem>
        {/* 1 day row */}
        <GridItem>
          <Text color="#69626E">{t('%num%d', { num: 1 })}</Text>
        </GridItem>
        <GridItem>
          <Text textAlign="right" mr="12px" ml="12px" color="black">
            {getRoi({ amountEarned: tokenEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfToken }).toString().slice(0,8)}
            %
          </Text>
        </GridItem>
        <GridItem>
          <Text textAlign="right" color="black">{tokenEarnedPerThousand1D.toString().slice(0,8)}</Text>
        </GridItem>
        {/* 7 day row */}
        <GridItem>
          <Text color="#69626E">{t('%num%d', { num: 7 })}</Text>
        </GridItem>
        <GridItem>
          <Text textAlign="right" mr="12px" ml="12px" color="black">
            {getRoi({ amountEarned: tokenEarnedPerThousand7D, amountInvested: oneThousandDollarsWorthOfToken }).toString().slice(0,8)}
            %
          </Text>
        </GridItem>
        <GridItem>
          <Text textAlign="right" color="black">{tokenEarnedPerThousand7D.toString().slice(0,8)}</Text>
        </GridItem>
        {/* 30 day row */}
        <GridItem>
          <Text color="#69626E">{t('%num%d', { num: 30 })}</Text>
        </GridItem>
        <GridItem>
          <Text textAlign="right" mr="12px" ml="12px" color="black">
            {getRoi({
              amountEarned: tokenEarnedPerThousand30D,
              amountInvested: oneThousandDollarsWorthOfToken,
            }).toString().slice(0,8)}
            %
          </Text>
        </GridItem>
        <GridItem>
          <Text textAlign="right" color="black">{tokenEarnedPerThousand30D.toString().slice(0,8)}</Text>
        </GridItem>
        {/* 365 day / APY row */}
        <GridItem style={{ maxWidth: '180px' }}>
          <Text color="#69626E">{t('365d (APY)')}</Text>
        </GridItem>
        <GridItem>
          <Text textAlign="right" mr="12px" ml="12px" color="black">

            {getRoi({
              amountEarned: tokenEarnedPerThousand365D,
              amountInvested: oneThousandDollarsWorthOfToken,
            }).toString().slice(0,8)}
            %
          </Text>
        </GridItem>
        <GridItem>
          <Text textAlign="right" color="black">{tokenEarnedPerThousand365D.toString().slice(0,8)}</Text>
        </GridItem>
      </Grid>
      <Flex justifyContent="center">
        <Box mb="28px" maxWidth="280px" p="4px">
          <BulletList>
            <li>
              <Text ml="-8px" fontSize="12px" textAlign="center" color="#69626E" display="inline">
                {t('Calculated based on current rates.')}
              </Text>
            </li>
            <li>
              <Text ml="-8px" fontSize="12px" textAlign="center" color="#69626E" display="inline">
                {t('Compounding %freq%x daily.', { freq: compoundFrequency.toLocaleString() })}
              </Text>
            </li>
            {isFarm && (
              <li>
                <Text ml="-8px" fontSize="12px" textAlign="center" color="#69626E" display="inline">
                  {t('LP rewards: 0.17% trading fees, distributed proportionally among LP token holders.')}
                </Text>
              </li>
            )}
            <li>
              <Text ml="-8px" fontSize="12px" textAlign="center" color="#69626E" display="inline">
                {t(
                  'All figures are estimates provided for your convenience only, and by no means represent guaranteed returns.',
                )}
              </Text>
            </li>
            {performanceFee > 0 && (
              <li>
                <Text mt="14px" ml="-8px" fontSize="12px" textAlign="center" color="#69626E" display="inline">
                  {t('All estimated rates take into account this pool’s %fee%% performance fee', {
                    fee: performanceFee,
                  })}
                </Text>
              </li>
            )}
          </BulletList>
        </Box>
      </Flex>
      <Flex justifyContent="center">
        <LinkExternal style={{ color: 'FF0000'}} href={linkHref}>{linkLabel}</LinkExternal>
      </Flex>
    </Modal>
  )
}

export default ApyCalculatorModal
