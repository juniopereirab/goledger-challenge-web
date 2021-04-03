import React from 'react';
import '../styles/Header.css';
import Carousel from './Carousel';
import CategoryCard from './CategoryCard';
import { Center } from '@chakra-ui/layout';

function Header({categories, vendors, setCategory, setVendor, onClickCategory, onClickVendor}) {
  return (
      <header>
        <Carousel vendors={vendors} setVendor={setVendor} onClick={onClickVendor}/>
        <Center>
            {categories.length > 0 ? categories.map((category) => (
                <CategoryCard category={category} key={category['@key']} onClick={onClickCategory} setCategory={setCategory}/>
            )) : null}
        </Center>
      </header>
  );
}

export default Header;