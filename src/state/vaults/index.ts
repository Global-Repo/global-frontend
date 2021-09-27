/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { AppThunk, GlobalVaultStaked, GlobalVaultVested, VaultsState } from '../types'
import vaultsConfig from '../../config/constants/vaults'
import {
  fetchGlobalVaultCakePublicData,
  fetchGlobalVaultCakeUserData,
  fetchGlobalVaultLockedPublicData,
  fetchGlobalVaultLockedUserData,
  fetchGlobalVaultStakedToBnbPublicData,
  fetchGlobalVaultStakedToBnbUserData,
  fetchGlobalVaultStakedToGlobalPublicData,
  fetchGlobalVaultStakedToGlobalUserData,
  fetchGlobalVaultVestedPublicData,
  fetchGlobalVaultVestedUserData,
} from './fetchVaults'
import { getTokenPricesFromFarm } from '../pools/helpers'

const initialState: VaultsState = {
  globalVaultLocked: undefined,
  globalVaultVested: undefined,
  globalVaultStakedToBnb: undefined,
  globalVaultStakedToGlobal: undefined,
  globalVaultCake: undefined,
  userDataLoaded: false,
}

// Thunks

export const fetchGlobalVaultsPublicData = (): AppThunk => async (dispatch, getState) => {
  const prices = getTokenPricesFromFarm(getState().farms.data)

  const globalVaultStakedToBnbPublicData = await fetchGlobalVaultStakedToBnbPublicData(vaultsConfig[0], prices)
  const globalVaultStakedToGlobalPublicData = await fetchGlobalVaultStakedToGlobalPublicData(vaultsConfig[1], prices)
  const globalVaultVestedPublicData = await fetchGlobalVaultVestedPublicData(vaultsConfig[2], prices)
  const globalVaultLockedPublicData = await fetchGlobalVaultLockedPublicData(vaultsConfig[3], prices)
  const globalVaultCakePublicData = await fetchGlobalVaultCakePublicData(vaultsConfig[4], prices)

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

  const globalVaultLocked: GlobalVaultVested = {
    ...vaultsConfig[3],
    ...globalVaultLockedPublicData,
  }

  const globalVaultCake: GlobalVaultStaked = {
    ...vaultsConfig[4],
    ...globalVaultCakePublicData,
  }

  dispatch(setGlobalVaultStakedToBnbPublicData(globalVaultStakedToBnb))
  dispatch(setGlobalVaultStakedToGlobalPublicData(globalVaultStakedToGlobal))
  dispatch(setGlobalVaultVestedPublicData(globalVaultVested))
  dispatch(setGlobalVaultLockedPublicData(globalVaultLocked))
  dispatch(setGlobalVaultCakePublicData(globalVaultCake))
}

export const fetchGlobalVaultsUserData =
  (account: string): AppThunk =>
  async (dispatch) => {
    const globalVaultStakedToBnbUserData = await fetchGlobalVaultStakedToBnbUserData(account, vaultsConfig[0])
    const globalVaultStakedToGlobalUserData = await fetchGlobalVaultStakedToGlobalUserData(account, vaultsConfig[1])
    const globalVaultVestedUserData = await fetchGlobalVaultVestedUserData(account, vaultsConfig[2])
    const globalVaultLockedUserData = await fetchGlobalVaultLockedUserData(account, vaultsConfig[3])
    const globalVaultCakeUserData = await fetchGlobalVaultCakeUserData(account, vaultsConfig[4])

    dispatch(setGlobalVaultStakedToBnbUserData(globalVaultStakedToBnbUserData))
    dispatch(setGlobalVaultStakedToGlobalUserData(globalVaultStakedToGlobalUserData))
    dispatch(setGlobalVaultVestedUserData(globalVaultVestedUserData))
    dispatch(setGlobalVaultLockedUserData(globalVaultLockedUserData))
    dispatch(setGlobalVaultCakeUserData(globalVaultCakeUserData))

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
    setGlobalVaultLockedPublicData: (state, action) => {
      state.globalVaultLocked = { ...state.globalVaultLocked, ...action.payload }
    },
    setGlobalVaultCakePublicData: (state, action) => {
      state.globalVaultCake = { ...state.globalVaultCake, ...action.payload }
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
    setGlobalVaultLockedUserData: (state, action) => {
      state.globalVaultLocked = { ...state.globalVaultLocked, ...action.payload }
    },
    setGlobalVaultCakeUserData: (state, action) => {
      state.globalVaultCake = { ...state.globalVaultCake, ...action.payload }
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
  setGlobalVaultLockedPublicData,
  setGlobalVaultCakePublicData,
  setGlobalVaultStakedToBnbUserData,
  setGlobalVaultStakedToGlobalUserData,
  setGlobalVaultVestedUserData,
  setGlobalVaultLockedUserData,
  setGlobalVaultCakeUserData,
  setGlobalVaultUserDataLoaded,
} = vaultsSlice.actions

export default vaultsSlice.reducer
