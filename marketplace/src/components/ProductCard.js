import React, {useState} from 'react';
import {Box, Input, Text, Select as Chelect} from '@chakra-ui/react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { useDisclosure } from '@chakra-ui/hooks';
import { Button } from '@chakra-ui/button';
import {MdDelete } from 'react-icons/md';
import Select from 'react-select';
import {FaPencilAlt} from 'react-icons/fa';
import makeAnimated from 'react-select/animated';
import {deleteAsset, updateAsset} from '../services/invoke';


function ProductCard({productName, productPrice, onClick, selectedProduct, vendors, categories}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const animatedComponents = makeAnimated();
  const categoriesOptions = categories.map((category) => {
    return {value: category['@key'], label: category.name}
  });
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newSeller, setNewSeller] = useState('')
  const [newCategories, setNewCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleClick = async () => {
      onClick();
      onOpen();
  }

  const handleEdit = async () => {
      setLoading(true);
      const name = newName !== '' ? newName : null;
      const price = newPrice !== '' ? Number(newPrice) : null;
      const seller = newSeller !== '' ? { '@assetType': 'seller', '@key': newSeller } : null;
      const newerCategory = newCategories.length > 0 ? 
      newCategories.map((category) => {
          return { '@assetType': 'category', '@key': category.value }
      }) : null;

      const infoToUpdate = {
        "update": {
            "@assetType": "product",
            "code": selectedProduct.code,
            name,
            price,
            categories: newerCategory,
            soldBy: seller
        }
      }

      const updated = await updateAsset(infoToUpdate);
      setLoading(false);
      if(updated){
        window.location.reload();
      }
      else { 
        alert("Erro ao atualizar produto");
      }
  }

  const handleDelete = async () => {
        setIsLoading(true);
        const infoToDelete = {
            'key': {
                '@assetType': 'product',
                'code': selectedProduct.code
            }
        }
        const deleted = await deleteAsset(infoToDelete);
        setIsLoading(false);
        if(deleted) {
            window.location.reload();
        }
        else {
            alert("Erro ao deletar produto");
        }
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
                <ModalHeader fontFamily="Montserrat" fontWeight="bold" fontSize="3xl">Informações do Produto</ModalHeader>
                <ModalCloseButton />
                <ModalBody d="flex" flexDirection="column">
                    <Text fontSize="3xl" fontFamily="Montserrat">{selectedProduct.name}</Text>
                    <Text fontSize="2xl"fontFamily="Montserrat">R$ {selectedProduct.price}</Text>
                    <Text fontWeight="bold"fontFamily="Montserrat">Vendido por:</Text>
                    <Text fontFamily="Montserrat" fontWeight="light">{selectedProduct.soldBy.name}</Text>
                    <Text fontFamily="Montserrat" fontWeight="light">{selectedProduct.soldBy.address}</Text>
                    <Text fontWeight="bold" fontFamily="Montserrat">Categorias:</Text>
                    {selectedProduct.categories ? selectedProduct.categories.map((category) => (
                        <Text key={category['@key']} fontFamily="Montserrat" fontWeight="light">{category.name}</Text>
                    )) : <Text fontFamily="Montserrat" fontWeight="light">Sem categorias</Text>}
                    <Input 
                        variant="flushed" 
                        placeholder="Editar nome do produto" 
                        margin="5px 0px" 
                        value={newName} 
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <Input 
                        variant="flushed" 
                        placeholder="Editar preco do produto" 
                        margin="5px 0px"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                    />
                    <Chelect placeholder="Editar vendedor" color="gray" onChange={(e) => setNewSeller(e.target.value)} margin="5px 0px">
                        {vendors.map((vendor, index) => (
                            <option key={index} value={vendor['@key']}>{vendor.name}</option>
                        ))}
                    </Chelect>
                    <Select 
                        options={categoriesOptions} 
                        isMulti 
                        closeMenuOnSelect={false} 
                        components={animatedComponents} 
                        placeholder="Selecione as categorias"
                        onChange={(e) => setNewCategories(e)}
                    />

                </ModalBody>
                <ModalFooter>
                    <Button isLoading={loading} colorScheme="blue" onClick={() => handleEdit()} rightIcon={<FaPencilAlt/>}>
                    Editar
                    </Button>
                    <Button isLoading={isLoading} colorScheme="red" onClick={() => handleDelete()} rightIcon={<MdDelete/>}>
                        Deletar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  );
}

export default ProductCard;