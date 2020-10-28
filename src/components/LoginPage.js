import React from 'react'

const LoginPage = () => {
    return (
        <div>
            <br></br>
            <br></br>
            <div className="container ">
            <div class="row">
          <div class="col l3 m3 s12"></div>
          <div class="col l6 m3 s12">
                <div className="row card hoverable-p deep purple lighten-5">
                    <div className="card-content ">
                        <h3 className="center">Sign In</h3>
                        <form className="row s12">
                        <div className="col s2"></div>
                            <div className="col s8">
                                <div className="input-field">
                                <i class="material-icons prefix">email</i>
                                    <input type="email" id='email' required />
                                    <label for="email">Email*</label>
                                </div>
                            </div><div className="col s2"></div>
                            <br></br>
                            <div class="row">
                            <div className="col s2"></div>
                            <div className="col s8 offset-s2">
                                <div className="input-field ">
                                <i class="material-icons prefix">lock</i>
                                    <input type="password" id='password' required />
                                    <label for='password'>Password*</label>
                                </div>
                            </div></div>
                            <div className="col s12 center">
                                <button type="button" className="btn  waves-effect waves-light deep-purple ">Sign In<i className="material-icons right">send</i></button>
                            </div>
                        </form>
                    </div>
                </div></div></div>
            </div>
        </div>
    )
}

export default LoginPage