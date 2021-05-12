import React, { useEffect, useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons components
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import EmojiEvents from "@material-ui/icons/EmojiEvents";
import GroupAdd from "@material-ui/icons/GroupAdd";
import InsertChartOutlined from "@material-ui/icons/InsertChartOutlined";
import PieChart from "@material-ui/icons/PieChart";

// core components
import CardStats from "components/Cards/CardStats.js";
import { AXIOS } from '../../config.js'
import { ToastContainer, toast } from 'react-toastify';

import componentStyles from "assets/theme/components/header.js";

const useStyles = makeStyles(componentStyles);

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const publicKey = localStorage.getItem("publicKey") || "";
  const privateKey = localStorage.getItem("privateKey") || "";
  const [balance, setbalance] = useState(0)
  useEffect(async () => {
    const { data } = await AXIOS.post("/hashKeys", { publicKey, privateKey })
    console.log('%c dataHeader', 'color: blue;', data)
    setbalance(data.addressBalance)
  }, []);

  return (
    <>
      <div className={classes.header}>
        <Container
          maxWidth={false}
          component={Box}
          classes={{ root: classes.containerRoot }}
        >
          <div>
            <Grid container>
              <Grid item xl={4} lg={4} xs={12}>
                <CardStats
                  subtitle="Address"
                  title={publicKey}
                  icon={InsertChartOutlined}
                  color="bgError"
                  footer={
                    <>
                      <Box
                        component="span"
                        fontSize=".875rem"
                        color={theme.palette.success.main}
                        marginRight=".5rem"
                        display="flex"
                        alignItems="center"
                      >
                        <Box
                          component={ArrowUpward}
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />{" "}
                       ---
                      </Box>
                      <Box component="span" whiteSpace="nowrap">
                        your public key
                      </Box>
                    </>
                  }
                />
              </Grid>
              <Grid item xl={4} lg={4} xs={12}>
                <CardStats
                  subtitle="Balance"
                  title={balance ? balance : 0 + " ETH"}
                  icon={PieChart}
                  color="bgWarning"
                  sizeTitle="25px"
                  footer={
                    <>
                      <Box
                        component="span"
                        fontSize=".875rem"
                        color={theme.palette.error.main}
                        marginRight=".5rem"
                        display="flex"
                        alignItems="center"
                      >
                        <Box
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />{" "}
                        {balance} ETH
                      </Box>
                      <Box component="span" whiteSpace="nowrap">
                        Since last week
                      </Box>
                    </>
                  }
                />
              </Grid>
              <Grid item xl={4} lg={4} xs={12}>
                <CardStats
                  subtitle="Network"
                  title="924"
                  icon={GroupAdd}
                  color="bgWarningLight"
                  footer={
                    <>
                      <Box
                        component="span"
                        fontSize=".875rem"
                        color={theme.palette.warning.main}
                        marginRight=".5rem"
                        display="flex"
                        alignItems="center"
                      >
                        <Box
                          component={ArrowDownward}
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />{" "}
                        1.10%
                      </Box>
                      <Box component="span" whiteSpace="nowrap">
                        Since yesterday
                      </Box>
                    </>
                  }
                />
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
