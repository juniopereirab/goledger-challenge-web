import React from 'react';
import { Link } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import '../styles/Navbar.css';

function NavBar() {
  return (
    <navbar className="mainNavBar">
        <Link as={ReachLink} to='/'>
            Marketplace
        </Link>
    </navbar>
  );
}

export default NavBar;