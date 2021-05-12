import "@fortawesome/fontawesome-free/css/all.min.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import "./assets/plugins/nucleo/css/nucleo.css";
import "./assets/scss/argon-dashboard-react.scss";
import theme from "./assets/theme/theme.js";
import { AuthProvider } from './context/auth';
import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";
import { action } from "./store";
import { ToastContainer, toast } from 'react-toastify';

class App extends Component {
  state = {
    ownBlockchainName: ""
  };
  pickBlockchain = name => {
    action({ type: "PICK_BLOCKCHAIN", name });
  };

  render() {
    return (
      <>
        <ThemeProvider theme={theme}>

          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <AuthProvider>
            <BrowserRouter>
              <Switch>
                <Route path="/admin" render={(props) => <AdminLayout state={this.props.appState} {...props} />} />
                <Route path="/auth" render={(props) => <AuthLayout state={this.props.appState} {...props} />} />
                <Redirect from="/" to="/admin/index" />
              </Switch>
            </BrowserRouter>
          </AuthProvider>
        </ThemeProvider>
      </>
    );
  }
}

export default App;
