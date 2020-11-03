import React, { useEffect } from 'react'
import LoginPage from './LoginPage'
import SignUpPage from './SignUp'
import Table from './Table';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import PurchaseEntryPage from './PurchaseEntryPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';

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
          <PrivateRoute exact path='/table' component={Table}></PrivateRoute>
          <PrivateRoute path='/signup' component={SignUpPage}></PrivateRoute>
          <Route path='/forgot-password' component={ForgotPassword}></Route>
        </Switch>
      </AuthProvider>
    </Router>
  )
}
