import React, { useState } from 'react';
import './Map.css';

const Map = () => {
  const [isMapEnabled] = useState(false);

  return (
    <div className="map-container">
      {isMapEnabled ? (
        <div id="map"></div> 
      ) : (
        <div className="map-disabled-message">
          Map feature will be enabled soon!
        </div>
      )}
    </div>
  );
};

export default Map;
