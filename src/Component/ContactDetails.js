import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  detailsContainer: {
    marginTop: "0px",
  },
}));

const ContactDetails = ({ contacts }) => {
  const classes = useStyles();
  return (
    <div className={classes.detailsContainer}>
      <h1>Contact Details Page</h1>
    </div>
  );
};

export default ContactDetails;
