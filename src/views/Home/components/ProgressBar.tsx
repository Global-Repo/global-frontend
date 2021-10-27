import React from 'react'
import { Card } from '@duhd4h/global-uikit'
import styled from 'styled-components'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from '../../../hooks/useTokenBalance'
import { useTranslation } from '../../../contexts/Localization'
import { getCakeAddress } from '../../../utils/addressHelpers'


const ProgressBarWrapper = styled(Card)`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  background-color: #134894;
  border: 2px solid white;
  border-radius: 24px;
`


const ProgressBar = () => {
const { t } = useTranslation()
const totalSupply = useTotalSupply()
const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()))
//   const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0
const presaleSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

// eslint-disable-next-line no-console
console.log( presaleSupply )

  return (
    <ProgressBarWrapper>
    
      
        <StyledProgressBar value={presaleSupply} max="734500"/> 
      
    </ProgressBarWrapper>
  )
}

export default ProgressBar


const StyledProgressBar = styled.progress`
    background-color: black;
    color: blue;
    width: 100%;
`
