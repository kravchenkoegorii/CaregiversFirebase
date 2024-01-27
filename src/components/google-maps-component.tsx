import React, { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { fromAddress, setKey } from "react-geocode";
import { googleApiKey, mapContainerStyle, mapOptions } from "../constants";
import { MapsProps } from "./types";

function GoogleMapsComponent({ requests, onMarkerClick }: MapsProps) {

  const [markers, setMarkers] = useState([]);

  const fetchCoordinates = async () => {
    if (!requests) {
      return [];
    }

    try {
      let index = 0;
      const markersWithCoordinates = [];

      for await (const request of requests) {
        const response = await fromAddress(request.address);
        const { lat, lng } = response.results[0].geometry.location;

        const res = {
          index,
          position: { lat, lng }
        };

        index += 1;

        markersWithCoordinates.push(res);
      }

      return markersWithCoordinates;
    } catch (error) {
      console.error("Error geocoding addresses:", error);
    }

    return [];
  };

  useEffect(() => {
    setKey(googleApiKey);
  }, []);

  useEffect(() => {
    fetchCoordinates()
      .then(markersWithCoordinates => setMarkers(markersWithCoordinates));

  }, [requests]);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={mapOptions.center}
      zoom={mapOptions.zoom}
    >
      {markers.map((marker) => (
        <Marker key={marker.index} position={marker.position}
                onClick={() => onMarkerClick(requests[marker.index])} />
      ))}
    </GoogleMap>
  );
}

export default React.memo(GoogleMapsComponent);
