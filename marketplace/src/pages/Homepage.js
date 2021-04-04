import React, {useState, useEffect} from 'react';
import NavBar from '../components/Navbar';
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

import {getAsset, getProductByCode} from '../services/query';

function Homepage() {
    const mock = {
        name: "",
        price: 0,
        categories: [],
        soldBy: {
            name: "",
            address: ""
        }
    }

    const [settings] = useState({
        dots: true,
        infinite: false,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 1
    });
    
    const [vendors, setVendors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [vendorName, setVendorName] = useState("");
    const [vendorAddress, setVendorAddress] = useState("");
    const [vendorCNPJ, setVendorCPNJ] = useState("");
    const [vendorJoined, setVendorJoined] = useState("");

    const [categoryName, setCategoryName] = useState("");

    const [selectedProduct, setSelectedProduct] = useState(mock);


    useEffect(() => {
        async function getHeaderInfo () {
            const category = await getAsset("category")
            const vendor = await getAsset("seller")
            const product = await getAsset("product")

            
            setProducts(product);
            setVendors(vendor);
            setCategories(category);
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
        const product = await getProductByCode(code);
        setSelectedProduct(product);
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
            <CreateProduct text="Adicionar produto" vendors={vendors} categories={categories}/>
            <CreateVendor text="Adicionar vendedor"/>
            <CreateCategory text="Adicionar categoria"/>
        </Fab>    
      </>   
  );
}

export default Homepage;