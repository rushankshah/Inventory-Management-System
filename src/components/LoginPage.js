import React from 'react'

const LoginPage = () => {
    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row card hoverable">
                    <div className="card-content ">
                        <h4 className="center">Login Form</h4>
                        <form className="row s12">
                            <div className="col s12">
                                <div className="input-field">
                                    <input type="email" id='email' required />
                                    <label for="email">Email*</label>
                                </div>
                            </div>
                            <div className="col s12">
                                <div className="input-field">
                                    <input type="password" id='password' required />
                                    <label for='password'>Password*</label>
                                </div>
                            </div>
                            <div className="col s12 center">
                                <button type="button" className="btn btn-large waves-effect waves-light">Login<i className="material-icons right">send</i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage