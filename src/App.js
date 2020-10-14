import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import ContactList from "./Component/ContactList";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import AddContact from "./Component/AddContact";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, fade } from "@material-ui/core/styles";
import "./App.css";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#06166d",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-around",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const App = () => {
  const classes = useStyles();
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  const handleSearchChange = (e) => {
    setFilter(e.target.value.toLowerCase());
    console.log(filter);
  };

  useEffect(() => {
    axios
      .get(`https://randomuser.me/api/?results=30`)
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
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={filter}
              onChange={handleSearchChange}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <AddContact contacts={contacts} setContacts={setContacts} />
        </Toolbar>
      </AppBar>
      <ContactList contacts={contacts} filter={filter} />
    </>
  );
};

export default App;
