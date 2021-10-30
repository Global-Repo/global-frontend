import React from 'react'
import { Card } from '@duhd4h/global-uikit'
import styled from 'styled-components'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from '../../../hooks/useTokenBalance'
import { useTotalSupplyPresale } from '../../../hooks/useGetPresaleAmount'
import { useTranslation } from '../../../contexts/Localization'
import { getCakeAddress,getGlobalPresaleAddress } from '../../../utils/addressHelpers'


const ProgressBarWrapper = styled(Card)`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  background: #FFFFFF;
  border-radius: 16px;
  box-shadow: none;
  & > progress::-webkit-progress-value {
    background: linear-gradient(87.9deg, #FF0000 4.02%, #FFEDED 100%);
    border-radius:16px;
  }
  & > progress::-moz-progress-value {
    background: linear-gradient(87.9deg, #FF0000 4.02%, #FFEDED 100%);
    border-radius:16px;
  }
  & > progress::-webkit-progress-bar {
    background: white;
    border:0px;
  }
  & > progress::-moz-progress-bar {
    background: white;
    border:0px;
  }

`
const ProgressBarWrapperUp = styled.div`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #F0ECF4;
  box-sizing: border-box;
  box-shadow: 0px 2px 15px rgba(179, 165, 209, 0.33);
  border-radius: 16px;
  padding:5px;
  position:relative;
`

// anotcationes .--- ya van vendidos x bnb se partira de esa cantidad tendre que llamar para ver 


const ProgressBar = () => {
const { t } = useTranslation()

const initPresaleQty = 1555; // bnb qty init in presale 
const bnbaccQty = useTotalSupplyPresale()
const totalPresaleQty = initPresaleQty+getBalanceNumber(bnbaccQty)
console.log("Qty seller in publis sale" , totalPresaleQty);


  return (
    <ProgressBarWrapperUp>
      <ProgressBarWrapper>
          <StyledProgressBar value={totalPresaleQty} max="7345"/>
      </ProgressBarWrapper>
    </ProgressBarWrapperUp>
  )
}

export default ProgressBar


const StyledProgressBar = styled.progress`
    background: transparent !important;
    width: 100%;
    height: 34px;
    -webkit-appearance: none;
    appearance: none;
`
