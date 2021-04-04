import React, { useState } from 'react';
import { Action } from 'react-tiny-fab';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { useDisclosure } from '@chakra-ui/hooks';
import { Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { FaFilter } from 'react-icons/fa';
import { Input } from '@chakra-ui/input';
import { AiOutlinePlus } from 'react-icons/ai';
import api from '../api';


function CreateCategory() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  const createCategory = async () => {
      setLoading(true);
      await api.post('/invoke/createAsset', {
          "asset": [
              {
                  "@assetType": 'category',
                  name
              }
          ]
      });
      window.location.reload();
  }

  return (
    <>
        <Action
            onClick={onOpen}
            style={{background:"#B3A8F4"}}
        >
            <FaFilter/>
        </Action>
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader fontFamily="Montserrat" fontWeight="bold" fontSize="2xl">Criar nova categoria</ModalHeader>
                <ModalCloseButton />
                <ModalBody d="flex" flexDirection="column">
                    <Text fontFamily="Montserrat" margin="15px 0px">Nome:</Text>
                    <Input fontFamily="Montserrat" placeholder="Ex: Candy" value={name} onChange={(e) => setName(e.target.value)}/>
                </ModalBody>
                <ModalFooter>
                    <Button isLoading={loading} colorScheme="blue" onClick={createCategory} rightIcon={<AiOutlinePlus/>}>
                        Criar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  );
}

export default CreateCategory;