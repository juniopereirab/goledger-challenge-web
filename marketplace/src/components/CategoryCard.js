import { Center } from '@chakra-ui/layout';
import React from 'react';

function CategoryCard({name}) {
  return (
      <Center
        bg="#A3DEF1"
        w="190px"
        h="50px"
        border="1px solid #000"
        borderRadius="5px"
        margin="0 10px"
        boxShadow="2px 2px 2px rgba(0,0,0,.4)"
        transition="0.4s all"
        _hover={{
            boxShadow: "0px 0px 0px"
        }}
      >
          {name}
      </Center>
  );
}

export default CategoryCard;