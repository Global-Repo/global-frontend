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
  .qjpMz{
    max-width:1410px;
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
  .hftXGS{
    background: #F8F6FB;
  }
  nav {
    background-color: #F8F6FB;
  }
  .kipmKU{
    color: #28A8EA;
    fill: #28A8EA;
  }

}
`

export default GlobalStyle
