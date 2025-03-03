import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Flex, MetamaskIcon, Text, LinkExternal, Button } from '@duhd4h/global-uikit'
import { BASE_BSC_SCAN_URL, BASE_URL } from 'config'
import { GlobalVaultLocked, GlobalVaultStaked, GlobalVaultVested } from 'state/types'
import { getAddress } from 'utils/addressHelpers'
import { registerToken } from 'utils/wallet'

interface ExpandedFooterProps {
  vault: GlobalVaultLocked | GlobalVaultStaked | GlobalVaultVested
  account: string
}

const ExpandedWrapper = styled(Flex)`
  svg {
    height: 14px;
    width: 14px;
  }
`

// const StyledLinkExternal = styled(LinkExternal)`
//   font-weight: 400;
//   //background: linear-gradient(to right, #d86186, #f39e21);
//   //-webkit-background-clip: text;
//   //-webkit-text-fill-color: transparent;
// `

const GradientText = styled(Text)`
  background: #ff0000;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  //color: black;
  font-size: 14px;
`

const ExpandedFooter: React.FC<ExpandedFooterProps> = ({ vault, account }) => {
  const { t } = useTranslation()
  const { stakingToken, earningToken, contractAddress } = vault

  const tokenAddress = earningToken.length > 0 && earningToken[0].address ? getAddress(earningToken[0].address) : ''
  const poolContractAddress = getAddress(contractAddress)
  const imageSrc = `${BASE_URL}/images/tokens/${tokenAddress}.png`
  const isMetaMaskInScope = !!(window as WindowChain).ethereum?.isMetaMask

  return (
    <ExpandedWrapper flexDirection="column">
      {earningToken[0].symbol !== 'BNB' && (
        <Flex mb="2px" justifyContent="flex-end">
          <LinkExternal
            style={{ color: '#ff0000'}}
            href={`https://pancakeswap.info/token/${getAddress(earningToken[0].address)}`}
            bold={false}
            small
          >
            {t('Info site')}
          </LinkExternal>
        </Flex>
      )}
      <Flex mb="2px" justifyContent="flex-end">
        <LinkExternal  style={{ color: '#ff0000'}} href={earningToken[0].projectLink} bold={false} small>
          {t('View Project Site')}
        </LinkExternal>
      </Flex>
      {poolContractAddress && (
        <Flex mb="2px" justifyContent="flex-end">
          <LinkExternal  style={{ color: '#ff0000'}} href={`${BASE_BSC_SCAN_URL}/address/${poolContractAddress}`} bold={false} small>
            {t('View Contract')}
          </LinkExternal>
        </Flex>
      )}
      {account && isMetaMaskInScope && tokenAddress && (
        <Flex justifyContent="flex-end">
          <Button
            variant="text"
            p="0"
            height="auto"
            onClick={() => registerToken(tokenAddress, earningToken[0].symbol, earningToken[0].decimals, imageSrc)}
          >
            <Text color="black" fontSize="14px">
              <GradientText >{t('Add to Metamask')}</GradientText>
            </Text>
            <MetamaskIcon ml="4px" />
          </Button>
        </Flex>
      )}
    </ExpandedWrapper>
  )
}

export default React.memo(ExpandedFooter)
