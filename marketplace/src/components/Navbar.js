import React from 'react';
import { Link } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import '../styles/Navbar.css';

function NavBar() {
  return (
    <div className="mainNavBar">
        <Link as={ReachLink} to='/'>
            Marketplace
        </Link>
    </div>
  );
}

export default NavBar;