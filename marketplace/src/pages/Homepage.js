import React, {useState, useEffect} from 'react';
import NavBar from '../components/Navbar';
import Header from '../components/Header';
import api from '../api';
import { Box, Center, Divider, Grid, Text } from '@chakra-ui/layout';

// import { Container } from './styles';

function pages() {
    const [vendors, setVendors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getHeaderInfo () {
            const category = await api.post('/query/search', {
                query: {
                    selector: {
                        "@assetType": "category"
                    }
                }
            });

            const vendor = await api.post('/query/search', {
                query: {
                    selector: {
                        "@assetType": "seller"
                    }
                }
            });

            const product = await api.post('/query/search', {
                query: {
                    selector: {
                        "@assetType": "product"
                    }
                }
            });

            setProducts(product['data'].result);
            setVendors(vendor['data'].result);
            setCategories(category['data'].result);
        }

        getHeaderInfo();
    }, [])
  return (
      <>
        <NavBar/>
        <Header categories={categories} vendors={vendors}/>
        <Center>
            <Grid templateColumns="repeat(4, 1fr)" gap={10}>
                {products.length > 0 ? products.map((product) => (
                    <Box 
                        w="400px" 
                        h="75px" 
                        bg="#69C7EF" 
                        borderRadius="5px" 
                        d="flex" 
                        alignItems="center" 
                        justifyContent="space-around"
                        border="1px solid #000"
                        boxShadow="2px 2px 10px rgba(0,0,0,.4)"
                        transition="0.4s all"
                        _hover={{
                            boxShadow: "0px 0px 0px"
                        }}
                    > 
                        <Text fontSize="1.4rem">{product.name}</Text>
                        <Text fontSize="1.2rem">R$ {product.price}</Text>
                    </Box>
                )) : null}
            </Grid>
        </Center>
      </>   
  );
}

export default pages;