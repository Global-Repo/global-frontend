import tokens from './tokens'
import { FarmConfig } from './types'

const priceHelperLps: FarmConfig[] = [
  /**
   * These LPs are just used to help with price calculation for MasterChef LPs (farms.ts).
   * This list is added to the MasterChefLps and passed to fetchFarm. The calls to get contract information about the token/quoteToken in the LP are still made.
   * The absense of a PID means the masterchef contract calls are skipped for this farm.
   * Prices are then fetched for all farms (masterchef + priceHelperLps).
   * Before storing to redux, farms without a PID are filtered out.
   */
  {
    pid: null,
    lpSymbol: 'QSD-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x7b3ae32eE8C532016f3E31C8941D937c59e055B9',
    },
    token: tokens.qsd,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0x478Fc90Fa07B017de8D18d7061d178dAf0e31469',
      56: '',
    },
    token: tokens.global,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'GLB-BNB LP',
    lpAddresses: {
      97: '0x2367320ac44b323e21f749d84fdaddd359947798',
      56: '',
    },
    token: tokens.global,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 3,
    lpSymbol: 'GLB-BUSD LP',
    lpAddresses: {
      97: '0x2367320ac44b323e21f749d84fdaddd359947798',
      56: '',
    },
    token: tokens.global,
    quoteToken: tokens.busd,
  },
]

export default priceHelperLps
