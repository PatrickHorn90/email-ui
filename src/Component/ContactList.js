import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    marginTop: "64px",
    padding: "40px 400px",
    backgroundColor: "#c2d7f3",
  },
  table: {
    minWidth: 650,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  contactImage: {
    borderRadius: "50%",
  },
  contactRow: {
    verticalAlign: "middle",
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
  },
}));

const ContactList = ({ contacts, filter, setContacts }) => {
  const classes = useStyles();

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
            <TableCell align="right">
              <img
                className={classes.contactImage}
                src={picture.thumbnail}
                alt="Contact pic"
              />
            </TableCell>
            <TableCell scope="row">{name.first}</TableCell>
            <TableCell scope="row">{name.last}</TableCell>
            <TableCell align="left">{gender}</TableCell>
            <TableCell align="right">{dob.age}</TableCell>
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

  const deleteContact = (id) => {
    const updatedContacts = contacts.filter(
      (contact) => contact.login.uuid !== id
    );
    setContacts(updatedContacts);
  };

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
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderContacts()}</TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    );
  } else return <CircularProgress />;
};

export default ContactList;
