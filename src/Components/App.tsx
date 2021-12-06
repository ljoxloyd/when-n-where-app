import React from "react"
import AppHeader from "./AppHeader/AppHeader"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"

import MainPage from "./Pages/MainPage/MainPage"
import EventPage from "./Pages/EventPage/EventPage"
import { ROUTE_MAIN } from "../Shared/constants"
import { Provider } from "react-redux"
import store from "../Store/store"


const App = () => {


  return (
    <Provider store={store} >
      <Router>

        <AppHeader />

        <Switch>
          <Route exact path="/">

            <EventPage />

          </Route>
          <Route path={ROUTE_MAIN}>

            <MainPage />

          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App

