import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
// import Checkbox from "@material-ui/core/Checkbox";
import { CircularProgress } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchIcon from "@material-ui/icons/Search";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import { makeStyles, fade } from "@material-ui/core/styles";
import "./App.css";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "64px",
    padding: "40px",
    backgroundColor: "#c2d7f3",
  },
  table: {
    minWidth: 650,
  },
  contactImage: {
    borderRadius: "50%",
  },
  contactRow: {
    verticalAlign: "middle",
  },
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

  const ContactList = () => {
    if (contacts) {
      return (
        <>
          <div className={classes.container}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Picture</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell align="right">Gender</TableCell>
                    <TableCell align="right">Age</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contacts
                    .filter(({ name: { first } }) =>
                      first.toLowerCase().includes(filter)
                    )
                    .map((contact) => {
                      const { login, picture, name, dob, gender } = contact;
                      return (
                        <TableRow key={login.uuid}>
                          {/* <Checkbox /> */}
                          <TableCell align="right">
                            <img
                              className={classes.contactImage}
                              src={picture.thumbnail}
                              alt="Contact pic"
                            />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {name.first}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {name.last}
                          </TableCell>
                          <TableCell align="right">{gender}</TableCell>
                          <TableCell align="right">{dob.age}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      );
    } else return <CircularProgress />;
  };

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
          <Button variant="contained" color="primary">
            <PersonAddIcon />
            Add Contact
          </Button>
        </Toolbar>
      </AppBar>
      <ContactList />
    </>
  );
};

export default App;
