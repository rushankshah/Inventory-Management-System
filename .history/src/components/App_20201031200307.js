import React, { useEffect } from 'react'
import LoginPage from './LoginPage'
import SignUpPage from './SignUp'
import Table from './Table'
import M from 'materialize-css/dist/js/materialize.min.js';
import PurchaseEntryPage from './PurchaseEntryPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

export default () => {

  useEffect(() => {
    M.AutoInit();
  })

  return (
    <Router>
      <AuthProvider>
        <Header />
        <Switch>
          <PrivateRoute exact path='/' component={PurchaseEntryPage}></PrivateRoute>
          <Route exact path='/login' component={LoginPage}></Route>
          <Route exact path='/table' component={Table}></Route>
          <Route path='/signup' component={SignUpPage}></Route>
        </Switch>
      </AuthProvider>
    </Router>
  )
}
