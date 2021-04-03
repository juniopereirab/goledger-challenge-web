import React from 'react';
import '../styles/VendorCard.css'

function VendorCard({vendor, onClick}) {
  return (
      <div className="vendorCard" onClick={onClick}>
          <h2 id="vendorName">{vendor.name}</h2>
          <span id="vendorAddress">{vendor.address}</span>
      </div>
  );
}

export default VendorCard;