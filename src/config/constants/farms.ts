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
    pid: parseInt(process.env.REACT_APP_BUSD_BNB_PID, 10), // 252
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0x478fc90fa07b017de8d18d7061d178daf0e31469',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
  {
    pid: parseInt(process.env.REACT_APP_CAKE_BNB_PID, 10), // 251
    lpSymbol: 'GLB-BNB LP',
    lpAddresses: {
      97: '0x2367320ac44b323e21f749d84fdaddd359947798',
      56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
    },
    token: tokens.global,
    quoteToken: tokens.wbnb,
  },
]

export default farms
