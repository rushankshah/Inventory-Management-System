import React, { useEffect } from 'react'
import LoginPage from './LoginPage'
import M from 'materialize-css/dist/js/materialize.min.js';
import PurchaseEntryPage from './PurchaseEntryPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'

export default () => {

  useEffect(() => {
    M.AutoInit();
  })

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={PurchaseEntryPage}></Route>
        <Route exact path='/login' component={LoginPage}></Route>
      </Switch>
    </Router>
  )
}
