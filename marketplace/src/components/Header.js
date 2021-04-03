import React from 'react';
import '../styles/Header.css';
import Carousel from './Carousel';
import CategoryCard from './CategoryCard';
import { Center } from '@chakra-ui/layout';

function Header({categories, vendors}) {
  return (
      <header>
        <Carousel vendors={vendors}/>
        <Center>
            {categories.length > 0 ? categories.map((category) => (
                <CategoryCard name={category.name} key={category['@key']}/>
            )) : null}
        </Center>
      </header>
  );
}

export default Header;