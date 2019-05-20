import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./ducks/store";
import {
  MuiThemeProvider,
  createMuiTheme,
  getContrastText
} from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import indigo from "@material-ui/core/colors/indigo";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: grey[300],
      main: grey[500],
      dark: grey[900]
    },
    secondary: {
      light: indigo[100],
      main: indigo[500],
      dark: indigo[800]
    },
    alert: {
      light: red[100],
      main: red[500],
      dark: red[800]
    }
  },
  typography: {
    fontSize: 12
  },
  overrides: {
    MuiButton: {
      text: {
        color: "white"
      }
    }
  }
});

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </MuiThemeProvider>,
    document.getElementById("root")
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
