import React from 'react';
import '../styles/Header.css';
import Carousel from './Carousel';
import { Divider } from '@chakra-ui/react';

function Header() {
  return (
      <header>
          <Carousel />
      </header>
  );
}

export default Header;