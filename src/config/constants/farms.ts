import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'CAKE',
    lpAddresses: {
      // Aqui no va un LP address sino el cake token address que es el que tiene pid 0 en el masterchef
      97: process.env.REACT_APP_CAKE_ADDRESS,
      56: process.env.REACT_APP_CAKE_ADDRESS,
    },
    token: tokens.syrup,
    quoteToken: tokens.wbnb,
  },
  {
    pid: parseInt(process.env.REACT_APP_CAKE_BNB_PID, 10), // 251
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '0x8cC765891EB2b7B5222A4F2024DfeC62d6F332a9',
      56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
    },
    token: tokens.cake,
    quoteToken: tokens.wbnb,
  },
  {
    pid: parseInt(process.env.REACT_APP_BUSD_BNB_PID, 10), // 252
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0xB678E05397714BCF78ff7516E7bb85bb9aC2d322',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 4,
    lpSymbol: 'MANOR-MAN LP',
    lpAddresses: {
      97: '0x000D31c9BdF3f2DE9da59869A67DD945a1b18367',
      56: '',
    },
    token: tokens.manor,
    quoteToken: tokens.manolos,
  },
]

export default farms
