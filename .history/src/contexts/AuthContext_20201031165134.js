import React, { useContext, useState } from 'react'
import {auth} from '../utils/firebase'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
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
