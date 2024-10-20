import React from "react";
import { Typography, Switch, Drawer, Divider } from "@mui/material";
import { Grid } from "@mui/system";
import AlertConfigurationType from "./AlertConfigurationType";
import NewAlertForm from "./NewAlertForm";
import { alertConfigurationData } from "../data/AlertConfigurationData";
import { OpenInNewOff } from "@mui/icons-material";
import { alpha, styled } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";
import ShareAlertModal from "../modals/ShareAlertModal";

function AlertConfiguration(props) {
  const { open, onClose } = props;

  const [openSend, setOpenSend] = React.useState(false);

  const [newOpen, setOpen] = React.useState(false);

  const [alertConfigs, setAlertConfigs] = React.useState(
    alertConfigurationData.configurations
  );

  const YellowSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: yellow[600],
      "&:hover": {
        backgroundColor: alpha(yellow[600], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: yellow[600],
    },
  }));

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 550 } }}
    >
      <Grid container>
        <Grid
          size={12}
          sx={{
            padding: "20px",
            backgroundColor: "#002e3c",
          }}
        >
          <Typography
            sx={{ fontWeight: "bold", fontSize: "16pt", color: "#ffd700" }}
          >
            Custom Notifications
          </Typography>
        </Grid>
        <Grid
          container
          spacing={1}
          size={12}
          sx={{
            padding: "20px",
            backgroundColor: "#b5cef777",

            color: "#333",
            "&:hover": {
              color: "#2196F3",
              cursor: "pointer",
            },
          }}
          onClick={() => setOpen(true)}
        >
          <Grid>
            <OpenInNewOff />
          </Grid>
          <Grid>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "12pt", color: "inherit" }}
            >
              Add new Notification Case
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        {alertConfigs.map((configuration) => {
          return (
            <AlertConfigurationType
              configuration={configuration}
              configs={alertConfigs}
              setConfigs={setAlertConfigs}
              handleOpenSendModal={() => setOpenSend(true)}
            />
          );
        })}
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "left",
          height: "100%",
          justifyContent: "center",
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        <Grid size={10}>
          <Divider />
        </Grid>
        <Grid container>
          <Grid size={8}>
            <Typography sx={{ fontSize: 18, color: "black" }}>
              External Notifications (News)
            </Typography>
          </Grid>
          <Grid size={4}>
            <YellowSwitch defaultChecked sx={{ size: "70" }} />
          </Grid>
        </Grid>
      </Grid>

      <NewAlertForm
        handleOpen={newOpen}
        handleClose={() => setOpen(false)}
        configs={alertConfigs}
        setConfigs={setAlertConfigs}
      />

      <ShareAlertModal open={openSend} handleClose={() => setOpenSend(false)} />
    </Drawer>
  );
}

export default AlertConfiguration;
