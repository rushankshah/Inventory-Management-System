import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import M from 'materialize-css/dist/js/materialize.min.js'
import { Link, useHistory } from 'react-router-dom'

export default function ForgotPassword() {
    const emailRef = useRef()
    const { login } = useAuth()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setLoading(true)
            // await login(emailRef.current.value, passwordRef.current.value)
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
            <br></br>
            <br></br>
            <div className="container ">
                <div className="row">
                    <div className="col l3 m3 s12"></div>
                    <div className="col l6 m3 s12">
                        <div className="row card hoverable-p deep purple lighten-5">
                            <div className="card-content ">
                                <h3 className="center">Reset password</h3>
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
                                    <div className="col s12 center">
                                        <button disabled={loading} type="submit" className="btn  waves-effect waves-light deep-purple ">Reset password<i className="material-icons right">send</i></button>
                                    </div>
                                </form>
                                <div>
                                    <Link to='/login'>Login</Link>
                                </div>
                                <div>
                                    Need an account? <Link to='signup'>Sign up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
