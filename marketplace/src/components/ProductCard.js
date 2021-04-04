import React from 'react';
import {Box, Text} from '@chakra-ui/react'

function ProductCard({productName, productPrice, onClick}) {
  return (
    <Box 
        w="400px" 
        h="75px" 
        bg="#9DF5FD"
        borderRadius="2px" 
        d="flex" 
        alignItems="center" 
        justifyContent="space-around"
        border="1px solid #000"
        boxShadow="2px 2px 10px rgba(0,0,0,.4)"
        transition="0.4s all"
        _hover={{
            boxShadow: "0px 0px 0px"
        }}
        onClick={onClick}
    > 
        <Text fontSize="1.4rem" fontWeight='light' fontFamily='Montserrat'>{productName}</Text>
        <Text fontSize="1.2rem" fontWeight='regular' fontFamily='Montserrat'>R$ {productPrice}</Text>
    </Box>
  );
}

export default ProductCard;