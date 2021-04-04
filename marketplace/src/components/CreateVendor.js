import React, { useState } from 'react';
import { Action } from 'react-tiny-fab';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { useDisclosure } from '@chakra-ui/hooks';
import { Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { BsPersonPlusFill } from 'react-icons/bs';
import { Input } from '@chakra-ui/input';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { createAsset } from '../services/invoke';


function CreateVendor() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cnpj, setCNPJ] = useState('');


  const createVendor = async () => {
    setLoading(true);
    if(name && address && cnpj) {
        const date = new Date().toISOString();
        const infoToCreate = {
            'asset': [
                {
                    '@assetType': 'seller',
                    name,
                    address,
                    cnpj,
                    dateJoined: date
                }
            ]
        }
        const created = await createAsset(infoToCreate);
        setLoading(false);
        if(created){
            window.location.reload();
        }
        else {
            alert("Erro ao criar vendedor");
        }
    }
  }

  return (
    <>
        <Action
            onClick={onOpen}
            style={{background:"#B3A8F4"}}
        >
            <BsPersonPlusFill/>
        </Action>
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader fontFamily="Montserrat" fontWeight="bold" fontSize="2xl">Criar vendedor</ModalHeader>
                <ModalCloseButton />
                <ModalBody d="flex" flexDirection="column">
                    <FormControl isRequired>
                        <FormLabel fontFamily="Montserrat">Nome:</FormLabel>
                        <Input fontFamily="Montserrat" placeholder="Ex: Princesa Jujuba" value={name} onChange={(e) => setName(e.target.value)}/>
                        <FormLabel fontFamily="Montserrat" marginTop="20px">Endereco:</FormLabel>
                        <Input fontFamily="Montserrat" placeholder="Ex: Rua Doce, 12" value={address} onChange={(e) => setAddress(e.target.value)} isRequired={true}/>
                        <FormLabel fontFamily="Montserrat" marginTop="20px">CNPJ:</FormLabel>
                        <Input fontFamily="Montserrat" placeholder="Ex: 01.554.552/0001.20" value={cnpj} onChange={(e) => setCNPJ(e.target.value)}/>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button isLoading={loading} colorScheme="blue" onClick={createVendor} rightIcon={<AiOutlinePlusCircle/>}>
                        Criar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  );
}

export default CreateVendor;