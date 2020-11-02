import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import M from 'materialize-css/dist/js/materialize.min.js'
import { Link, useHistory } from 'react-router-dom'
import '../css/main.css'

const LoginPage = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
            M.toast({ html: 'Login successful', classes: 'rounded' })
            setLoading(false)
        } catch (e) {
            M.toast({ html: 'Login failed. Check credentials', classes: 'rounded' })
            setLoading(false)
            return
        }
    }

    return (
        <div>
            <body>
            <br></br>
            <br></br>
            <div className="container ">
                <div className="row">
                    <div className="col l3 m3 s12"></div>
                    <div className="col l6 m3 s12">
                        <div className="row card hoverable-p deep-purple lighten-5">
                            <div className="card-content ">
                                <h3 className="center">Sign In</h3>
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
                                        <button disabled={loading} type="submit" className="btn  waves-effect waves-light deep-purple ">Sign In<i className="material-icons right">send</i></button>
                                    </div>
                                </form>
                                <br></br>
                                <div className="col deep ">
                                    <Link to='/forgot-password'>Forgot Password?</Link>
                                </div>
                                <div className="col offset-s3">
                                    Need an account? <Link to='signup'>Sign up</Link>
                                </div>
                                <br></br><br></br>
                            </div>
                        </div>
                    </div>
                </div>
            </div></body>
        </div>
    )
}

export default LoginPage