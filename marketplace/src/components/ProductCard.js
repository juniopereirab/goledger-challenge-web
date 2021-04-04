import React from 'react';
import {Box, Text} from '@chakra-ui/react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { useDisclosure } from '@chakra-ui/hooks';
import { Button } from '@chakra-ui/button';
import {MdDelete } from 'react-icons/md';

function ProductCard({productName, productPrice, onClick, isLoading, onDelete, selectedProduct}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = () => {
      onClick();
      onOpen();
  }
  return (
    <>
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
            onClick={handleClick}
        > 
            <Text fontSize="1.4rem" fontWeight='light' fontFamily='Montserrat'>{productName}</Text>
            <Text fontSize="1.2rem" fontWeight='regular' fontFamily='Montserrat'>R$ {productPrice}</Text>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="lg">
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Informações do Categoria</ModalHeader>
                <ModalCloseButton />
                <ModalBody d="flex" flexDirection="column">
                    <Text fontSize="3xl">{selectedProduct.name}</Text>
                    <Text>R$ {selectedProduct.price}</Text>
                    <Text>Vendido por:</Text>
                    <Text>{selectedProduct.soldBy.name}</Text>
                    <Text>{selectedProduct.soldBy.address}</Text>
                    <Text>Categorias:</Text>
                    {selectedProduct.categories.map((category) => (
                        <Text key={category['@key']}>{category.name}</Text>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button isLoading={isLoading} colorScheme="red" onClick={onDelete} rightIcon={<MdDelete/>}>
                        Deletar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  );
}

export default ProductCard;