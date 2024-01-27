import React from "react";
import {
  List,
  useGetIdentity,
  Loading,
  useResourceContext, TopToolbar, CreateButton
} from "react-admin";
import { DataProviderResources } from "../../abstracts/enums";
import RequestListDataGrid from "../Common/RequestListDataGrid";

const ListActions = (props: { resourceName: string }) => (
  <TopToolbar>
    <CreateButton resource={props.resourceName} />
  </TopToolbar>
);

const RequestList = () => {
  const resource = useResourceContext();
  const { data: userIdentity, isLoading: isUserLoading } = useGetIdentity();

  if (isUserLoading) {
    return <Loading />;
  }

  const filter = { caregiverId: userIdentity?.id };

  return (
    <List actions={<ListActions resourceName={resource} />}
          resource={DataProviderResources.REQUESTS}
          queryOptions={{ meta: filter }}
          sort={{ field: "date", order: "ASC" }}>
      <RequestListDataGrid resourceName={resource} />
    </List>
  );
};

export default RequestList;