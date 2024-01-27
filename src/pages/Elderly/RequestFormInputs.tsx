import React, { useState } from "react";
import {
  DateTimeInput,
  required,
  SelectArrayInput,
  SimpleForm,
  TextInput, useCreateContext, useNotify,
  useRecordContext
} from "react-admin";
import GooglePlacesAutocomplete from "../../components/google-autocomplete-component";
import { RequestStatus } from "../../abstracts/enums";
import { REQUEST_CHOICES } from "../../constants";

const RequestFormInputs = () => {
  const record = useRecordContext();
  const { save: saveOnCreate } = useCreateContext();

  const [address, setAddress] = useState();

  const notify = useNotify();

  const onSubmit = (data) => {
    if (!address) {
      notify("Address is required!", { type: "error" });
      return;
    }

    data.address = address;
    data.status = RequestStatus.CREATED;
    data.caregiverId = "";

    if (!data.comment) {
      data.comment = "";
    }

    saveOnCreate(data);
  };

  const onSelectPlace = (place) => {
    setAddress(place.formatted_address);
  };

  return (
    <SimpleForm record={record} onSubmit={onSubmit}>

      <GooglePlacesAutocomplete onSelectPlace={onSelectPlace} />

      <DateTimeInput
        source="date"
        label="Date for the request"
        validate={required()}
      />

      <SelectArrayInput
        label="Needings"
        source="needings"
        choices={REQUEST_CHOICES}
        optionText="name"
        optionValue="id"
        validate={required()}
      />

      <TextInput
        source="comment"
        label="Comment"
        type="text"
        multiline
      />
    </SimpleForm>
  );
};

export default RequestFormInputs;
