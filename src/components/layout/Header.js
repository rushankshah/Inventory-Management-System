import React from 'react'

const Navbar = () => {
    return (
        <div>
            <div className="navbar-fixed">
                <nav className="purple">
                    <div className="container">
                        <div className="nav-wrapper">
                            <a href="#!" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                            <a href="#home" className="brand-logo">SEF</a>
                            <ul className="right hide-on-med-and-down">
                                <li><a href="sass.html">Sass</a></li>
                                <li><a href="badges.html">Components</a></li>
                                <li><a href="collapsible.html">Javascript</a></li>
                                <li><a href="mobile.html">Mobile</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            <ul id="slide-out" className="sidenav">
                <li><a href="sass.html">Sass</a></li>
                <li><a href="badges.html">Components</a></li>
                <li><a href="collapsible.html">Javascript</a></li>
                <li><a href="mobile.html">Mobile</a></li>
            </ul>
        </div>
    )
}

export default Navbar