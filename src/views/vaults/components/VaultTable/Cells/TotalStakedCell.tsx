import React, { useMemo } from 'react'
import { Flex, Skeleton, Text } from '@duhd4h/global-uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { GlobalVaultLocked, GlobalVaultStaked, GlobalVaultVested } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import BaseCell, { CellContent } from './BaseCell'

interface TotalStakedCellProps {
  vault: GlobalVaultLocked | GlobalVaultStaked | GlobalVaultVested
}

const StyledCell = styled(BaseCell)`
  flex: 2 0 100px;
`

const TotalStakedCell: React.FC<TotalStakedCellProps> = ({ vault }) => {
  const { t } = useTranslation()
  const { stakingToken, totalStaked } = vault

  const totalStakedBalance = useMemo(() => {
    return getBalanceNumber(new BigNumber(totalStaked), stakingToken.decimals)
  }, [totalStaked, stakingToken.decimals])

  return (
    <StyledCell role="cell">
      <CellContent>
        <Text fontSize="12px" color="textSubtle" textAlign="left">
          {t('Total staked')}
        </Text>
        {totalStaked && new BigNumber(totalStaked).gte(0) ? (
          <Flex height="20px" alignItems="center">
            <Balance fontSize="16px" value={totalStakedBalance} decimals={0} unit={` ${stakingToken.symbol}`} />
          </Flex>
        ) : (
          <Skeleton width="80px" height="16px" />
        )}
      </CellContent>
    </StyledCell>
  )
}

export default TotalStakedCell
