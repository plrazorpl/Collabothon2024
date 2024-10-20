import { Alert, Chip, Typography, Divider } from "@mui/material";
import { Grid } from "@mui/system";
import React from "react";
import AlertDetails from "./AlertDetails";
import { useDispatch } from "react-redux";
import { loadSelectedNotification } from "../slices/notificationsList";

export default function AlertRow(props) {
  const { notification = {} } = props;
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    dispatch(loadSelectedNotification({ id: notification?.id }));
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid
        onClick={handleOpen}
        container
        sx={{
          minHeight: "20px",
          //padding: "2px 4px 2px 4px",
          justifyContent: "center",
          alignItems: "top",
          backgroundColor: notification?.read ? "inherit" : "#fafafa",
          borderLeft: notification?.read
            ? "4px solid #fff"
            : "4px solid #D32F2Fdd",
          cursor: "pointer",
        }}
      >
        <Grid
          size={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            sx={{
              justifyContent: "center",
              alignItems: "center",
              //border: "1px solid black",
              paddingTop: "2px",
              paddingBottom: "2px",
            }}
            spacing={0}
          >
            <Grid>
              {/** THI IS TYPE : automtic / manual / external*/}
              {notification.archived === false && (
                <Chip
                  color="error"
                  size="small"
                  label={`Due ${notification?.due ?? "-"} days`}
                  sx={{
                    borderRadius: "2px",
                    opacity: "92%",
                    backgroundColor: "#D32F2Fdd",
                  }}
                />
              )}
            </Grid>
            <Grid sx={{ marginTop: "4px", marginBottom: "2px" }}>
              {notification?.category === "automatic" && (
                <Alert
                  severity="success"
                  sx={{
                    paddingLeft: "26px",
                    backgroundColor: "#fafafa",
                    border: "1px solid #e8e8e8",
                  }}
                />
              )}

              {notification?.category === "conditional" && (
                <Alert
                  severity="warning"
                  sx={{
                    paddingLeft: "26px",
                    backgroundColor: "#fafafa",
                    border: "1px solid #e8e8e8",
                  }}
                />
              )}

              {notification?.category === "external" && (
                <Alert
                  severity="info"
                  sx={{
                    paddingLeft: "26px",
                    backgroundColor: "#fafafa",
                    border: "1px solid #e8e8e8",
                  }}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid size={8}>
          <Grid container direction="column">
            <Grid container sx={{ marginBottom: "0px" }}>
              <Grid size={10}>
                {/* <Typography
                  sx={{ fontWeight: "400", fontSize: "8pt", color: "#999" }}
                >
                  Fix term deposits
                </Typography> */}
                {/** THI IS cathegory*/}
                <Chip
                  style={{ backgroundColor: "#FFD70066", color: "#555" }}
                  label={notification?.type}
                  size="small"
                  sx={{ borderRadius: "2px" }}
                />
              </Grid>
            </Grid>

            <Grid>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: notification?.read ? "300" : "bold",
                  fontSize: "14pt",
                  color: "#002E3C",
                }}
              >
                {/** TITLE CARD */}
                {notification?.title.length > 50
                  ? notification?.title.substr(0, 50) + "..."
                  : notification?.title}
              </Typography>
            </Grid>
            <Grid>
              <Typography
                variant="body2"
                sx={{ fontWeight: "300", fontSize: "10pt", color: "#002E3Cbb" }}
              >
                {/** DESCRIPTION -> cut of after 40/50 letters */}
                {notification?.description.length > 75
                  ? notification?.description.substr(0, 75) + " .."
                  : notification?.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          size={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            direction="column"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid sx={{ marginBottom: "1rem" }}>
              {/** THI IS DATE OF PUBLICATION IF EXSISRS */}
              <Typography
                variant="body2"
                sx={{
                  fontWeight: notification?.read ? "200" : "bold",
                  fontSize: "8pt",
                  color: "#999",
                }}
              >
                2024-12-12
              </Typography>
            </Grid>
            {/* <Grid>
              <IconButton
                aria-label="delete"
                color="primary"
                onClick={handleOpen}
                sx={{ color: "#002E3C" }}
              >
                <Search />
              </IconButton>
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
      <Divider flexItem sx={{ marginBottom: "4px" }} />

      <AlertDetails handleOpen={open} closeAction={handleClose} />
    </>
  );
}
