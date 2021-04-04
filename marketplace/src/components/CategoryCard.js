import { Center } from '@chakra-ui/layout';
import React from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { useDisclosure } from '@chakra-ui/hooks';
import { Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import {MdDelete } from 'react-icons/md';

function CategoryCard({category, onClick, onDelete, isLoading, categoryName}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = () => {
    onClick();
    onOpen();
  }
  return (
    <>
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
        onClick={handleClick}
        fontFamily='Montserrat'
        fontWeight='bold'
      >
          {category.name}
      </Center>

      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>Informações do Categoria</ModalHeader>
            <ModalCloseButton />
            <ModalBody d="flex" flexDirection="column">
                <Text fontSize="3xl">Nome: {categoryName}</Text>
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

export default CategoryCard;