import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(() => ({
  detailsContainer: {
    marginTop: "120px",
    textAlign: "center",
  },
}));

const ContactDetails = (contacts) => {
  const classes = useStyles();
  let { uuid } = useParams();
  return (
    <div className={classes.detailsContainer}>
      <h1>Contact Details Page for User: {uuid}</h1>
    </div>
  );
};

export default ContactDetails;
