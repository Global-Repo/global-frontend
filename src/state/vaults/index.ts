import { createSlice } from '@reduxjs/toolkit'
import { AppThunk, GlobalVault, VaultsState } from '../types'
import vaultsConfig from '../../config/constants/vaults'
import {
  fetchGlobalVaultStakedToBnbPublicData,
  fetchGlobalVaultStakedToBnbUserData,
  fetchGlobalVaultStakedToGlobalPublicData,
} from './fetchVaults'

const initialState: VaultsState = {
  globalVaultLocked: undefined,
  globalVaultVested: undefined,
  globalVaultStakedToBnb: undefined,
  globalVaultStakedToGlobal: undefined,
  userDataLoaded: false,
}

// Thunks

export const fetchGlobalVaultsPublicData = (): AppThunk => async (dispatch) => {
  const globalVaultStakedToBnbPublicData = await fetchGlobalVaultStakedToBnbPublicData(vaultsConfig[0])
  const globalVaultStakedToGlobalPublicData = await fetchGlobalVaultStakedToGlobalPublicData(vaultsConfig[1])

  const globalVaultStakedToBnb: GlobalVault = {
    ...vaultsConfig[0],
    ...globalVaultStakedToBnbPublicData,
  }

  const globalVaultStakedToGlobal: GlobalVault = {
    ...vaultsConfig[1],
    ...globalVaultStakedToGlobalPublicData,
  }

  dispatch(setGlobalVaultStakedToBnbPublicData(globalVaultStakedToBnb))
  dispatch(setGlobalVaultStakedToGlobalPublicData(globalVaultStakedToGlobal))
}

export const fetchGlobalVaultsUserData =
  (account: string): AppThunk =>
  async (dispatch) => {
    const globalVaultStakedToBnbUserData = await fetchGlobalVaultStakedToBnbUserData(account, vaultsConfig[0])

    dispatch(setGlobalVaultStakedToBnbUserData(globalVaultStakedToBnbUserData))
    dispatch(setGlobalVaultUserDataLoaded())
  }

/* export const updateVaultUserAllowance =
  (sousId: number, account: string): AppThunk =>
  async (dispatch) => {
    const allowances = await fetchPoolsAllowance(account)

    dispatch(updateVaultsUserData({ sousId, field: 'allowance', value: allowances[sousId] }))
  } */

export const vaultsSlice = createSlice({
  name: 'Vaults',
  initialState,
  reducers: {
    setGlobalVaultStakedToBnbPublicData: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.globalVaultStakedToBnb = { ...state.globalVaultStakedToBnb, ...action.payload }
    },
    setGlobalVaultStakedToGlobalPublicData: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.globalVaultStakedToGlobal = { ...state.globalVaultStakedToGlobal, ...action.payload }
    },
    setGlobalVaultStakedToBnbUserData: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.globalVaultStakedToBnb = { ...state.globalVaultStakedToBnb, ...action.payload }
    },
    setGlobalVaultStakedToGlobalUserData: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.globalVaultStakedToGlobal = { ...state.globalVaultStakedToGlobal, ...action.payload }
    },
    setGlobalVaultUserDataLoaded: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.userDataLoaded = true
    },
    /* updateVaultsUserData: (state, action) => {
      const { field, value, sousId } = action.payload
      const index = state.data.findIndex((p) => p.sousId === sousId)

      if (index >= 0) {
        state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
      }
    }, */
  },
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

// Actions
export const {
  setGlobalVaultStakedToBnbPublicData,
  setGlobalVaultStakedToGlobalPublicData,
  setGlobalVaultStakedToBnbUserData,
  setGlobalVaultStakedToGlobalUserData,
  setGlobalVaultUserDataLoaded,
} = vaultsSlice.actions

export default vaultsSlice.reducer
