import React, { useEffect, useState } from 'react';
import '../styles/Header.css';
import Carousel from './Carousel';
import CategoryCard from './CategoryCard';
import api from '../api';
import { Center } from '@chakra-ui/layout';

function Header() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function getCategories () {
            const response = await api.post('/query/search', {
                query: {
                    selector: {
                        "@assetType": "category"
                    }
                }
            });

            setCategories(response['data'].result);
        }

        getCategories();
    }, [])
  return (
      <header>
        <Carousel />
        <Center>
            {categories.length > 0 ? categories.map((category) => (
                <CategoryCard name={category.name} key={category['@key']}/>
            )) : null}
        </Center>
      </header>
  );
}

export default Header;