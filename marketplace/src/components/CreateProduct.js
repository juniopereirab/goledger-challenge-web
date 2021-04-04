import React from 'react';
import { Action } from 'react-tiny-fab';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { useDisclosure } from '@chakra-ui/hooks';
import { Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { MdAddShoppingCart } from 'react-icons/md';

function CreateProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
      <>
        <Action
            onClick={() => console.log("Adicionar produto")}
            style={{background:"#B3A8F4"}}
        >
            <MdAddShoppingCart/>
        </Action>
      </>
  );
}

export default CreateProduct;