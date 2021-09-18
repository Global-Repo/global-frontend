import { usePriceGlobalBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalCake = getBalanceNumber(totalRewards)
  const globalPriceBusd = usePriceGlobalBusd()

  return totalCake * globalPriceBusd.toNumber()
}

export default useLotteryTotalPrizesUsd
