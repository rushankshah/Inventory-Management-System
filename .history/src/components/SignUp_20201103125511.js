import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import M from 'materialize-css/dist/js/materialize.min.js'
import { Link, useHistory } from 'react-router-dom'

export default function SignUp() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { signUp } = useAuth()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value)
            history.push('/')

        } catch (e) {
            M.toast({ html: 'Sign in failed. Please try again', classes: 'rounded' })
            setLoading(false)
            return
        }
        M.toast({ html: 'Successfully signed up', classes: 'rounded' })
        setLoading(false)
    }

    return (
        <div>
            <br></br>
            <br></br>
            <div className="container ">
                <div className="row">
                    <div className="col l3 m3 s12"></div>
                    <div className="col l6 m3 s12">
                        <div className="row card hoverable-p deep purple lighten-5">
                            <div className="card-content ">
                                <h3 className="center">Sign Up</h3>
                                <h6 className="center">Register new user here</h6>
                                <form onSubmit={handleSubmit} className="row s12">
                                    <div className="col s2"></div>
                                    <div className="col s8">
                                        <div className="input-field">
                                            <i className="material-icons prefix">email</i>
                                            <input type="email" ref={emailRef} id='email' required />
                                            <label htmlFor="email">Email*</label>
                                        </div>
                                    </div><div className="col s2"></div>
                                    <br></br>
                                    <div className="row">
                                        <div className="col s2"></div>
                                        <div className="col s8 offset-s2">
                                            <div className="input-field ">
                                                <i className="material-icons prefix">lock</i>
                                                <input type="password" ref={passwordRef} id='password' required />
                                                <label htmlFor='password'>Password*</label>
                                            </div>
                                        </div></div>
                                    <div className="col s12 center">
                                        <button type="submit" disabled={loading} className="btn  waves-effect waves-light deep-purple ">Register<i className="material-icons right">send</i></button>
                                    </div>
                                </form>
                                <br></br><br></br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
