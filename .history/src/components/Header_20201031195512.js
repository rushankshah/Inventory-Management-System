import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import M from 'materialize-css/dist/js/materialize.min.js'

const Navbar = () => {
    const history = useHistory()

    const { currentUser, logout } = useAuth()

    const handleLogOut = async () => {
        try {
            await logout()
            history.push('/login')
            M.toast({html: 'Logout successful', classes: 'rounded'})
        } catch (e) {
            M.toast({html: 'Failed to log out', classes:'rounded'})
        }
    }


    return (
        <div>
            <div className="navbar-fixed">
                <nav className="purple darken-4">
                    <div className="nav-wrapper">
                        <a href="#!" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <a href="#home" className="brand-logo s12">Inventory Management System</a>
                        <ul className="right hide-on-med-and-down">
                            {currentUser && <div>
                                <li><Link to='/' className='waves-effect waves-light'><i className="material-icons">add</i></Link></li>
                                <li>
                                    <Link to='/table' className='waves-effect waves-light'><i className="material-icons">view_list</i></Link>
                                </li>
                                <li>
                                    <button className='waves-effect waves-light' onClick={handleLogOut}>Log out</button>
                                </li>
                            </div>
                            }
                            {!currentUser && <div><li>
                                <Link to='/login' className='waves-effect waves-light'><i className="material-icons">person</i></Link>
                            </li>
                                <li>
                                    <Link to='/signup' className='waves-effect waves-light'><i className="material-icons">person</i>Sign up</Link>
                                </li></div>}

                        </ul>
                    </div>
                </nav>
            </div>

            <ul id="slide-out" className="sidenav">
                <li>
                    <Link to='/' className='waves-effect waves-light'>Add new purchase</Link>
                </li>
                <li>
                    <Link to='/login' className='waves-effect waves-light'>Login</Link>
                </li>
                <li>
                    <Link to='/table' className='waves-effect waves-light'>Table</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar