import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { useNotify, useUpdate } from "react-admin";
import { DataProviderResources, Needings, RequestStatus } from "../../abstracts/enums";
import { RequestApplyProps } from "./types";
import CloseIcon from "@mui/icons-material/Close";
import { StyledIconButton, StyledTypography } from "./components";

const RequestApplyDialog = ({ request, open, onClose }: RequestApplyProps) => {
  const [update] = useUpdate();
  const notify = useNotify();

  const onApply = async (data) => {
    const previousData = { ...data };
    data.caregiverId = localStorage.getItem("userId");
    data.status = RequestStatus.ACCEPTED;
    if (new Date() > data.date) {
      notify("The request you tried to apply was expired", {type: "error"});
      return onClose(true);
    }

    await update(DataProviderResources.REQUESTS, { id: data.id, data, previousData }, {
      onSuccess: () => {
        notify("New request was applied", { type: "success" });
        onClose(false);
      }
    });


  };

  const getEnumValue = (key) => Needings[key] || key;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Request Details
        <StyledIconButton aria-label="close" onClick={() => onClose(false)}>
          <CloseIcon />
        </StyledIconButton>
      </DialogTitle>
      <DialogContent>
        <StyledTypography>Needings</StyledTypography>
        <List>
          {request?.needings.map((key, index) => (
            <ListItem key={index} sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontSize: "0.9rem" }}>{getEnumValue(key)}</Typography>
            </ListItem>
          ))}
        </List>

        <StyledTypography>Date</StyledTypography>
        <Typography>{request.date.toString()}</Typography>

        <StyledTypography>Address</StyledTypography>
        <Typography>{request.address}</Typography>

        <StyledTypography>Status</StyledTypography>
        <Typography>{request.status}</Typography>

        <StyledTypography>Comment</StyledTypography>
        <Typography>{request.comment}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onApply(request)} color="primary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestApplyDialog;
