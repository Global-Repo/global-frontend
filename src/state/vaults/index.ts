/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { AppThunk, GlobalVault, GlobalVaultStaked, GlobalVaultVested, VaultsState } from '../types'
import vaultsConfig from '../../config/constants/vaults'
import {
  fetchGlobalVaultStakedToBnbPublicData,
  fetchGlobalVaultStakedToBnbUserData,
  fetchGlobalVaultStakedToGlobalPublicData,
  fetchGlobalVaultStakedToGlobalUserData,
  fetchGlobalVaultVestedPublicData,
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
  const globalVaultVestedPublicData = await fetchGlobalVaultVestedPublicData(vaultsConfig[2])

  const globalVaultStakedToBnb: GlobalVaultStaked = {
    ...vaultsConfig[0],
    ...globalVaultStakedToBnbPublicData,
  }

  const globalVaultStakedToGlobal: GlobalVaultStaked = {
    ...vaultsConfig[1],
    ...globalVaultStakedToGlobalPublicData,
  }

  const globalVaultVested: GlobalVaultVested = {
    ...vaultsConfig[2],
    ...globalVaultVestedPublicData,
  }

  dispatch(setGlobalVaultStakedToBnbPublicData(globalVaultStakedToBnb))
  dispatch(setGlobalVaultStakedToGlobalPublicData(globalVaultStakedToGlobal))
  dispatch(setGlobalVaultVestedPublicData(globalVaultVested))
}

export const fetchGlobalVaultsUserData =
  (account: string): AppThunk =>
  async (dispatch) => {
    const globalVaultStakedToBnbUserData = await fetchGlobalVaultStakedToBnbUserData(account, vaultsConfig[0])
    const globalVaultStakedToGlobalUserData = await fetchGlobalVaultStakedToGlobalUserData(account, vaultsConfig[1])
    const globalVaultVestedUserData = await fetchGlobalVaultStakedToGlobalUserData(account, vaultsConfig[2])

    dispatch(setGlobalVaultStakedToBnbUserData(globalVaultStakedToBnbUserData))
    dispatch(setGlobalVaultStakedToGlobalUserData(globalVaultStakedToGlobalUserData))
    dispatch(setGlobalVaultVestedUserData(globalVaultVestedUserData))

    dispatch(setGlobalVaultUserDataLoaded())
  }

export const vaultsSlice = createSlice({
  name: 'Vaults',
  initialState,
  reducers: {
    setGlobalVaultStakedToBnbPublicData: (state, action) => {
      state.globalVaultStakedToBnb = { ...state.globalVaultStakedToBnb, ...action.payload }
    },
    setGlobalVaultStakedToGlobalPublicData: (state, action) => {
      state.globalVaultStakedToGlobal = { ...state.globalVaultStakedToGlobal, ...action.payload }
    },
    setGlobalVaultVestedPublicData: (state, action) => {
      state.globalVaultVested = { ...state.globalVaultVested, ...action.payload }
    },
    setGlobalVaultStakedToBnbUserData: (state, action) => {
      state.globalVaultStakedToBnb = { ...state.globalVaultStakedToBnb, ...action.payload }
    },
    setGlobalVaultStakedToGlobalUserData: (state, action) => {
      state.globalVaultStakedToGlobal = { ...state.globalVaultStakedToGlobal, ...action.payload }
    },
    setGlobalVaultVestedUserData: (state, action) => {
      state.globalVaultVested = { ...state.globalVaultVested, ...action.payload }
    },
    setGlobalVaultUserDataLoaded: (state) => {
      state.userDataLoaded = true
    },
  },
  extraReducers: () => {
    /* extra Reducers */
  },
})

// Actions
export const {
  setGlobalVaultStakedToBnbPublicData,
  setGlobalVaultStakedToGlobalPublicData,
  setGlobalVaultVestedPublicData,
  setGlobalVaultStakedToBnbUserData,
  setGlobalVaultStakedToGlobalUserData,
  setGlobalVaultVestedUserData,
  setGlobalVaultUserDataLoaded,
} = vaultsSlice.actions

export default vaultsSlice.reducer
