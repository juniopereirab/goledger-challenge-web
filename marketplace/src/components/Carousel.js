import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import VendorCard from './VendorCard';
import api from '../api';

function Carousel() {
    const [settings] = useState({
        dots: true,
        infinite: false,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 1
    });
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        async function getVendorInfo () {
            const response = await api.post('/query/search', {
                query: {
                    selector: {
                        "@assetType": "seller"
                    }
                }
            });
            setVendors(response['data'].result);
        }

        getVendorInfo();
    }, [])
    return (
        <Slider {...settings}>
            {vendors.length > 0 ? vendors.map((vendor) => (
                <VendorCard name={vendor.name} address={vendor.address} key={vendor['@key']} />
            )) : null}
        </Slider>
    );
}

export default Carousel;