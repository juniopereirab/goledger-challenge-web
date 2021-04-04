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
import ProductCard from '../components/ProductCard';
import { Alert, AlertIcon } from '@chakra-ui/alert';


function Homepage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
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

    const deleteVendor = async () => {
        setIsLoading(true);
        await api.delete('/invoke/deleteAsset', { 
        data: {
            "key": {
                '@assetType': 'seller',
                cnpj: vendorCNPJ
            }}
        });
        onClose();
        window.location.reload();
    }


  return (
      <>
        <NavBar/>
        <header>
            <Text fontSize='4xl' fontWeight="bold" fontFamily='Montserrat' margin='15px'>Vendedores</Text>
            <Slider {...settings}>
                {vendors.length > 0 ? vendors.map((vendor) => (
                    <VendorCard key={vendor['@key']} 
                        onClick={() => showVendorInfo(vendor)} vendor={vendor}/>
                )) : null}
            </Slider>
            <Text fontSize='4xl' fontWeight="bold" fontFamily='Montserrat' margin='15px'>Categorias</Text>
            <Center>
                {categories.length > 0 ? categories.map((category) => (
                    <CategoryCard category={category} key={category['@key']} onClick={() => setSelectedCategory(category['@key'])} category={category}/>
                )) : null}
            </Center>
        </header>
        <Text fontSize='4xl' fontWeight="bold" fontFamily='Montserrat' margin='50px 15px'>Produtos</Text>
        <Center>
            <Grid templateColumns="repeat(4, 1fr)" gap={10}>
                {products.length > 0 ? products.map((product) => (
                    <ProductCard 
                        key={product['@key']}
                        productName={product.name}
                        productPrice={product.price}
                        onClick={() => console.log('clicou')}
                    />
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
                    <Button isLoading={isLoading} colorScheme="red" onClick={() => deleteVendor()} rightIcon={<MdDelete/>}>
                        Deletar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
      </>   
  );
}

export default Homepage;