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

  Due to the limitations of the api(not being able to search for a specific user), we will need to feed contacts
  into ContactDetails and then search for the user with the matching uuid(user.login.uuid) that we will provide 
  in the url param when clicking on the users first name

  The overall structure of your app should look like this:
  Router
    App
      Switch
        Route
          ContactList
            wrap each first name text with a Link tag that provides the uuid
        Route
          ContactDetails

  Since we only want the content to change within the white container, the filter and add contact
  button need to live inside of the contact list.
  Imagine if we were on the details page, and still had the ability to filter and add people. Doesnt make
  much sense from a UX perspective. So the header should only contain the app title, something that doesn't change as
  you move to differnt pages of the app.
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
