import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import M from 'materialize-css'
import img from '../images/logo512.png'
const Navbar = () => {
    const history = useHistory()

    useEffect(() => {
        M.AutoInit()
    })

    const { currentUser, logout } = useAuth()

    const handleLogOut = async () => {
        try {
            await logout()
            history.push('/login')
            M.toast({ html: 'Logout successful', classes: 'rounded' })
        } catch (e) {
            M.toast({ html: 'Failed to log out', classes: 'rounded' })
        }
    }


    return (
        <div>
            <div className="navbar-fixed">
                <nav className="purple darken-4">
                    <div className="nav-wrapper">
                        <a href="!#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons" title="Menu">menu</i></a>
                        <a href="/" className="brand-logo s12 "> <img src={img} width="6%" height="6%" alt="logo"></img>    Trade Track</a>
                        <ul className="right hide-on-med-and-down">
                            {currentUser && <div>
                                <li><Link to='/' className='waves-effect waves-light'>Add New Purchase</Link></li>
                                <li>
                                    <Link to='/purchase-history-table' className='waves-effect waves-light'>Purchase History</Link>
                                </li>
                                <li>
                                    <Link to='/pending-fresh-stock' className='waves-effect waves-light'>Pending Fresh Stock</Link>
                                </li>
                                <li>
                                    <Link to='/pending-cutted-stock' className='waves-effect waves-light'>Pending Cutted Stock</Link>
                                </li>
                                <li>
                                    <Link to='/scrap-pending' className='waves-effect waves-light'>Pending Scrap</Link>
                                </li>
                                <li>
                                    <Link to='/selling-history' className='waves-effect waves-light'>Selling History</Link>
                                </li>
                                <li>
                                    <Link to='/signup' className='waves-effect waves-light'><i className="material-icons" title="Sign Up">person</i></Link>
                                </li>
                                <li>
                                    <Link to='/login' className='waves-effect waves-light purple darken-4 ' onClick={handleLogOut}><i className="material-icons" title="Sign Out">power_settings_new</i></Link>
                                </li>
                            </div>
                            }
                            {!currentUser && <div><li>
                                <Link to='/login' className='waves-effect waves-light'><i className="material-icons" title="Sign In">person</i></Link>
                            </li>
                            </div>}

                        </ul>
                    </div>
                </nav>
            </div>

            <ul id="slide-out" className="sidenav">
                {currentUser && <div>
                    <li><Link to='/' className='waves-effect waves-light'>Add New Purchase</Link></li>
                    <li>
                        <Link to='/purchase-history-table' className='waves-effect waves-light'>Purchase History</Link>
                    </li>
                    <li>
                        <Link to='/pending-fresh-stock' className='waves-effect waves-light'>Pending Fresh Stock</Link>
                    </li>
                    <li>
                        <Link to='/pending-cutted-stock' className='waves-effect waves-light'>Pending Cut Stock</Link>
                    </li>
                    <li>
                        <Link to='/signup' className='waves-effect waves-light'><i className="material-icons" title="Sign Up">person</i></Link>
                    </li>
                    <li>
                        <Link to='/login' className='waves-effect waves-light purple darken-4 ' onClick={handleLogOut}><i className="material-icons" title="Sign Out">power_settings_new</i></Link>
                    </li>
                </div>
                }
                {!currentUser && <div><li>
                    <Link to='/login' className='waves-effect waves-light'><i className="material-icons" title="Sign In">person</i></Link>
                </li>
                </div>}
            </ul>
        </div>
    )
}

export default Navbar