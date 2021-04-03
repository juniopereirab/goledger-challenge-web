import React from 'react';
import '../styles/VendorCard.css'

function VendorCard({name, address}) {
  return (
      <div className="vendorCard">
          <h2 id="vendorName">{name}</h2>
          <span id="vendorAddress">{address}</span>
      </div>
  );
}

export default VendorCard;