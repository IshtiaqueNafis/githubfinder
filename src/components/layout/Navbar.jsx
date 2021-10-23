import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = ({title}) => {

    return (
        <nav className="navbar bg-primary">
              <h1> <FontAwesomeIcon icon={faAddressBook} /> {title}</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired
}

Navbar.defaultProps = {
    title: 'GitHub Finder'
}


export default Navbar;