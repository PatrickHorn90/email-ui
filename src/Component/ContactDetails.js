import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  detailsContainer: {
    marginTop: "120px",
    textAlign: "center",
  },
}));

const ContactDetails = (contacts) => {
  const classes = useStyles();
  let { uuid } = useParams();
  let history = useHistory();
  return (
    <div className={classes.detailsContainer}>
      <h1>Contact Details Page for User: {uuid}</h1>
      <Button
        onClick={() => history.goBack()}
        variant="contained"
        color="primary"
      >
        Back
      </Button>
    </div>
  );
};

export default ContactDetails;
