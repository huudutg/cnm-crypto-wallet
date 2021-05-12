import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
// @material-ui/core components
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import React, { useRef, useState } from "react";
// core components
import componentStyles from "assets/theme/views/auth/register.js";
import { AXIOS } from '../../config.js'



const exportToJson = (objectData) => {
  let filename = "wallet.json";
  let contentType = "application/json;charset=utf-8;";
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(objectData)))], { type: contentType });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    var a = document.createElement('a');
    a.download = filename;
    a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(objectData));
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

const useStyles = makeStyles(componentStyles);

function Register() {
  const classes = useStyles();
  const theme = useTheme();
  const [password, setpassword] = useState()
  const handleClick = async () => {
    const res = await AXIOS.post("/generateKeyPair", { name: password })
    console.log('%c res', 'color: blue;', res)
    exportToJson(res.data)
  }

  return (
    <>
      <Grid item xs={12} lg={6} md={8}>
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
                Create your own wallet
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
                label="Password"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => { setpassword(e.target.value) }}
                autoComplete="current-password"
              />
            </FormControl>
            <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
              <Button color="primary" variant="contained" onClick={handleClick}>
                Create
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default Register;
