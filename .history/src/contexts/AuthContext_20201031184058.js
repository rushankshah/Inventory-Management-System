import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../utils/firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }


    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const value = {
        currentUser,
        signUp
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
