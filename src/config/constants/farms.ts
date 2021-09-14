import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'GLOBAL',
    lpAddresses: {
      // Aqui no va un LP address sino el cake token address que es el que tiene pid 0 en el masterchef
      97: process.env.REACT_APP_CAKE_ADDRESS,
      56: process.env.REACT_APP_CAKE_ADDRESS,
    },
    token: tokens.syrup,
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
    pid: parseInt(process.env.REACT_APP_CAKE_BNB_PID, 10), // 251
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '0xB1CAE943B80Cd1E77360f0aBaEa1a99ED8440f15',
      56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
    },
    token: tokens.cake,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 3,
    lpSymbol: 'MANOR-BNB LP',
    lpAddresses: {
      97: '0x9141e065ad01a501e076d28c35c618702d93999e',
      56: '',
    },
    token: tokens.manor,
    quoteToken: tokens.wbnb,
  },
]

export default farms
