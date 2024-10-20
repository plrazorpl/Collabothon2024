import {
  Typography,
  Card,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Tooltip,
  Alert,
} from "@mui/material";
import { Grid } from "@mui/system";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import { useDispatch } from "react-redux";
import { notifyError, notifyInfo } from "../actualAlert/actualAlertSlice";
import EditAlertForm from "./EditAlertForm";

function AlertConfigurationType({
  configuration,
  configs,
  setConfigs,
  handleOpenSendModal,
}) {
  const dispatch = useDispatch();

  const [alertConfiguration, setAlertConfiguration] =
    React.useState(configuration);

  const [newOpen, setOpen] = React.useState(false);

  return (
    <Card
      container
      sx={{
        display: "flex",
        alignItems: "center",
        postion: "absolute",
        width: 550,
        border: "1px solid #ddd",
        marginTop: "2px",
      }}
    >
      <Accordion
        sx={{
          width: "100%",
          "&:hover": {
            color: "#ffd700",
            backgroundColor: "#002e3cbb",
          },
        }}
      >
        <AccordionSummary>
          <Grid
            sx={{
              display: "flex",
              padding: 1,
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                textAlign: "left",
                fontFamily: "bold",
              }}
              size="auto"
            >
              {alertConfiguration.title}
            </Typography>
            <Grid size="auto" sx={{ justifyContent: "space-between" }}>
              <Tooltip title="Delete">
                <DeleteForeverIcon
                  sx={{ paddingRight: 1, color: "#002e3c" }}
                  title="Remove configuration"
                  onClick={(e) => {
                    setConfigs(
                      configs.filter((a) => a.title !== configuration.title)
                    );
                    e.stopPropagation();
                    dispatch(notifyInfo("Configuration has been removed"));
                  }}
                />
              </Tooltip>
              <Tooltip title="Edit">
                <EditIcon
                  sx={{ paddingRight: 1, color: "#002e3c" }}
                  title="Edit configuration"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(true);
                  }}
                />
              </Tooltip>
              <Tooltip title="Share configuration">
                <ScreenShareIcon
                  sx={{ color: "#002e3c" }}
                  title="Edit configuration"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenSendModal();
                    //dispatch(notifyError("Sorry, just proof of concept"));
                  }}
                />
              </Tooltip>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Alert variant="outlined" severity="error" sx={{ width: "100%" }}>
              <Grid>
                <Typography display="inline" sx={{ fontWeight: "bold" }}>
                  Trigger Condition
                </Typography>

                <Typography
                  display="inline"
                  sx={{ marginLeft: "2rem", textAlign: "right" }}
                >
                  {alertConfiguration.triggerCondition}
                </Typography>
              </Grid>
            </Alert>
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "left",
              paddingBottom: 1,
            }}
          >
            <Grid size={6}>
              <Typography sx={{ fontWeight: "bold" }}>Priority</Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                {alertConfiguration.priority}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "left",
              paddingBottom: 1,
            }}
          >
            <Grid size={6}>
              <Typography sx={{ fontWeight: "bold" }}>Type</Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                {alertConfiguration.type}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "left",
              paddingBottom: 1,
            }}
          >
            <Grid size={6}>
              <Typography sx={{ fontWeight: "bold" }}>Subtype</Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                {alertConfiguration.subtype}
              </Typography>
            </Grid>
          </Grid>
          {/* <Grid
            container
            sx={{
              display: "flex",
              alignItems: "left",
              paddingBottom: 1,
            }}
          >
            <Grid size={6}>
              <Typography sx={{ fontWeight: "bold" }}>
                Trigger Condition
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                {alertConfiguration.triggerCondition}
              </Typography>
            </Grid>
          </Grid> */}
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "left",
              paddingBottom: 1,
            }}
          >
            <Grid size={6}>
              <Typography sx={{ fontWeight: "bold" }}>Client</Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                {alertConfiguration.client}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "left",
            }}
          >
            <Grid size={6}>
              <Typography sx={{ fontWeight: "bold" }}>Url</Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                {alertConfiguration.url}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "left",
              paddingBottom: 1,
            }}
          >
            <Grid size={6}>
              <Typography sx={{ fontWeight: "bold" }}>Description</Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                {alertConfiguration.description}
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <EditAlertForm
        handleOpen={newOpen}
        handleClose={() => setOpen(false)}
        alertConfiguration={alertConfiguration}
        setAlertConfiguration={setAlertConfiguration}
      />
    </Card>
  );
}

export default AlertConfigurationType;
