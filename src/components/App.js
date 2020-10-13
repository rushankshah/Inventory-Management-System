import React, {useEffect} from 'react'
import Header from './Header'
import M from 'materialize-css/dist/js/materialize.min.js';
export default () => {

    useEffect(() => {
        M.AutoInit();
      })
    
    return (<Header></Header>)
}
  