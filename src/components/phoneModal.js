import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import PhoneIcon from "@material-ui/icons/Phone";
import TimerIcon from "@material-ui/icons/Timer";
import Box from "@material-ui/core/Box";

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);
  const [number, storeNumber] = React.useState("");
  const [waitTime, storeWaitTime] = React.useState("");
  const [invalidPhoneNumber, setInvalidPhoneNum] = React.useState(false);
  const [invalidWaitTime, setInvalidWaitTime] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleNumberChange = (e) => {
    storeNumber(e.target.value);
  };

  const handleWaitTimeChangeChange = (e) => {
    storeWaitTime(e.target.value);
  };

  const handleCancel = () => {
    onClose();
    storeNumber("");
    storeWaitTime("");
    setInvalidPhoneNum(false);
    setInvalidWaitTime(false);
  };

  const validatePhoneNumber = (phNum) => {
    const isValidPhoneNumber = /^\d{10}$/;

    if (phNum.match(isValidPhoneNumber) && phNum > 0) {
      setInvalidPhoneNum(false);
      return true;
    }
    return false;
  };

  const validateWaitTime = () => {
    if (waitTime >= 0) {
      setInvalidWaitTime(false);
      return true;
    }
    return false;
  };

  const handleOk = () => {
    var phoneNumberToPassToBackend = validatePhoneNumber(number);
    var waitTimeToValidate = validateWaitTime();

    if (phoneNumberToPassToBackend && waitTimeToValidate) {
      props.stitchClient.callFunction("insertUserNumber", [
        number,
        props.storeId,
        waitTime,
      ]);
      handleCancel();
    } else {
      if (
        phoneNumberToPassToBackend === false &&
        waitTimeToValidate === false
      ) {
        setInvalidPhoneNum(true);
        setInvalidWaitTime(true);
      } else if (waitTimeToValidate === false) {
        setInvalidWaitTime(true);
      } else if (phoneNumberToPassToBackend === false) {
        setInvalidPhoneNum(true);
      }
    }
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Text updates!</DialogTitle>
      {invalidPhoneNumber && (
        <Typography variant="body2" className={classes.modalHeader}>
          <Box
            className={classes.warningText}
            fontWeight="fontWeightBold"
            m={1}
          >
            Invalid phone number
          </Box>
        </Typography>
      )}
      <TextField
        className={classes.textFieldStyle}
        id="outlined-number"
        type="tel"
        placeholder="Phone number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        onChange={handleNumberChange}
        value={number}
        error={invalidPhoneNumber}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneIcon />
            </InputAdornment>
          ),
        }}
      />
      {invalidWaitTime && (
        <Typography variant="body2" className={classes.modalHeader}>
          <Box
            className={classes.warningText}
            fontWeight="fontWeightBold"
            m={1}
          >
            Invalid wait time
          </Box>
        </Typography>
      )}
      <TextField
        className={classes.textFieldStyle}
        id="outlined-number"
        type="tel"
        placeholder="Notify me when the wait time is..."
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        onChange={handleWaitTimeChangeChange}
        value={waitTime}
        error={invalidWaitTime}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TimerIcon />
            </InputAdornment>
          ),
        }}
      />

      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default function ConfirmationDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState();

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <div>
      <div>
        <Button
          className={classes.textUpdatesButton}
          onClick={handleClickListItem}
          variant="contained"
        >
          Would you like text updates?
        </Button>
      </div>
      <div className={classes.root}>
        <ConfirmationDialogRaw
          stitchClient={props.stitchClient}
          classes={{
            paper: classes.paper,
          }}
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#fff3e6",
  },
  paper: {
    width: "80%",
    maxHeight: 435,
  },
  textFieldStyle: {
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
    borderRadius: 10,
  },
  textUpdatesButton: {
    top: 10,
    textTransform: "none",
    backgroundColor: "#01aae4",
    color: "white",
    borderRadius: 10,
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  warningText: {
    color: "red",
  },
}));
