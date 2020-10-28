import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <div className="navbar-fixed">
                <nav className="purple darken-4">
                    <div className="nav-wrapper">
                        <a href="#!" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <a href="#home" className="brand-logo s12">Inventory Management System</a>
                        <ul className="right hide-on-med-and-down">
                            <li><Link to='/' className='waves-effect waves-light'><i class="material-icons">add</i></Link>
                                
                            </li>
                            <li>
                                <Link to='/table' className='waves-effect waves-light'><i class="material-icons">view_list</i></Link>
                            </li>
                            <li>
                                <Link to='/login' className='waves-effect waves-light'><i class="material-icons">person</i></Link>
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
                <li>
                    <Link to='/table' className='waves-effect waves-light'>Table</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar