import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AppThunk, VaultsState } from '../types'
import {
  fetchPoolsAllowance,
  fetchUserBalances,
  fetchUserPendingRewards,
  fetchUserStakeBalances,
} from '../pools/fetchPoolsUser'
import poolsConfig from '../../config/constants/pools'
import { setPoolsUserData } from '../pools'

const initialState: VaultsState = {
  globalVaultLocked: undefined,
  globalVaultVested: undefined,
  globalVaultStaked: undefined,
  userDataLoaded: false,
}

// Thunks

export const fetchGlobalVaultsAsync =
  (account: string): AppThunk =>
  async (dispatch) => {
    // TODO
    const allowances = await fetchPoolsAllowance(account)
    const stakingTokenBalances = await fetchUserBalances(account)
    const stakedBalances = await fetchUserStakeBalances(account)
    const pendingRewards = await fetchUserPendingRewards(account)

    const userData = poolsConfig.map((pool) => ({
      sousId: pool.sousId,
      allowance: allowances[pool.sousId],
      stakingTokenBalance: stakingTokenBalances[pool.sousId],
      stakedBalance: stakedBalances[pool.sousId],
      pendingReward: pendingRewards[pool.sousId],
    }))

    dispatch(setPoolsUserData(userData))
  }

export const vaultsSlice = createSlice({
  name: 'vaults',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* builder.addCase(fetchWalletNfts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchWalletNfts.fulfilled, (state, action) => {
      state.isLoading = false
      state.isInitialized = true
      state.data = action.payload.reduce((accum, association) => {
        if (!association) {
          return accum
        }

        const [tokenId, identifier] = association as NftSourceItem

        return {
          ...accum,
          [identifier]: accum[identifier] ? [...accum[identifier], tokenId] : [tokenId],
        }
      }, {})
    }) */
  },
})

export default vaultsSlice.reducer
