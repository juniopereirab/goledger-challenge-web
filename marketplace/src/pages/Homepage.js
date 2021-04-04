import React, {useState, useEffect, useCallback} from 'react';
import NavBar from '../components/Navbar';
import api from '../api';
import { Box, Center, Grid, Text } from '@chakra-ui/layout';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { BsPersonPlusFill } from 'react-icons/bs';
import { MdAddShoppingCart } from 'react-icons/md';
import { FaFilter } from 'react-icons/fa';
import { TiPlus } from 'react-icons/ti';
import Slider from 'react-slick';
import VendorCard from '../components/VendorCard';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';


function Homepage() {
    
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

    const [categoryName, setCategoryName] = useState("");

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
    }

    const showCategoryInfo = (category) => {
        setCategoryName(category.name);
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
        setIsLoading(false);
        window.location.reload();
    }

    const deleteCategory = async () => {
        setIsLoading(true);
        await api.delete('/invoke/deleteAsset', {
            data: {
                'key': {
                    '@assetType': 'category',
                    name: categoryName
                }
            }
        });
        setIsLoading(false);
        window.location.reload();
    }


  return (
      <>
        <NavBar/>
        <header>
            <Text fontSize='4xl' fontWeight="bold" fontFamily='Montserrat' margin='15px'>Vendedores</Text>
            <Slider {...settings}>
                {vendors.length > 0 ? vendors.map((vendor) => (
                    <VendorCard 
                        key={vendor['@key']} 
                        onClick={() => showVendorInfo(vendor)} 
                        vendor={vendor}
                        vendorName={vendorName}
                        vendorAddress={vendorAddress}
                        vendorCNPJ={vendorCNPJ}
                        vendorJoined={vendorJoined}
                        isLoadind={isLoading}
                        onDelete={() => deleteVendor()}
                    />
                )) : null}
            </Slider>
            <Text fontSize='4xl' fontWeight="bold" fontFamily='Montserrat' margin='15px'>Categorias</Text>
            <Center>
                {categories.length > 0 ? categories.map((category) => (
                    <CategoryCard 
                        category={category} 
                        key={category['@key']} 
                        onClick={() => showCategoryInfo(category)} 
                        category={category}
                        categoryName={categoryName}
                        isLoading={isLoading}
                        onDelete={() => deleteCategory()}
                    />
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
      </>   
  );
}

export default Homepage;