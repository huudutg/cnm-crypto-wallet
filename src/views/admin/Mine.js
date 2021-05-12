import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
// @material-ui/core components
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from "@material-ui/core/Typography";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import React, { useEffect, useState } from "react";
import { AXIOS } from '../../config.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



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

function Profile() {
  const classes = useStyles();
  const theme = useTheme();
  const publicKey = localStorage.getItem("publicKey") || "";
  const [open, setOpen] = React.useState(false);
  const [failOpen, setFailOpen] = React.useState(false);
  const [loading, setloading] = React.useState(false)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setFailOpen(false)
    setOpen(false);
  };
  const handleMineClick = async () => {
    setloading(true)
    AXIOS.post("/mine", { recipient: publicKey }).then((response) => {
      console.log('%c response handleMineClick', 'color: blue;', response)
      setOpen(true)
      setloading(false)
    }).catch((err) => {
      setFailOpen(true)
      setloading(false)
    })

  }
  const [blockchain, setblockchain] = useState({})
  useEffect(async () => {
    const { data } = await AXIOS.get("/blockchain")
    console.log('%c data History', 'color: blue;', data)
    setblockchain(data)
  }, []);
  return (
    <>
      <UserHeader />
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
            xl={12}
            component={Box}
            marginBottom="3rem"
            classes={{ root: classes.gridItemRoot + " " + classes.order2 }}
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
                root: classes.cardRoot + " " + classes.cardRootSecondary,
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
                        variant="h3"
                        marginBottom="0!important"
                      >
                        Current Pending Transactions
                      </Box>
                    </Grid>
                    <Grid item xs="auto">
                      <Box
                        justifyContent="flex-end"
                        display="flex"
                        flexWrap="wrap"
                      >
                        {loading ? <CircularProgress color="secondary" /> : <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleMineClick()}
                        >
                          Mine
                        </Button>
                        }

                      </Box>
                    </Grid>
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
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
                      {blockchain?.pendingTransactions?.map((row) => (
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
          </Grid>
        </Grid>




      </Container>
    </>
  );
}

export default Profile;
