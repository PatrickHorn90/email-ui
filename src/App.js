import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import ContactDetails from "./Component/ContactDetails";
import ContactList from "./Component/ContactList";
import Toolbar from "@material-ui/core/Toolbar";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#06166d",
  },
  containerContent: {
    marginTop: "64px",
    backgroundColor: "#c2d7f3",
  },
  homeLink: {
    color: "white",
    textDecoration: "none",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-around",
    color: "white",
  },
}));

const App = () => {
  const classes = useStyles();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://randomuser.me/api/?results=20`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        setContacts(results);
      });
  }, []);

  return (
    <Router>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Link className={classes.homeLink} to="/">
            <h1>Contact List App</h1>
          </Link>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/">
          <div className={classes.containerContent}>
            <ContactList contacts={contacts} setContacts={setContacts} />
          </div>
        </Route>
        <Route
          path="/:uuid"
          children={<ContactDetails contacts={contacts} />}
        />
      </Switch>
    </Router>
  );
};

export default App;
