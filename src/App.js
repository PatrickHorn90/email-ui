import "./App.css";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
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
  toolBar: {
    display: "flex",
    justifyContent: "space-around",
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
    <>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <h1>Contact List App</h1>
        </Toolbar>
      </AppBar>
      <div className={classes.containerContent}>
        <ContactList contacts={contacts} setContacts={setContacts} />
      </div>
    </>
  );
};

export default App;
