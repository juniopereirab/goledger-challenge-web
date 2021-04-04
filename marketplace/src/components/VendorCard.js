import { Box, Text } from '@chakra-ui/layout';
import React from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { useDisclosure } from '@chakra-ui/hooks';
import { Button } from '@chakra-ui/button';
import {MdDelete } from 'react-icons/md';

function VendorCard({vendor, onClick, vendorName, vendorAddress, vendorCNPJ, vendorJoined, isLoading, onDelete}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    onClick();
    onOpen();
  }
  return (
    <>
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
        onClick={handleClick}
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

      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>Informações do Vendedor</ModalHeader>
            <ModalCloseButton />
            <ModalBody d="flex" flexDirection="column">
                <Text fontSize="3xl">{vendorName}</Text>
                <Text>Endereço: {vendorAddress}</Text>
                <Text>CNPJ: <span id="secret">{vendorCNPJ}</span></Text>
                <Text>Se juntou em: {vendorJoined}</Text>
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

export default VendorCard;