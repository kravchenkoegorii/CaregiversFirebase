import React from "react";
import { Edit } from "react-admin";
import RequestApplyDialog from "./RequestApplyDialog";
import { RequestEditProps } from "./types";

const RequestEdit = ({ request, open, onClose, resource }: RequestEditProps) => {

  return (
    <Edit id={request.id} title={`: Request #${request.id}`} resource={resource}>
      <RequestApplyDialog open={open} onClose={onClose} request={request} />
    </Edit>
  );
};

export default RequestEdit;
