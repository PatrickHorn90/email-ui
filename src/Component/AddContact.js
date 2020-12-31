import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  addContactBtn: {
    color: "#fff",
    padding: "10px",
  },
  ageInput: {
    width: "20%",
  },
  closeModal: {
    color: "rgba(255,255,255,0.851)",
    backgroundColor: "rgba(32,33,36,0.6)",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
  },
  genderLabel: {
    marginBottom: "10px",
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    padding: "0 24px",
    width: "400px",
  },
  genderInput: {
    marginTop: "30px",
  },
  submitBtn: {
    margin: "auto",
    marginTop: "10px",
    marginBottom: "10px",
    padding: "8px 8px",
    border: "1px solid #3f51b5",
  },
  title: {
    margin: "auto",
    color: "#3f51b5",
  },
}));

function AddContactForm({ closeModal, open, setContacts, contacts }) {
  const [first, setFirstName] = useState("");
  const [last, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const classes = useStyles();

  const handleSubmitContact = () => {
    const newContact = {
      picture: {
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/33.jpg",
      },
      name: { first, last },
      dob: { age },
      gender,
      login: { uuid: uuidv4() },
    };
    setContacts([...contacts, newContact]);
    closeModal();
  };

  const validateFirstName = ({ target: { value } }) => {
    const isValid = /^[a-zA-Z]+$/g.test(value);
    if (!isValid) {
      setFirstNameError(true);
      setDisableSubmit(true);
    }
    if (isValid || !value) {
      setFirstNameError(false);
      setDisableSubmit(false);
    }
    setFirstName(value);
  };

  const validateLastName = ({ target: { value } }) => {
    const isValid = /^[a-zA-Z]+$/g.test(value);
    if (!isValid) {
      setLastNameError(true);
      setDisableSubmit(true);
    }
    if (isValid || !value) {
      setLastNameError(false);
      setDisableSubmit(false);
    }
    setLastName(value);
  };

  const validateAge = ({ target: { value } }) => {
    const isValid = /^[0-9]*$/g.test(value);
    if (!isValid) {
      setAgeError(true);
      setDisableSubmit(true);
    }
    if (isValid || !value) {
      setAgeError(false);
      setDisableSubmit(false);
    }
    setAge(value);
  };

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      aria-labelledby="form-dialog-title"
      className={classes.formContainer}
    >
      <DialogTitle className={classes.title}>Create New Contact</DialogTitle>
      <DialogContent className={classes.inputs}>
        <TextField
          error={firstNameError}
          autoFocus
          margin="dense"
          onChange={validateFirstName}
          value={first}
          label="First Name"
          fullWidth
          helperText={firstNameError ? "Entry is invalid." : ""}
        />
        <TextField
          error={lastNameError}
          margin="dense"
          onChange={validateLastName}
          value={last}
          label="Last Name"
          fullWidth
          helperText={lastNameError ? "Entry is invalid." : ""}
        />
        <FormControl className={classes.genderInput} component="fieldset">
          <FormLabel className={classes.genderLabel} component="legend">
            Gender
          </FormLabel>
          <RadioGroup
            aria-label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          className={classes.ageInput}
          error={ageError}
          margin="dense"
          onChange={validateAge}
          value={age}
          label="Age"
          helperText={ageError ? "Please enter a number" : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.submitBtn}
          disabled={disableSubmit}
          onClick={handleSubmitContact}
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function AddContact({ contacts, setContacts }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        className={classes.addContactBtn}
        color="primary"
        variant="outlined"
        onClick={() => setOpen(true)}
      >
        <PersonAddIcon />
        Add Contact
      </Button>
      <AddContactForm
        open={open}
        closeModal={() => setOpen(false)}
        contacts={contacts}
        setContacts={setContacts}
      />
    </div>
  );
}
