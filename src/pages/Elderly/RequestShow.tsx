import { List, ListItem, Typography } from "@mui/material";
import React from "react";
import {
  DateField,
  Show,
  SimpleShowLayout,
  TextField,
  useRecordContext
} from "react-admin";
import { DataProviderResources, Needings } from "../../abstracts/enums";

const RequestShowLayout = () => {
  const record = useRecordContext();

  const getEnumValue = (key) => Needings[key] || key;

  return (
    <SimpleShowLayout record={record}>
      <Typography sx={{ fontSize: "0.9rem" }}>
        <Typography sx={{ color: "gray", fontSize: "0.7rem" }}>Needings</Typography>
        <List>
          {record?.needings.map((key, index) => (
            <ListItem key={index} sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontSize: "0.9rem" }}>{getEnumValue(key)}</Typography>
            </ListItem>
          ))}
        </List>
      </Typography>
      <DateField source="date" showDate={true} showTime={true} />
      <TextField source="address" />
      <TextField source="status" />
      <TextField source="comment" />
    </SimpleShowLayout>
  );
};

const RequestShow = () => {
  return (
    <Show resource={DataProviderResources.REQUESTS}>
      <RequestShowLayout />
    </Show>
  );
};

export default RequestShow;
