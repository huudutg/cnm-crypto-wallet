import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Snackbar from '@material-ui/core/Snackbar';
// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MuiAlert from '@material-ui/lab/Alert';
import componentStyles from "assets/theme/views/admin/dashboard.js";
// javascipt plugin for creating charts
import Chart from "chart.js";
// core components
import Header from "components/Headers/Header.js";
import React, { useEffect, useState } from "react";
// react plugin used to create charts
import { Bar, Line } from "react-chartjs-2";
import {
  chartExample1,
  chartExample2, chartOptions,
  parseOptions
} from "variables/charts.js";
import { AXIOS } from '../../config.js';
import { useAuth } from '../../context/auth';
import socket from '../../socket/index'


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
// import { state } from '../../store'
const useStyles = makeStyles(componentStyles);

function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");
  const [balance, setbalance] = useState(0)
  const { login, user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [failOpen, setFailOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setFailOpen(false)
    setOpen(false);
  };
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (index) => {
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  const handleAddClick = async () => {
    const publicKey = localStorage.getItem("publicKey") || "";
    const data = {
      sender: "system-reward",
      recipient: publicKey,
      amount: 12.5,
    }
    AXIOS.post("/transaction/broadcast", data)
      .then((response) => {
        console.log('%c response transaction', 'color: blue;', response)
        setOpen(true)

      }).catch((err) => {
        setFailOpen(true)

      })
  }

  useEffect(async () => {
    const publicKey = localStorage.getItem("publicKey") || "";
    const res = await AXIOS.get("/blockchain")
    // console.log('%c state', 'color: blue;', state)
    if (!publicKey) {
      window.location.href = "/auth/login";

    }
    socket.on("PT", (data) => {
      console.log('%c data PT socket', 'color: blue;', data)
    });
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}

      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >

        <Grid container>

          <Grid
            item
            xs={12}
            xl={8}
            component={Box}
            marginBottom="3rem!important"
            classes={{ root: classes.gridItemRoot }}
          >
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert severity="success">
                Success!
              </Alert>
            </Snackbar>
            <Snackbar open={failOpen} autoHideDuration={3000} onClose={handleClose}>
              <Alert severity="error">
                Fail!
              </Alert>
            </Snackbar>
            <Card
              classes={{
                root: classes.cardRoot + " " + classes.cardRootBgGradient,
              }}
            >
              <CardHeader
                subheader={
                  <Grid
                    container
                    component={Box}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item xs="auto">
                      <Box
                        component={Typography}
                        variant="h6"
                        letterSpacing=".0625rem"
                        marginBottom=".25rem!important"
                        className={classes.textUppercase}
                      >
                        <Box component="span" color={theme.palette.gray[400]}>
                          Overview
                        </Box>
                      </Box>
                      <Box
                        component={Typography}
                        variant="h2"
                        marginBottom="0!important"
                      >
                        <Box component="span" color={theme.palette.white.main}>
                          Account Analytics
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs="auto">
                      <Box
                        justifyContent="flex-end"
                        display="flex"
                        flexWrap="wrap"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          component={Box}
                          marginRight="1rem!important"
                          onClick={() => handleAddClick()}
                          classes={{
                            root:
                              activeNav === 1
                                ? ""
                                : classes.buttonRootUnselected,
                          }}
                        >
                          + Deposit
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => setFailOpen(true)}
                          classes={{
                            root:
                              activeNav === 2
                                ? ""
                                : classes.buttonRootUnselected,
                          }}
                        >
                          - Withdraw
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>
              <CardContent>
                <Box position="relative" height="350px">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} xl={4}>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                title={
                  <Box component="span" color={theme.palette.gray[600]}>
                    Performane
                  </Box>
                }
                subheader="Transactions"
                classes={{ root: classes.cardHeaderRoot }}
                titleTypographyProps={{
                  component: Box,
                  variant: "h6",
                  letterSpacing: ".0625rem",
                  marginBottom: ".25rem!important",
                  classes: {
                    root: classes.textUppercase,
                  },
                }}
                subheaderTypographyProps={{
                  component: Box,
                  variant: "h2",
                  marginBottom: "0!important",
                  color: "initial",
                }}
              ></CardHeader>
              <CardContent>
                <Box position="relative" height="350px">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
