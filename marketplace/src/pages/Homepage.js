import React, {useState, useEffect, useCallback} from 'react';
import NavBar from '../components/Navbar';
import api from '../api';
import { Box, Center, Grid, Text } from '@chakra-ui/layout';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { BsPersonPlusFill } from 'react-icons/bs';
import { MdAddShoppingCart, MdDelete } from 'react-icons/md';
import { FaFilter } from 'react-icons/fa';
import { TiPlus } from 'react-icons/ti';
import Slider from 'react-slick';
import VendorCard from '../components/VendorCard';
import CategoryCard from '../components/CategoryCard';
import { useDisclosure } from '@chakra-ui/hooks';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Button } from '@chakra-ui/button';


function Homepage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [vendors, setVendors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [settings] = useState({
        dots: true,
        infinite: false,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 1
    });

    const [vendorName, setVendorName] = useState("");
    const [vendorAddress, setVendorAddress] = useState("");
    const [vendorCNPJ, setVendorCPNJ] = useState("");
    const [vendorJoined, setVendorJoined] = useState("");

    useEffect(() => {
        async function getHeaderInfo () {
            const category = await api.post('/query/search', {
                query: {
                    selector: {
                        "@assetType": "category"
                    }
                }
            });

            const vendor = await api.post('/query/search', {
                query: {
                    selector: {
                        "@assetType": "seller"
                    }
                }
            });

            const product = await api.post('/query/search', {
                query: {
                    selector: {
                        "@assetType": "product"
                    }
                }
            });

            setProducts(product['data'].result);
            setVendors(vendor['data'].result);
            setCategories(category['data'].result);
        }

        getHeaderInfo();
    }, []);

    const showVendorInfo = (vendor) => {
        setVendorName(vendor.name);
        setVendorAddress(vendor.address);
        setVendorCPNJ(vendor.cnpj);

        const date = new Date(vendor.dateJoined);
        setVendorJoined(date.toLocaleDateString());
        onOpen();
    }

    const deleteVendor = () => {
        console.log(vendorCNPJ);
        api.delete('/invoke/deleteAsset', 
        {
            "key": {
                '@assetType': 'seller',
                cnpj: vendorCNPJ
            }
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
        onClose();
    }


  return (
      <>
        <NavBar/>
        <header>
            <Slider {...settings}>
                {vendors.length > 0 ? vendors.map((vendor) => (
                    <VendorCard key={vendor['@key']} 
                        onClick={() => showVendorInfo(vendor)} vendor={vendor}/>
                )) : null}
            </Slider>
            <Center>
                {categories.length > 0 ? categories.map((category) => (
                    <CategoryCard category={category} key={category['@key']} onClick={() => setSelectedCategory(category['@key'])} category={category}/>
                )) : null}
            </Center>
        </header>
        <Center>
            <Grid templateColumns="repeat(4, 1fr)" gap={10}>
                {products.length > 0 ? products.map((product) => (
                    <Box 
                        w="400px" 
                        h="75px" 
                        bg="#69C7EF" 
                        borderRadius="5px" 
                        d="flex" 
                        alignItems="center" 
                        justifyContent="space-around"
                        border="1px solid #000"
                        boxShadow="2px 2px 10px rgba(0,0,0,.4)"
                        transition="0.4s all"
                        _hover={{
                            boxShadow: "0px 0px 0px"
                        }}
                        key={product['@key']}
                    > 
                        <Text fontSize="1.4rem">{product.name}</Text>
                        <Text fontSize="1.2rem">R$ {product.price}</Text>
                    </Box>
                )) : null}
            </Grid>
        </Center>
        <Fab
            mainButtonStyles={{background:"#8F7FF0"}}
            icon={<TiPlus/>}
            alwaysShowTitle={true}
        >
            <Action
                text="Adicionar produto"
                onClick={() => console.log("Adicionar produto")}
                style={{background:"#B3A8F4"}}
            >
                <MdAddShoppingCart/>
            </Action>
            <Action
                text="Adicionar vendedor"
                onClick={() => console.log("Adicionar vendedor")}
                style={{background:"#B3A8F4"}}
            >
                <BsPersonPlusFill/>
            </Action>
            <Action
                text="Adicionar categoria"
                onClick={() => console.log("Adicionar categoria")}
                style={{background:"#B3A8F4"}}
            >
                <FaFilter/>
            </Action>
        </Fab>

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
                    <Button colorScheme="red" onClick={() => deleteVendor()} rightIcon={<MdDelete/>}>
                        Deletar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
      </>   
  );
}

export default Homepage;