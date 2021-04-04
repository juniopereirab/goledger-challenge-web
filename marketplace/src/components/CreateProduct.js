import React, { useState } from 'react';
import { Action } from 'react-tiny-fab';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { useDisclosure } from '@chakra-ui/hooks';
import { Button } from '@chakra-ui/button';
import { MdAddShoppingCart } from 'react-icons/md';
import {Input, Select as Chelect} from '@chakra-ui/react';
import Select from 'react-select';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import makeAnimated from 'react-select/animated';
import api from '../api';

function CreateProduct({vendors, categories}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const animatedComponents = makeAnimated();
  const categoriesOptions = categories.map((category) => {
    return {value: category['@key'], label: category.name}
  });
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [vendor, setVendor] = useState('');
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const createProduct = async () => {
    setLoading(true);
    if(name && price && vendor && category.length > 0){
      const code = String(Math.floor((Math.random() * 10000000000) + 1));
      const seller = {"@assetType": "seller", "@key": vendor};
      const newerCategory = category.map((category) => {
          return { '@assetType': 'category', '@key': category.value }
      });

      await api.post('/invoke/createAsset', {
        'asset': [
          {
            "@assetType": "product",
            code,
            name,
            price: Number(price),
            soldBy: seller,
            categories: newerCategory
          }
        ]
      });
    }
    setLoading(false);
    window.location.reload();
  }

  return (
      <>
        <Action
            onClick={onOpen}
            style={{background:"#B3A8F4"}}
        >
            <MdAddShoppingCart/>
        </Action>
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader fontFamily="Montserrat" fontWeight="bold" fontSize="2xl">Criar novo produto</ModalHeader>
                <ModalCloseButton />
                <ModalBody d="flex" flexDirection="column">
                  <FormControl isRequired>
                      <FormLabel fontFamily="Montserrat">Nome:</FormLabel>
                      <Input fontFamily="Montserrat" placeholder="Ex: Princesa Jujuba" value={name} onChange={(e) => setName(e.target.value)}/>
                      <FormLabel fontFamily="Montserrat" marginTop="10px">Preco:</FormLabel>
                      <Input fontFamily="Montserrat" placeholder="Ex: Rua Doce, 12" value={price} onChange={(e) => setPrice(e.target.value)} isRequired={true}/>
                      <FormLabel fontFamily="Montserrat" marginTop="10px">Vendedor:</FormLabel>
                      <Chelect placeholder="Selecione um vendedor" color="gray" onChange={(e) => setVendor(e.target.value)} margin="5px 0px">
                          {vendors.map((vendor, index) => (
                              <option key={index} value={vendor['@key']}>{vendor.name}</option>
                          ))}
                      </Chelect>
                      <FormLabel fontFamily="Montserrat" marginTop="10px">Categorias:</FormLabel>
                      <Select 
                        options={categoriesOptions}
                        isMulti 
                        closeMenuOnSelect={false} 
                        components={animatedComponents} 
                        placeholder="Selecione as categorias"
                        onChange={(e) => setCategory(e)}
                      />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button isLoading={loading} colorScheme="blue" onClick={createProduct} rightIcon={<AiOutlinePlusCircle/>}>
                        Criar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
      </>
  );
}

export default CreateProduct;