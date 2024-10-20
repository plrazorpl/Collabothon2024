import { Badge, Button, IconButton, Paper, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import React from "react";

import SettingsIcon from "@mui/icons-material/Settings";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { FilterAlt } from "@mui/icons-material";
import AlertConfiguration from "./AlertConfiguration";
import WidgetFilterModal from "../modals/WidgetFilterModal";
import AlertRow from "./AlertRow";
import { useDispatch, useSelector } from "react-redux";
import { markAllAsRead } from "../slices/notificationsList";
import { notifyInfo } from "../actualAlert/actualAlertSlice";

export default function Widget({ showList = false }) {
  const { filteredNotifications = [] } = useSelector(
    (store) => store.notificationsList
  );

  const dispatch = useDispatch();

  //configuration
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  //filters
  const [filterOpen, setFilterOpen] = React.useState(false);
  const toggleFilter = (newOpen) => () => {
    setFilterOpen(newOpen);
  };

  const unreadNotifications = (notifs) => {
    let unread = 0;

    notifs.map((n) => {
      if (n.read === false) unread++;
      return unread;
    });

    return unread;
  };

  return (
    <>
      <Paper elevation={3}>
        <Grid
          container
          sx={{
            backgroundColor: "#f2f2f2",
            borderRadius: "4px 4px 0px 0px",
            padding: 1,
            marginBottom: "5px",
          }} //6042F7
        >
          <Grid size={6} p={1}>
            <Badge
              badgeContent={
                showList ? unreadNotifications(filteredNotifications) : 0
              }
              color="primary"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Typography sx={{ fontWeight: "bold", color: "#666" }}>
                Notifications
              </Typography>
            </Badge>
          </Grid>
          {/* <Grid size={4} p={1}>
          <Button variant="contained" color="error">
            {alerts.length} new alerts
          </Button>
        </Grid> */}
          <Grid
            size="grow"
            sx={{
              textAlign: "right",
              fontWeight: "bold",
              color: "#328050",
            }}
            p={1}
          >
            <Button
              startIcon={<DoneAllIcon />}
              color="#328050"
              size="small"
              variant="text"
              onClick={() => {
                dispatch(markAllAsRead());
                dispatch(notifyInfo("Marked all notifications as read"));
              }}
            >
              Mark all as read
            </Button>
          </Grid>
          <Grid p={0} sx={{ textAlign: "right" }}>
            <IconButton onClick={toggleFilter(true)}>
              <FilterAlt title="Filters configuration" aria-label="filters" />
            </IconButton>
            <IconButton
              onClick={toggleDrawer(true)}
              title="Alerts configuration"
              aria-label="settings"
            >
              <SettingsIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Paper
          elevation={3}
          sx={{ overflow: "auto", maxHeight: "500px", minHeight: "500px" }}
        >
          {showList ? (
            filteredNotifications.map((noty, index) => (
              <AlertRow key={index} notification={noty} />
            ))
          ) : (
            <AlertRow notification={filteredNotifications[1]} />
          )}
        </Paper>

        <Grid sx={{ minHeight: "2px" }} />
      </Paper>

      <WidgetFilterModal open={filterOpen} onClose={toggleFilter(false)} />
      <AlertConfiguration open={open} onClose={toggleDrawer(false)} />
    </>
  );
}
