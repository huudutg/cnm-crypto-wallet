import { CardContent } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import componentStyles from "assets/theme/views/admin/tables.js";
// core components
import Header from "components/Headers/Header.js";
import React, { useEffect, useState } from "react";

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { AXIOS } from '../../config.js';
import socket from '../../socket/index'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
// const useStyles = makeStyles(componentStyles);

const Tables = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [blockchain, setblockchain] = useState([])
  useEffect(() => {
    AXIOS.get("/blockchain").then((response) => {
      setblockchain(response.data.transactionsHistory)

    })


    socket.on("blockchain", (data) => {
      console.log('%c datablockchain', 'color: blue;', data)
      setblockchain(data.transactionsHistory)

    });
  }, []);

  useEffect(() => {
    console.log(blockchain)
  }, [blockchain]);
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
        <Card classes={{ root: classes.cardRoot }}>
          <CardHeader
            className={classes.cardHeader}
            title="Card Tables"
            titleTypographyProps={{
              component: Box,
              marginBottom: "0!important",
              variant: "h3",
            }}
          ></CardHeader>
          <CardContent>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sender</StyledTableCell>
                    <StyledTableCell>Receiver</StyledTableCell>
                    <StyledTableCell align="right">Amount</StyledTableCell>
                    <StyledTableCell align="right">Date</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blockchain?.map((row) => (
                    <StyledTableRow key={row.transactionId}>
                      <StyledTableCell component="th" scope="row">
                        {row.sender}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.recipient}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.amount}</StyledTableCell>
                      <StyledTableCell align="right">{row.date}</StyledTableCell>

                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Tables;
