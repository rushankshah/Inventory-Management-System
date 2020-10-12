import React, { useEffect } from 'react'
import M from 'materialize-css/dist/js/materialize'

const Navbar = () => {
    useEffect(
        () => {
            document.addEventListener('DOMContentLoaded', function () {
                var elems = document.querySelectorAll('.sidenav');
            });
        }
    )
    // <div>
    //     <div className='navbar-fixed'>
    //         <nav>
    //             <div class="nav-wrapper">
    //                 <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
    //                 <a href="#!" class="brand-logo">Logo</a>
    //                 <ul class="right hide-on-med-and-down">
    //                     <li><a href="sass.html">Sass</a></li>
    //                     <li><a href="badges.html">Components</a></li>
    //                     <li><a href="collapsible.html">Javascript</a></li>
    //                     <li><a href="mobile.html">Mobile</a></li>
    //                 </ul>
    //             </div>
    //         </nav>
    //     </div>

    //     <ul className="sidenav" id="slide-out">
    //         <li><a href="sass.html">Sass</a></li>
    //         <li><a href="badges.html">Components</a></li>
    //         <li><a href="collapsible.html">Javascript</a></li>
    //         <li><a href="mobile.html">Mobile</a></li>
    //     </ul>
    // </div>
    return (
        <div>
            <div class="navbar-fixed">
                <nav class="teal">
                    <div class="container">
                        <div class="nav-wrapper">
                            <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                            <a href="#home" class="brand-logo">SEF</a>
                            <ul class="right hide-on-med-and-down">
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