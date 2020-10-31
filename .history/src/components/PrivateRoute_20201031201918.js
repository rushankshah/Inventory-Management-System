import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'
import M from 'materialize-css/dist/js/materialize.min.js'

export default function PrivateRoute({component: Component, ...rest}) {
    const {currentUser} = useAuth()
    return (
        <Route
        {...rest}
        render={props => {
          if(currentUser)
            return <Component {...props} />
          else{
            M.toast({html:'Please login first', classes:'rounded'})
            return <Redirect to="/login" />
          }
        }}
      ></Route>
    )
}
