import React, {useEffect} from 'react'
import LoginPage from './LoginPage'
import M from 'materialize-css/dist/js/materialize.min.js';
export default () => {

    useEffect(() => {
        M.AutoInit();
      })
    
    return (<LoginPage/>)
}
  