import React from "react";
import {
  Drawer,
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
import { notifySuccess } from "../actualAlert/actualAlertSlice";

function NewAlertForm({ handleOpen, handleClose, configs, setConfigs }) {
  const [title, setTitle] = React.useState("Any payment from ZALANDO");
  const [priority, setPriority] = React.useState("medium");
  const [type, setType] = React.useState("financial");
  const [subtype, setSubtype] = React.useState("payment");
  const [triggerCondition, setTriggerCondition] = React.useState(
    "when payments number > 0"
  );
  const [client, setClient] = React.useState("Zalando Sp. Z.o.o");
  const [description, setDescription] = React.useState(`
    To provide you with an optimal website experience in particular, we 
    use cookies and web technologies with your consent for functional, 
    statistical, convenience and marketing purposes, as well as for the 
    display of personalized content.
  `);
  const [url, setUrl] = React.useState();
  //" https://www.commerzbank.de/group/"
  const dispatch = useDispatch();

  return (
    <Drawer
      anchor="right"
      open={handleOpen}
      onClose={handleClose}
      PaperProps={{ sx: { width: 450 } }}
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
            New custom notification
          </Typography>
        </Grid>
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
          sx={{ width: "80%" }}
          onChange={(e) => setTitle(e.target.value)}
          size="small"
          value={title}
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
          <InputLabel id="demo-simple-select-label" size="small">
            Priority
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={priority}
            label="Priority"
            onChange={(e) => setPriority(e.target.value)}
            size="small"
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
        <FormControl required sx={{ width: "80%" }}>
          <InputLabel id="demo-simple-select-label" size="small">
            Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value)}
            size="small"
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
        <FormControl required sx={{ width: "80%" }}>
          <InputLabel id="demo-simple-select-label" size="small">
            Subtype
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={subtype}
            label="Subtype"
            onChange={(e) => setSubtype(e.target.value)}
            size="small"
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
          sx={{ width: "80%" }}
          onChange={(e) => setTriggerCondition(e.target.value)}
          size="small"
          //defaultValue={"when payments number > 0"}
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
          sx={{ width: "80%" }}
          onChange={(e) => setClient(e.target.value)}
          size="small"
        ></TextField>
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
          sx={{ width: "80%" }}
          onChange={(e) => setDescription(e.target.value)}
        ></Textarea>
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
          sx={{ width: "80%" }}
          onChange={(e) => setUrl(e.target.value)}
          defaultValue={"https://www.commerzbank.de/group/"}
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
          disabled={!title || !priority || !type | !subtype}
          variant="contained"
          sx={{
            color: "#002e3c",
            backgroundColor: "#ffd700",
            fontWeight: "bold",
            minWidth: 100,
          }}
          onClick={() => {
            setConfigs([
              ...configs,
              {
                title: title,
                priority: priority,
                type: type,
                subtype: subtype,
                triggerCondition: triggerCondition,
                client: client,
                description: description,
                url: url,
              },
            ]);
            handleClose();
            dispatch(notifySuccess("New configuration has been created!"));
          }}
        >
          Save
        </Button>
        <Button
          variant="contained"
          sx={{
            color: "#fff",
            backgroundColor: "#D32F2Fcc",
            fontWeight: "bold",
            minWidth: 100,
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </Grid>
    </Drawer>
  );
}

export default NewAlertForm;
