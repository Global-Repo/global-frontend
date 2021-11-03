import React, {useState, useEffect,useCallback} from 'react'
import { ethers, utils } from "ethers";
import { BorderGradientButton, BaseLayout, Flex, Image, LogoIcon, SocialLinks, Text, useMatchBreakpoints, Input, InputProps, Card } from '@duhd4h/global-uikit'
import styled from 'styled-components'
import { useWeb3React, Web3ReactProvider  } from '@web3-react/core'
import Web3 from 'web3'
import { Web3Provider } from '@ethersproject/providers'
import { useAppDispatch } from 'state'
import UnlockButton from 'components/UnlockButton'
import { getBep20Contract, getGlobalContract, getGlobalPresaleContract } from 'utils/contractHelpers'
import { sendTx } from 'utils/callHelpers'
import { useTotalSupplyPresale } from '../../../hooks/useGetPresaleAmount'
import { useTranslation } from '../../../contexts/Localization'
import { getBalanceNumber } from '../../../utils/formatBalance'


const ButtonCustomGlobalBuy = styled.div`
  & > div > span {
      -webkit-text-fill-color: #FF0000;
      -webkit-background-clip: text;
      color: #FF0000;
      padding:0px;
      font-size:14px;
  }
  & > div:before {
      background: #FFECEC;
      -webkit-mask: none;
      border: 1px solid rgb(255, 219, 219);
      border-radius:10px;
  }
  & > div {
    padding:12px !important;
  }
`
const StyledInput = styled(Input)`
  background-color:#f3e6ff;
  color:black;
  box-shadow: none;
  width: 60px;
  margin: 0 8px;
  padding: 0 8px;
  ${({ theme }) => theme.mediaQueries.xs} {
    width: 80px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }
`

const Actions = styled.div`
  margin-top: 10px;
`

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 10000
  return library
}


// anotcationes .--- ya van vendidos x bnb se partira de esa cantidad tendre que llamar para ver 
const PresaleBuyAmount = () => {
  const dispatch = useAppDispatch()
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const [pendingTx, setPendingTx] = useState(false)
  const [amount, setAmount] = useState('')
  const { t } = useTranslation()
  const { library, account, active, connector} = useWeb3React()


  const Buytokens = async () => {
    console.log("Account" , account, active)
    const contract = getBep20Contract("0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd")
    console.log("Contract", contract)
    sendTx(contract,"0xF474Cf03ccEfF28aBc65C9cbaE594F725c80e12d",account,"999999999999994")
  }

  return (
     <Web3ReactProvider getLibrary={getLibrary}>
       <Actions>

        {account ? (
          <ButtonCustomGlobalBuy>
            <StyledInput
              pattern={`^[0-9]*[.,]?[0-9]{0,${18}}$`}
              inputMode="decimal"
              min="0"
              max="25"
              placeholder="Amount in BNB"
              onChange={event => setAmount(event.target.value)}
            />         
            <BorderGradientButton
              label={
                pendingTx
                  ? t('Buy GLOBAL')
                  : t('Buy GLOBAL', {
                  })
              }
              onClick={async () => {
                await Buytokens()
              }}
              id="harvest-all"
              disabled={pendingTx}
              width="100%"
              style={{ padding: '12px', width: '100%' , height: '40px', background: '#FFECEC', color: '#FF0000', fontSize: '14px', borderRadius: 10}}
              colorRight="#FFECEC"
              colorLeft="#FFECEC"
            />
          </ButtonCustomGlobalBuy>
        ) : (
          <ButtonCustomGlobalBuy>
            <UnlockButton
            label={t('Unlock Wallet for buy')}
            style={{ padding: '12px', marginTop: '32px', width: '100%' , height: '40px', background: '#FFECEC', color: '#FF0000', fontSize: '14px', borderRadius: 10, border: '1px solid #FFDBDB'}}
            width="100%"
            colorRight="#FFECEC"
            colorLeft="#FFECEC" />
          </ButtonCustomGlobalBuy>
        )}
        </Actions>
      </Web3ReactProvider>
  )
}

export default PresaleBuyAmount


const StyledPresaleBuyAmount = styled.progress`
    background: transparent !important;
    width: 100%;
    height: 34px;
    -webkit-appearance: none;
    appearance: none;
`
