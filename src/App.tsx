import React, { lazy } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@duhd4h/global-uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import { usePollCoreFarmData, useFetchProfile, usePollBlockNumber } from 'state/hooks'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
import Pools from './views/Pools'
import history from './routerHistory'
import HelpButton from './views/Pools/components/HelpButton'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Optimizer = lazy(() => import('./views/optimizer'))
const NotFound = lazy(() => import('./views/NotFound'))

// This config is required for number formatting
BigNumber.config({
    EXPONENTIAL_AT: 1000,
    DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
    usePollBlockNumber()
    useEagerConnect()
    useFetchProfile()
    usePollCoreFarmData()

    return (
        <Router history={history}>
            <ResetCSS />
            <GlobalStyle />
            <HelpButton />
            <Menu>
                <SuspenseWithChunkError fallback={<PageLoader />}>
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/farms">
                            <Farms />
                        </Route>
                        <Route path="/poolsGlobal">
                            <Pools isGlobal />
                        </Route>
                        <Route path="/poolsToken">
                            <Optimizer />
                        </Route>
                        <Route path="/optimizer">
                            <Optimizer isGlobal />
                        </Route>
                        {/*
            <Route path="/lottery">
              <Lottery />
            </Route>
            <Route path="/ifo">
              <Ifos />
            </Route>
            <Route path="/collectibles">
              <Collectibles />
            </Route>
            <Route exact path="/teams">
              <Teams />
            </Route>
            <Route path="/teams/:id">
              <Team />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/competition">
              <TradingCompetition />
            </Route>
            <Route path="/prediction">
              <Predictions />
            </Route> /}
            {/ Redirect /}
            {/ <Route path="/staking">
              <Redirect to="/pools" />
            </Route>
            <Route path="/syrup">
              <Redirect to="/pools" />
            </Route>
            <Route path="/nft">
              <Redirect to="/collectibles" />
            </Route> /}
            {/ 404 */}
                        <Route component={NotFound} />
                    </Switch>
                </SuspenseWithChunkError>
            </Menu>
            <ToastListener />
        </Router>
    )
}

export default React.memo(App)
