import {
  Avatar,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const JSONSAMPLE = {
  title: "Loan Payment Due Soon: #LPD-10-2024-001",
  description:
    "Your loan payment for account #LPD-10-2024-001 is due by 31.10.2024. Please ensure funds are available for the scheduled payment.",
  type: "Financial",
  frequency: "Notification 7 days before the due date",
  datetime: "2024-10-20T12:00:00",
  category: "automatic",
};

export default function ShareAlertModal(props) {
  const { open, handleClose } = props;

  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const email = formJson.email;
          console.log(email);
          handleClose();
        },
      }}
    >
      <DialogTitle>Share Configuration</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Here is the snipper for JSON configuration
        </DialogContentText>
        <Box component="pre">
          <Typography component="code" sx={{ lineBreak: "anywhere" }}>
            {JSON.stringify(JSONSAMPLE, null, 2)} {/* Pretty-printed JSON */}
          </Typography>
        </Box>

        <List
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem
                key={value}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(value)}
                    checked={checked.includes(value)}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${value + 1}`}
                      src={`https://avatar.iran.liara.run/public/4${value + 1}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    primary={`Jan Kowaslki #${value + 1}`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          sx={{ color: "black", backgroundColor: "#FFD700" }}
          onClick={handleClose}
        >
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}
