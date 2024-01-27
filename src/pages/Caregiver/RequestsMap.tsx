import React, { useState } from "react";
import { useGetList, Title, useResourceContext, SortPayload, Loading, PaginationPayload } from "react-admin";
import { DataProviderResources, RequestStatus } from "../../abstracts/enums";
import GoogleMapsComponent from "../../components/google-maps-component";
import RequestEdit from "./RequestEdit";
import { Card } from "@mui/material";

const RequestsMap = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [req, setReq] = useState(undefined);
  const [currentDate, setCurrentDate] = useState(new Date());
  const resource = DataProviderResources.REQUESTS;

  const filter = { date: { op: ">", value: currentDate }, caregiverId: "" , status: RequestStatus.CREATED };
  const sort: SortPayload = { field: "date", order: "ASC" };
  const pagination: PaginationPayload = {page: 0, perPage: 0};
  const {data: availableRequests, isLoading, refetch } = useGetList(resource, { filter, sort, pagination });

  if (isLoading) {
    return <Loading />;
  }

  const onMarkerClick = (request) => {
    setReq(request);
    setOpenDialog(true);
  };

  const onDialogClose = async (needToReload: boolean) => {
    setOpenDialog(false);
    setReq(undefined);

    if (needToReload) {
      setCurrentDate(new Date());
    } else {
      await refetch();
    }
  };

  return (
    <>
      <GoogleMapsComponent requests={availableRequests} onMarkerClick={(data) => onMarkerClick(data)} />
      {req && <RequestEdit resource={resource} open={openDialog} onClose={onDialogClose} request={req} />}
    </>
  );
};

const RequestsMapShow = () => {
  const resource = useResourceContext();

  return (
    <>
      <Title defaultTitle={resource} />
      <Card>
        <RequestsMap />
      </Card>
    </>
  );
};

export default RequestsMapShow;
