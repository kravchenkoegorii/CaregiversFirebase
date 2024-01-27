import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Input } from "./components";
import { AutocompleteProps } from "./types";

const GoogleAutocompleteComponent = ({ onSelectPlace }: AutocompleteProps) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (auto) => {
    setAutocomplete(auto);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      onSelectPlace(place);
    }
  };

  return (
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <Input type="text" placeholder="Enter address" />
      </Autocomplete>
  );
};

export default GoogleAutocompleteComponent;