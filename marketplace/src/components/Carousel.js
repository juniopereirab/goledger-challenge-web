import React, {useState} from 'react';
import Slider from 'react-slick';
import VendorCard from './VendorCard';

function Carousel({vendors}) {
    const [settings] = useState({
        dots: true,
        infinite: false,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 1
    });
    return (
        <Slider {...settings}>
            {vendors.length > 0 ? vendors.map((vendor) => (
                <VendorCard name={vendor.name} address={vendor.address} key={vendor['@key']} />
            )) : null}
        </Slider>
    );
}

export default Carousel;