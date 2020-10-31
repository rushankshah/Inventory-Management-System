import React, { useContext, useEffect, useState } from 'react'
import {auth} from '../utils/firebase'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

useEffect(()=>{
    auth.onAuthStateChanged(user => {
        setCurrentUser(user)
    })   
}, [])

function signUp(email, password){
    return auth.createUserWithEmailAndPassword(email, password)
}


const [currentUser, setCurrentUser] = useState()

const value = {
    currentUser
}

export function AuthProvider({children}) {
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
