import React from 'react'
import LoginPage from './LoginPage'
import SignUpPage from './SignUp'
import Table from './Table';
import 'materialize-css/dist/css/materialize.min.css';
import PurchaseEntryPage from './PurchaseEntryPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import CuttingForm from './CuttingForm';

export default () => {

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
          <PrivateRoute path='/cutting-form' component={CuttingForm}></PrivateRoute>
        </Switch>
      </AuthProvider>
    </Router>
  )
}
