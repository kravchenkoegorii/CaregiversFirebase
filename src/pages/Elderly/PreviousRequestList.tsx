import React from "react";
import {
  List,
  useGetIdentity,
  Loading,
  useResourceContext
} from "react-admin";
import { DataProviderResources } from "../../abstracts/enums";
import RequestListDataGrid from "../Common/RequestListDataGrid";

const PreviousRequestList = () => {
  const resource = useResourceContext();
  const { data: userIdentity, isLoading: isUserLoading } = useGetIdentity();

  if (isUserLoading) {
    return <Loading />;
  }

  const filter = { createdBy: userIdentity?.id, date: { op: "<", value: new Date() } };

  return (
    <List resource={DataProviderResources.REQUESTS}
          queryOptions={{ meta: filter }}
          sort={{ field: "date", order: "ASC" }}
          actions={null}>
      <RequestListDataGrid resourceName={resource} />
    </List>
  );
};

export default PreviousRequestList;