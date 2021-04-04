import { Box, Text } from '@chakra-ui/layout';
import React from 'react';

function VendorCard({vendor, onClick}) {
  return (
      <Box 
        w='370px'
        h='200px'
        border='solid 4px #9DF5FD'
        d='flex'
        flexDirection="column"
        padding="40px"
        boxShadow="2px 2px 10px rgba(0,0,0,0.4)"
        transition=".4s all"
        _hover={{
          boxShadow: '0px 0px 0px'
        }}
        onClick={onClick}
      >
        <Text 
        fontSize="3xl"
        fontWeight="bold"
        fontFamily='Montserrat'
        >{vendor.name}</Text>
        <Text
        fontSize='xl'
        fontWeight='light'
        fontFamily='Montserrat'
        >{vendor.address}</Text>
      </Box>
  );
}

export default VendorCard;