import React, {useState, useEffect, useCallback} from 'react';
import NavBar from '../components/Navbar';
import api from '../api';
import { Center, Grid, Text } from '@chakra-ui/layout';
import { Fab } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { TiPlus } from 'react-icons/ti';
import Slider from 'react-slick';
import VendorCard from '../components/VendorCard';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';

import CreateProduct from '../components/CreateProduct';
import CreateVendor from '../components/CreateVendor';
import CreateCategory from '../components/CreateCategory';

function Homepage() {
    const productData = {
        name: "",
        price: 0,
        categories: [],
        soldBy: {
            name: "",
            address: ""
        }
    }
    
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

    const [selectedProduct, setSelectedProduct] = useState(productData);


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

    const showProductInfo = async (code) => {
        const response = await api.post('/query/readAsset', {
            'key': {
                '@assetType': 'product',
                'code': code
            }
        });
        setSelectedProduct(response.data);
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
                        onClick={() => showProductInfo(product.code)}
                        isLoading={isLoading}
                        onDelete={() => console.log('deletou')}
                        selectedProduct={selectedProduct}
                        vendors={vendors}
                        categories={categories}
                    />
                )) : null}
            </Grid>
        </Center>
        <Fab
            mainButtonStyles={{background:"#8F7FF0"}}
            icon={<TiPlus/>}
            alwaysShowTitle={true}
        >
            <CreateProduct text="Adicionar produto"/>
            <CreateVendor text="Adicionar vendedor"/>
            <CreateCategory text="Adicionar categoria"/>
        </Fab>    
      </>   
  );
}

export default Homepage;