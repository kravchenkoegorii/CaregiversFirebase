import React from "react";
import { Datagrid, DateField, ShowButton, TextField } from "react-admin";

const RequestListDataGrid = (props: {resourceName: string}) => {
  return (
    <Datagrid bulkActionButtons={false}>
      <TextField source="address" sortable={false} />
      <DateField
        source="date"
        showDate
        showTime
        sortable={false}
      />
      <ShowButton resource={props.resourceName} />
    </Datagrid>
  );
};

export default RequestListDataGrid;