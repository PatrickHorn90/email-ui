import "./index.css";

import * as serviceWorker from "./serviceWorker";

import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import ReactDOM from "react-dom";

/*
  Implement react router in your app: https://reactrouter.com/web/example/basic
  The general idea is that if the user lands on the home page: localhost:3000/ 
  then display App(rename it to Home)
  If the user lands on localhost:3000/someUserId, then display a basic details page
  someUserId will be handled using url parameters: https://reactrouter.com/web/example/url-params

  Bc of the limitations of the api(not being able to search for a specific user),
  we will need to lift the user data up a level and then feed the contacts into the home page as well as the details page.
  If the user is on the details page, we will use the url param to determine which user to search for in our contacts array.
  Example localhost:3000/ahiu398a498 <- find a user that matches this id

  The overall structure of your app will look like this:
  App -- fetches for contacts
    Router
      Switch
        Route
          Home  -- display contact list, add contact, etc
        Route
          Details -- searches for a user within our contacts that matches the url param(being the user id) and displays details
*/

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
