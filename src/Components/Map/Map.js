import * as React from "react";

import { useGoogleMaps } from "react-hook-google-maps";

const Map = () => {
  const { ref, map, google } = useGoogleMaps(
    "AIzaSyAOBhEiODtZDsgTx3hG5wOwHDXei31OhWY",
    {
      center: { lat: 21.433920, lng: 91.987030 },
      zoom: 3,
    },
  );
  console.log(map);
  console.log(google);
  return <div ref={ref} style={{ width: '500px', height: '630px', marginLeft: '20px' }} />;
};

export default Map;