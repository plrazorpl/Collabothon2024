import { Switch } from "@mui/material";
import { Container, Grid } from "@mui/system";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredNotifications } from "../slices/notificationsList";
import Widget from "./Widget";

function HomePage() {
  const dispatch = useDispatch();
  const { filters } = useSelector((store) => store.filter);
  const { allNotifications } = useSelector((store) => store.notificationsList);

  useEffect(() => {
    dispatch(getFilteredNotifications(filters));
  }, [dispatch, filters, allNotifications]);

  const [showList, setShowList] = React.useState(true); // CHANGE TO FALSE FOR PRESENTATION

  const handleChange = () => {
    setShowList(!showList);
  };

  return (
    <Fragment>
      <Container fixed sx={{ marginTop: "13vh" }}>
        <Grid
          container
          spacing={2}
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Grid size={8}>
            <Widget showList={showList} />
          </Grid>
        </Grid>
      </Container>
      <Switch color="red" checked={showList} onChange={handleChange} />
    </Fragment>
  );
}

export default HomePage;
