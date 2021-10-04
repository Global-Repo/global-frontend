import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'GLB',
    lpAddresses: {
      // Aqui no va un LP address sino el cake token address que es el que tiene pid 0 en el masterchef
      97: process.env.REACT_APP_GLOBAL_ADDRESS,
      56: process.env.REACT_APP_GLOBAL_ADDRESS,
    },
    token: tokens.global,
    // token: tokens.syrup,
    quoteToken: tokens.wbnb,
  },
  {
    pid: parseInt(process.env.REACT_APP_BUSD_BNB_PID, 10), // 252 pool 1 de masterchef
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0x478fc90fa07b017de8d18d7061d178daf0e31469',
      56: '0x76f19d8Eb4B5249f82f0fb1d1ee08225f5b51ef3',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
  {
    pid: parseInt(process.env.REACT_APP_CAKE_BNB_PID, 10), // 251 pool 2 de masterchef
    lpSymbol: 'GLB-BNB LP',
    lpAddresses: {
      97: '0x2367320ac44b323e21f749d84fdaddd359947798',
      56: '0x8aC6Be1105bFCAFa43211461f410f2D13627f9EC',
    },
    token: tokens.global,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 3, // 251 pool 3 de masterchef
    lpSymbol: 'GLB-BUSD LP',
    lpAddresses: {
      97: '0x2367320ac44b323e21f749d84fdaddd359947798',
      56: '0x7865D8632DC69ECd87d68A2e3E71E0aaFF6cF1be',
    },
    token: tokens.global,
    quoteToken: tokens.busd,
  },
]

export default farms
