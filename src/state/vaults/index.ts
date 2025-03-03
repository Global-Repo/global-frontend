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
  fetchGlobalVaultCakeMaximizerPublicData,
  fetchGlobalVaultCakeMaximizerUserData,
  fetchGlobalVaultMixStrategyPublicData,
  fetchGlobalVaultMixStrategyUserData,
  fetchGlobalVaultGlobalMaximizerPublicData,
  fetchGlobalVaultGlobalMaximizerUserData,
} from './fetchVaults'
import { getTokenPricesFromFarm } from '../pools/helpers'

const initialState: VaultsState = {
  globalVaultLocked: undefined,
  globalVaultVested: undefined,
  globalVaultStakedToBnb: undefined,
  globalVaultStakedToGlobal: undefined,
  globalVaultCake: undefined,
  globalVaultCakeMaximizer: undefined,
  globalVaultMixStrategy: undefined,
  globalVaultGlobalMaximizer: undefined,
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
  const globalVaultCakeMaximizerPublicData = await fetchGlobalVaultCakeMaximizerPublicData(vaultsConfig[6], prices)
  const globalVaultMixStrategyPublicData = await fetchGlobalVaultMixStrategyPublicData(vaultsConfig[7], prices)
  const globalVaultGlobalMaximizerPublicData = await fetchGlobalVaultGlobalMaximizerPublicData(vaultsConfig[8], prices)
  
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

  const globalVaultCakeMaximizer: GlobalVaultStaked = {
    ...vaultsConfig[6],
    ...globalVaultCakeMaximizerPublicData,
  }

  const globalVaultMixStrategy: GlobalVaultStaked = {
    ...vaultsConfig[7],
    ...globalVaultMixStrategyPublicData,
  }

  const globalVaultGlobalMaximizer: GlobalVaultStaked = {
    ...vaultsConfig[8],
    ...globalVaultGlobalMaximizerPublicData,
  }

  dispatch(setGlobalVaultStakedToBnbPublicData(globalVaultStakedToBnb))
  dispatch(setGlobalVaultStakedToGlobalPublicData(globalVaultStakedToGlobal))
  dispatch(setGlobalVaultVestedPublicData(globalVaultVested))
  dispatch(setGlobalVaultLockedPublicData(globalVaultLocked))
  dispatch(setGlobalVaultCakePublicData(globalVaultCake))
  dispatch(setGlobalVaultCakeMaximizerPublicData(globalVaultCakeMaximizer))
  dispatch(setGlobalVaultMixStrategyPublicData(globalVaultMixStrategy))
  dispatch(setGlobalVaultGlobalMaximizerPublicData(globalVaultGlobalMaximizer))
}

export const fetchGlobalVaultsUserData =
  (account: string): AppThunk =>
  async (dispatch) => {
    const globalVaultStakedToBnbUserData = await fetchGlobalVaultStakedToBnbUserData(account, vaultsConfig[0])
    const globalVaultStakedToGlobalUserData = await fetchGlobalVaultStakedToGlobalUserData(account, vaultsConfig[1])
    const globalVaultVestedUserData = await fetchGlobalVaultVestedUserData(account, vaultsConfig[2])
    const globalVaultLockedUserData = await fetchGlobalVaultLockedUserData(account, vaultsConfig[3])
    const globalVaultCakeUserData = await fetchGlobalVaultCakeUserData(account, vaultsConfig[4])
    const globalVaultCakeMaximizerUserData = await fetchGlobalVaultCakeMaximizerUserData(account, vaultsConfig[6])
    const globalVaultMixStrategyUserData = await fetchGlobalVaultMixStrategyUserData(account, vaultsConfig[7])
    const globalVaultGlobalMaximizerUserData = await fetchGlobalVaultGlobalMaximizerUserData(account, vaultsConfig[8])

    dispatch(setGlobalVaultStakedToBnbUserData(globalVaultStakedToBnbUserData))
    dispatch(setGlobalVaultStakedToGlobalUserData(globalVaultStakedToGlobalUserData))
    dispatch(setGlobalVaultVestedUserData(globalVaultVestedUserData))
    dispatch(setGlobalVaultLockedUserData(globalVaultLockedUserData))
    dispatch(setGlobalVaultCakeUserData(globalVaultCakeUserData))
    dispatch(setGlobalVaultCakeMaximizerUserData(globalVaultCakeMaximizerUserData))
    dispatch(setGlobalVaultMixStrategyUserData(globalVaultMixStrategyUserData))
    dispatch(setGlobalVaultGlobalMaximizerUserData(globalVaultGlobalMaximizerUserData))
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
    setGlobalVaultCakeMaximizerUserData: (state, action) => {
      state.globalVaultCakeMaximizer = { ...state.globalVaultCakeMaximizer, ...action.payload }
    },
    setGlobalVaultCakeMaximizerPublicData: (state, action) => {
      state.globalVaultCakeMaximizer = { ...state.globalVaultCakeMaximizer, ...action.payload }
    },
    setGlobalVaultMixStrategyUserData: (state, action) => {
      state.globalVaultMixStrategy = { ...state.globalVaultMixStrategy, ...action.payload }
    },
    setGlobalVaultMixStrategyPublicData: (state, action) => {
      state.globalVaultMixStrategy = { ...state.globalVaultMixStrategy, ...action.payload }
    },
    setGlobalVaultGlobalMaximizerUserData: (state, action) => {
      state.globalVaultGlobalMaximizer = { ...state.globalVaultGlobalMaximizer, ...action.payload }
    },
    setGlobalVaultGlobalMaximizerPublicData: (state, action) => {
      state.globalVaultGlobalMaximizer = { ...state.globalVaultGlobalMaximizer, ...action.payload }
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
  setGlobalVaultCakeMaximizerPublicData,
  setGlobalVaultCakeMaximizerUserData,
  setGlobalVaultMixStrategyPublicData,
  setGlobalVaultMixStrategyUserData,
  setGlobalVaultGlobalMaximizerPublicData,
  setGlobalVaultGlobalMaximizerUserData,
  setGlobalVaultUserDataLoaded,
} = vaultsSlice.actions

export default vaultsSlice.reducer
