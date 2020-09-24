import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles, fade } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "20px",
    backgroundColor: "lightBlue",
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
    display: "flex",
    justifyContent: "spaceBetween",
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

const ContactsList = ({ contacts }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="right">Picture</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right">Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact, index) => (
                <TableRow key={index}>
                  <Checkbox />
                  <TableCell align="right">
                    <img
                      className={classes.contactImage}
                      src={contact.picture.thumbnail}
                      alt="Contact pic"
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {contact.name.first}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {contact.name.last}
                  </TableCell>
                  <TableCell align="right">{contact.gender}</TableCell>
                  <TableCell align="right">{contact.dob.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default ContactsList;
