import React, { useEffect } from 'react'
import LoginPage from './LoginPage'
import SignUpPage from './SignUp'
import Table from './Table'
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
        <Route exact path='/table' component={Table}></Route>
        <Route exact path='/signup' component={SignUpPage}></Route>
      </Switch>
    </Router>
  )
}
