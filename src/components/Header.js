import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <div className="navbar-fixed">
                <nav className="red">
                    <div className="nav-wrapper">
                        <a href="#!" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <a href="#home" className="brand-logo s12">Inventory Management System</a>
                        <ul className="right hide-on-med-and-down">
                            <li>
                                <Link to='/' className='waves-effect waves-light'>Add new purchase</Link>
                            </li>
                            <li>
                                <Link to='/login' className='waves-effect waves-light'>Login</Link>
                            </li>
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
            </ul>
        </div>
    )
}

export default Navbar