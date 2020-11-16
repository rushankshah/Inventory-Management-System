import React from 'react'
import LoginPage from './LoginPage'
import SignUpPage from './SignUp'
import PurchaseHistoryTable from './PurchaseHistoryTable';
import PendingFreshStock from './PendingFreshStockTable'
import 'materialize-css/dist/css/materialize.min.css';
import PurchaseEntryPage from './PurchaseEntryPage'
import CuttedStockTable from './CuttedStockTable'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import CuttingForm from './CuttingForm';
import SellingHistory from './SellingHistory';
import ScrapPendingStock from './ScrapPendingStock';

export default () => {

  return (
    <Router>
      <AuthProvider>
        <Header />
        <Switch>
          <PrivateRoute exact path='/' component={PurchaseEntryPage}></PrivateRoute>
          <Route exact path='/login' component={LoginPage}></Route>
          <PrivateRoute exact path='/purchase-history-table' component={PurchaseHistoryTable}></PrivateRoute>
          <PrivateRoute path='/signup' component={SignUpPage}></PrivateRoute>
          <Route path='/forgot-password' component={ForgotPassword}></Route>
          <PrivateRoute path='/cutting-form' component={CuttingForm}></PrivateRoute>
          <PrivateRoute path='/pending-fresh-stock' component={PendingFreshStock}></PrivateRoute>
          <PrivateRoute path='/pending-cutted-stock' component={CuttedStockTable}></PrivateRoute>
          <PrivateRoute path='/selling-history' component={SellingHistory}></PrivateRoute>
          <PrivateRoute path='/scrap' component={ScrapPendingStock}></PrivateRoute>
        </Switch>
      </AuthProvider>
    </Router>
  )
}
