import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
}));

const ContactList = (props) => {
  const classes = useStyles();
  const { contacts, filter } = props;

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

export default ContactList;
