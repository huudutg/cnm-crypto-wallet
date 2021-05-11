import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
// core components
import componentStyles from "assets/theme/views/auth/login.js";

import React, { useRef, useState, useContext } from "react";
import { useAuth } from '../../context/auth';
import { useHistory } from "react-router-dom";

const a = {
  name: "hehe",
  age: "hudud"
}

const useStyles = makeStyles(componentStyles);

function Login() {

  const { login, user } = useAuth();

  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  const [files, setFiles] = useState()
  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      setFiles(JSON.parse(e.target.result));
    };
  };
  const handleClick = () => {
    console.log('%c files', 'color: blue;', files)
    if (login(files)) {
      history.push("/admin/index");
    }
  }
  return (
    <>
      <Grid item xs={12} lg={5} md={7}>
        <Card classes={{ root: classes.cardRoot }}>
          <CardHeader
            className={classes.cardHeader}
            title={
              <Box
                fontSize="120%"
                fontWeight="800"
                component="small"
                color={theme.palette.gray[600]}
              >
                Login to your wallet
              </Box>
            }
            titleTypographyProps={{
              component: Box,
              textAlign: "center",
              marginBottom: "1rem!important",
              marginTop: ".5rem!important",
              fontSize: "1rem!important",
            }}
          ></CardHeader>
          <CardContent classes={{ root: classes.cardContent }}>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              label="Password"
              marginBottom="1rem!important"
            >
              <TextField
                id="standard-password-input"
                label="File"
                type="file"
                required
                onChange={(e) => { handleChange(e) }}
                autoComplete="current-password"
              />
            </FormControl>
            <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
              <Button color="primary" variant="contained" onClick={handleClick}>
                Submit
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Grid container component={Box} marginTop="1rem">
          <Grid item xs={6} component={Box} textAlign="left">
            <a
              href="#admui"
              onClick={(e) => e.preventDefault()}
              className={classes.footerLinks}
            >
              Forgot password
            </a>
          </Grid>
          <Grid item xs={6} component={Box} textAlign="right">
            <a
              href="#admui"
              onClick={(e) => e.preventDefault()}
              className={classes.footerLinks}
            >
              Create new account
            </a>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
