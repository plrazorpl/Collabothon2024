import React from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { Grid } from "@mui/system";
import { useDispatch } from "react-redux";
import { notifyInfo } from "../actualAlert/actualAlertSlice";

function EditAlertForm({
  handleOpen,
  handleClose,
  alertConfiguration,
  setAlertConfiguration,
}) {
  const [title, setTitle] = React.useState(alertConfiguration.title);
  const [priority, setPriority] = React.useState(alertConfiguration.priority);
  const [type, setType] = React.useState(alertConfiguration.type);
  const [subtype, setSubtype] = React.useState(alertConfiguration.subtype);
  const [triggerCondition, setTriggerCondition] = React.useState(
    alertConfiguration.triggerCondition
  );
  const [client, setClient] = React.useState(alertConfiguration.client);
  const [description, setDescription] = React.useState(
    alertConfiguration.description
  );
  const [url, setUrl] = React.useState(alertConfiguration.url);

  const dispatch = useDispatch();

  return (
    <Drawer
      anchor="right"
      open={handleOpen}
      onClose={handleClose}
      PaperProps={{ sx: { width: 450 } }}
    >
      <Box>
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#002e3c",
            borderRadius: "4px 4px 0px 0px",
            padding: 2,
            marginBottom: 2,
          }}
        >
          <Typography
            sx={{
              variant: "title",
              fontSize: 30,
              fontFamily: "bold",
              color: "#ffd700",
            }}
          >
            Edit notification
          </Typography>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 1,
          }}
        >
          <TextField
            required
            id="outlined-basic"
            label="title"
            variant="outlined"
            value={title}
            sx={{ width: "80%" }}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 1,
          }}
        >
          <FormControl required sx={{ width: "80%" }}>
            <InputLabel>Priority</InputLabel>
            <Select
              label="Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value={"urgent"}>urgent</MenuItem>
              <MenuItem value={"high"}>high</MenuItem>
              <MenuItem value={"medium"}>medium</MenuItem>
              <MenuItem value={"minor"}>minor</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 1,
          }}
        >
          <FormControl value={type} required sx={{ width: "80%" }}>
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={"financial"}>financial</MenuItem>
              <MenuItem value={"approval"}>approval</MenuItem>
              <MenuItem value={"security"}>security</MenuItem>
              <MenuItem value={"market alert"}>market alert</MenuItem>
              <MenuItem value={"compliance"}>compliance</MenuItem>
              <MenuItem value={"regulatory"}>regulatory</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 1,
          }}
        >
          <FormControl value={subtype} required sx={{ width: "80%" }}>
            <InputLabel>Subtype</InputLabel>
            <Select
              label="Subtype"
              value={subtype}
              onChange={(e) => setSubtype(e.target.value)}
            >
              <MenuItem value={"loan"}>loan</MenuItem>
              <MenuItem value={"payment"}>payment</MenuItem>
              <MenuItem value={"stock change"}>stock change</MenuItem>
              <MenuItem value={"market alert"}>market alert</MenuItem>
              <MenuItem value={"compliance"}>compliance</MenuItem>
              <MenuItem value={"regulatory"}>regulatory</MenuItem>
              <MenuItem value={"--||--"}>--||--</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 1,
          }}
        >
          <TextField
            id="outlined-basic"
            label="trigger condition"
            variant="outlined"
            value={triggerCondition}
            sx={{ width: "80%" }}
            onChange={(e) => setTriggerCondition(e.target.value)}
          />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 1,
          }}
        >
          <TextField
            id="outlined-basic"
            label="Client"
            variant="outlined"
            value={client}
            sx={{ width: "80%" }}
            onChange={(e) => setClient(e.target.value)}
          />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 1,
          }}
        >
          <Textarea
            placeholder="Description..."
            minRows={2}
            value={description}
            sx={{ width: "80%" }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 1,
          }}
        >
          <Textarea
            placeholder="URL"
            minRows={2}
            value={url}
            sx={{ width: "80%" }}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            marginBottom: 4,
            width: "80%",
          }}
        >
          <Typography sx={{ fontSize: 12, paddingLeft: "15%" }}>
            * Mandatory fields
          </Typography>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: 1,
          }}
        >
          <Button
            variant="contained"
            disabled={!title || !priority || !type | !subtype}
            sx={{
              color: "#002e3c",
              backgroundColor: "#ffd700",
              fontWeight: "bold",
              minWidth: 100,
            }}
            onClick={() => {
              setAlertConfiguration({
                title: title,
                priority: priority,
                type: type,
                subtype: subtype,
                triggerCondition: triggerCondition,
                client: client,
                description: description,
                url: url,
              });
              dispatch(notifyInfo(title + " config has been edited"));
              handleClose();
            }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            sx={{
              color: "#002e3c",
              backgroundColor: "#ffd700",
              fontWeight: "bold",
              minWidth: 100,
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Grid>
      </Box>
    </Drawer>
  );
}

export default EditAlertForm;
