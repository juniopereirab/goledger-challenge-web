import { Center } from '@chakra-ui/layout';
import React from 'react';

function CategoryCard({category, onClick}) {
  return (
      <Center
        bg="#9DF5FD"
        w="190px"
        h="50px"
        border="1px solid #000"
        borderRadius="2px"
        margin="0 10px"
        boxShadow="2px 2px 2px rgba(0,0,0,.4)"
        transition="0.4s all"
        _hover={{
            boxShadow: "0px 0px 0px"
        }}
        onClick={onClick}
        fontFamily='Montserrat'
        fontWeight='bold'
      >
          {category.name}
      </Center>
  );
}

export default CategoryCard;