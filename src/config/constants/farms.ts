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
    quoteToken: tokens.wbnb,
  },
  {
    pid: parseInt(process.env.REACT_APP_GLOBAL_BNB_PID, 10), // pid 1
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0x85A855E8dfC7D315637c79fA0d9c18e29d50adB4',
      56: '0x85A855E8dfC7D315637c79fA0d9c18e29d50adB4',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
  {
    pid: parseInt(process.env.REACT_APP_CAKE_BNB_PID, 10), // pid 2
    lpSymbol: 'GLB-BNB LP',
    lpAddresses: {
      97: '0x6012706c2890bb09341B6CABd72e52DFf214771B',
      56: '0x6012706c2890bb09341B6CABd72e52DFf214771B',
    },
    token: tokens.global,
    quoteToken: tokens.wbnb,
  },
  {
    pid: parseInt(process.env.REACT_APP_GLOBAL_BUSD_PID, 10), // pid 3
    lpSymbol: 'GLB-BUSD LP',
    lpAddresses: {
      97: '0x888b196c4B860385f2fE72CeaC2DdB5bedd8772B',
      56: '0x888b196c4B860385f2fE72CeaC2DdB5bedd8772B',
    },
    token: tokens.global,
    quoteToken: tokens.busd,
  },
/*
{
pid: 4,
lpSymbol: 'GLB-LOKO',
lpAddresses: {
  97: '',
  56: '0x69e0bd31ed9d9ea1aff8125fbc4df225d33d52ec',
},
token: tokens.global,
quoteToken: tokens.loko,
},
*/
]

export default farms
