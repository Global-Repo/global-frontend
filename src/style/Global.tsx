import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@duhd4h/global-uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
* {
    font-family: Poppins, sans-serif;
  }
  body {
    background: linear-gradient(45deg, #FFFFFF, #FFFFFF);
    color: #000000;
    background-color: #FFFFFF;
    img {
      height: auto;
      max-width: 100%;
    }
  }
  #points_in_progress {
    position: absolute;
    left: 0%;
    z-index: -1;
    bottom: 0%;
  }
  #points_in_progress_2 {
    position: absolute;
    right: 0%;
    z-index: -1;
    top: 0%;
  }
  #StyledNavCustom svg{
    fill:#28A8EA;
  }
  #button_menu_ > svg{
    fill:#000000 ;
  }
  #modal_wallet_open > div > div {
      color: #000000;
  }
  #connect_wallet_modal, #modal_wallet_open{
    background: #FFFFFF;
    box-shadow: 0px 4px 40px rgb(179 165 209 / 30%);
    border-radius: 32px;
    border: 0px;
  }
  #connect_wallet_modal > div, #modal_wallet_open > div{
      background-image:none !important;
      border-bottom:0px;
  }
  #connect_wallet_modal > div > button{
      background: #F0ECF4;
  }
  #connect_wallet_modal > div > a{
      color: #000000;
  }
  #connect_wallet_modal > div > a > svg{
      fill: #000000;
  }
  #connect_wallet_modal > div > button > div{
      color: #000000;
  }
  #connect_wallet_modal h2, #modal_wallet_open h2{
      color: #000000;
  }
  #close_dialog svg{
      fill: #000000;
  }
  #walletButtomCustom > div > div:before
  {
   background: #FF0000;
  }
  #walletButtomCustom > div > div > span
  {
   -webkit-text-fill-color: #FF0000;
   color: #FF0000;
  }
  #root > div > div:nth-of-type(2) h2 {
    color:black;
  }
  #root > div > div:nth-of-type(2) {
    background: #FFFFFF;
    box-shadow: 0px 4px 40px rgb(179 165 209 / 30%);
    border-radius: 32px;
    border: 0px;
    > div {
      background-image: none !important;
      border-bottom: 0px;
    }
  }
  #root > div > div:nth-of-type(2) > div > button {
    background: #F0ECF4;
  }
  #root > div > div:nth-of-type(2) > div > button> div {
   color:black;
  }
  nav > div > div > a {
    cursor: default;
    pointer-events: none;
    text-decoration: none;
    color: grey;
  }
  #root > div > div > div > div > div{
    color:black;
    font-weight:bold;
  }

  // footer global price
  #root > div > div > div > div:last-child > div > *:first-child {
    display: none;
  }

  nav svg {
    fill: #28A8EA !important;
  }
  // button responsive
  nav > div > div > button:after{
    content: none !important;
  }
  // no display price at the moment
  nav > div > div > a > div > div{
    display:none !important;
  }
  nav > div {
    max-width:1410px;
  }
  // no display effect around button
  nav > div > div > div > div > button:after {
    content: none !important;
  }
  nav > div > div > div > div > a {
    color:black;
    font-weight:bold;
  }
  nav > div > div > div > div > a.active {
    color:red;
  }
  // when connect wallet
  nav > div > div > div > div > span {
    -webkit-text-fill-color: #FF0000 !important;
    background: linear-gradient( to right, #FF0000, #FF0000 );
  }
  nav > div > div > div > div {
    brackground: #FF0000 !important;
    -webkit-background-clip: text;
  }
  nav > div > div > div > div {
    border-bottom:0px !important;
  }
  nav > div > div > div > div > button {
    background: #FF0000 !important;
    font-weight: 400 !important;
    border-radius: 10px !important;
    box-shadow: none !important;
  }
  nav > button > svg{
    fill:black!important;
  }
  nav {
    background-color: #F8F6FB !important;
  }
  button.sc-dWBRfb.iWqacH {
    background: #FF0000;
    font-weight: 400;
    border-radius: 10px;
    box-shadow: none;
  }
  // Styles for mobile nav
  ${({ theme }) => theme.mediaQueries.xs} {
    // nav custom background only in mobile format
    #root > div > div > div:first-of-type {
      background:white;
    }
    #root > div > div > div > div:nth-of-type(2) {
      background:white;
      border-top: 0;
    }
    nav > div > div > button{
      background: #FF0000 !important;
      font-weight: 400 !important;
      border-radius: 10px !important;
      box-shadow: none !important;
    }
  }
  
  // twitter icon
  a[aria-label="Twitter"] svg{
    fill: #28A8EA;
  }

  // telegram icon
  a[aria-label="Telegram"] svg{
    fill: #28A8EA;
  }


}
`

export default GlobalStyle
