import { Button, Paper, Typography } from "@mui/material";
import { Container, Grid } from "@mui/system";
import React, { Fragment } from "react";
import { useNavigate } from "react-router";

export default function MockDocumentLoan() {
  const history = useNavigate();

  return (
    <Fragment>
      <Container fixed sx={{ marginTop: "10vh" }}>
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
          <Grid size={10}>
            <Paper elevation={3} sx={{ minHeight: "500px" }}>
              <Grid
                container
                sx={{
                  backgroundColor: "#f2f2f2",
                  borderRadius: "4px 4px 0px 0px",
                  padding: 1,
                  marginBottom: "5px",
                }} //6042F7
              >
                <Grid
                  size={6}
                  sx={{ paddingTop: "0.5rem", paddingLeft: "1rem" }}
                >
                  <Typography sx={{ fontWeight: "bold", color: "#666" }}>
                    Sample Target Document
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => history("/")}
                  >
                    Back to WIDGET
                  </Button>
                </Grid>
              </Grid>

              <iframe
                title="mock"
                src="https://fondationlibancinema.org/wp-content/uploads/2024/06/pdfPlaceholder.pdf"
                height="500"
                width="950"
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
