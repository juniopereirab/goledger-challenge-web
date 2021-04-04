import React from 'react';
import { Action } from 'react-tiny-fab';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { useDisclosure } from '@chakra-ui/hooks';
import { Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { BsPersonPlusFill } from 'react-icons/bs';

function CreateVendor() {
  return (
    <Action
        onClick={() => console.log("Adicionar vendedor")}
        style={{background:"#B3A8F4"}}
    >
        <BsPersonPlusFill/>
    </Action>
  );
}

export default CreateVendor;