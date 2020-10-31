import React, { useContext, useState } from 'react'
import {auth} from '../utils/firebase'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

function signUp(email, password){
    auth.createUserWithEmailAndPassword(email, password)
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
