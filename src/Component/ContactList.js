import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fade, CircularProgress, makeStyles } from "@material-ui/core";
import AddContact from "./AddContact";
import DeleteIcon from "@material-ui/icons/Delete";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
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
    border: "1px solid #06166d",
    borderRadius: "10px",
  },
  tableContainer: {
    margin: "auto",
    minWidth: "300px",
    padding: "20px",
    width: "55%",
  },
  contactImage: {
    borderRadius: "50%",
  },
  contactRow: {
    verticalAlign: "middle",
  },
  contactsToolBar: {
    display: "flex",
    justifyContent: "space-around",
    margin: "40px 0px",
  },
  deleteBtn: {
    cursor: "pointer",
    color: "rgb(70 84 103 / 87%)",
    "&:hover": {
      color: "red",
    },
  },
  noMatches: {
    color: "black",
    fontFamily: "Anton",
    fontSize: "40px",
    marginTop: "40px",
    marginBottom: "40px",
    margin: "auto",
  },
}));

const ContactList = ({ contacts, setContacts }) => {
  const classes = useStyles();
  const [filter, setFilter] = useState("");

  const renderContacts = () => {
    const filteredContacts = contacts
      .filter(({ name: { first, last } }) => {
        const fullname = `${first} ${last}`;
        return fullname.toLowerCase().includes(filter);
      })
      .map((contact) => {
        const { picture, name, dob, gender } = contact;
        return (
          <TableRow key={contact.login.uuid}>
            <TableCell>
              <img
                className={classes.contactImage}
                src={picture.thumbnail}
                alt="Contact pic"
              />
            </TableCell>
            <TableCell>
              <Link to={`${name.first} ${name.last}`}>{name.first}</Link>
            </TableCell>
            <TableCell>{name.last}</TableCell>
            <TableCell>{gender}</TableCell>
            <TableCell>{dob.age}</TableCell>
            <TableCell>
              <DeleteIcon
                className={classes.deleteBtn}
                onClick={() => deleteContact(contact.login.uuid)}
              ></DeleteIcon>
            </TableCell>
          </TableRow>
        );
      });
    if (filteredContacts.length === 0)
      return <div className={classes.noMatches}>No Matches Found</div>;
    return filteredContacts;
  };

  const handleSearchChange = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  const deleteContact = (id) => {
    const updatedContacts = contacts.filter(
      (contact) => contact.login.uuid !== id
    );
    setContacts(updatedContacts);
  };

  if (contacts.length) {
    return (
      <TableContainer className={classes.tableContainer} component={Paper}>
        <div className={classes.contactsToolBar}>
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
        </div>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Picture</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Age</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderContacts()}</TableBody>
        </Table>
      </TableContainer>
    );
  } else return <CircularProgress />;
};

export default ContactList;
