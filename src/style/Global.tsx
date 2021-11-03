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
  button.sc-hKFxyN.iOpbS {
    background: #FF0000;
    font-weight: 400;
    border-radius: 10px;
    box-shadow: none;
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
  #BodyWrapperCustomMobile > div 
  {
    background: white;
  }
  #BodyWrapperCustomMobile > div > div 
  {
    background: white;
  }
  #BodyWrapperCustomMobile > div > div > div > divo:first-f-type 
  {
    
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
 

  // Styles for mobile nav
  ${({ theme }) => theme.mediaQueries.xs} {
    // nav custom background only in mobile format
    #root > div > div > div:first-of-type {
      
    }
  }
  // Styles for mobile nav
  ${({ theme }) => theme.mediaQueries.sm} {
    // nav custom bakcground
    #root > div > div > div:first-of-type {

    }
  }


  nav svg {
    fill: #28A8EA;
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

  nav > div > div > div > div > a > div {
    color:black;
    font-weight:bold;
  }
  nav > div > div > div > div > a.active {
    color:red;
  } 
  nav > div > div > div > div > a.active > div  {
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
    border-bottom:0px;
  }

  .bZyZKQ{
    color:#000000;
    font-weight: 600;
  }
  .oRbct{
    border-bottom:1px solid #000000;
  }
  .hJFjHj {
    background: #F8F6FB;
  }
  nav {
    background-color: #F8F6FB !important;
  }
  .kipmKU{
    color: #28A8EA;
    fill: #28A8EA;
  }
  .dtlQIr{
    margin-right: 10px;
  }

  // menu panel
  .sc-eHEENL {
    background: #F8F6FB;
  }
  
  // menu footer
  .sc-ikXwFM {
    border-top: 0;
    background: #F8F6FB;
  }

  // selected menu item
  .sc-csTbgd.oRbct {
    border-bottom: 0;
  }
  
  // selected menu item text
  .sc-csTbgd.oRbct .sc-eGJWMs {
    color: #FF0000;
  }

  // global price
  .sc-oeezt {
    display: none;
  }

  // connect modal
  .fIUknR {
    background: white;
  }

  // connect modal header
  .igAOHm {
    border: 0;
  }

  // connect modal title
  .bdSXPh {
    color: black;
  }

  // connect modal item
  .sc-hKFxyN {
    background-color: #F0ECF4;
    margin-left:10px;
  }

  // connect modal item text
  .ehIlZS {
    color: black;
  }

  // connect modal link
  .bSjYsy {
    color: black;
  }

  // connect modal link svg
  .gcGXPM {
    fill: #A099A5;
  }

  // connect modal close svg
  .dgGBME {
    fill: black;
  }

  .sc-iJCRrE.dqcAwZ{
    fill:red;
    color:red;
  }

  button.sc-dWBRfb.iWqacH {
    background: #FF0000;
    font-weight: 400;
    border-radius: 10px;
    box-shadow: none;
  }


}
`

export default GlobalStyle
