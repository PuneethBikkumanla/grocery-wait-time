import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Send from "@material-ui/icons/Send";
import Box from "@material-ui/core/Box";

import StitchClient from "./stitchClient";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#19181a",
    padding: theme.spacing(4, 4, 4),
    paddingBottom: 64,
  },
  textFieldStyle: {
    backgroundColor: "#fff3e6",
    borderRadius: 10,
  },

  modalButton: {
    top: 10,
    textTransform: "none",
    backgroundColor: "#01aae4",
    color: "white",
    borderRadius: 10,
  },

  modalSubmitButton: {
    top: 20,
    textTransform: "none",
    backgroundColor: "#01aae4",
    color: "white",
    borderRadius: 10,
    paddingLeft: 60,
    paddingRight: 70,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  modalText: {
    paddingBottom: 16,
    color: "white",
  },

  warningText: {
    color: "red",
  },
}));

export default function PhoneModal(props) {
  const stitchClient = StitchClient.getStitchClient();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [number, storeNumber] = React.useState("");
  const [waitTime, storeWaitTime] = React.useState("");
  const [invalidPhoneNumber, setInvalidPhoneNum] = React.useState(false);
  const [invalidWaitTime, setInvalidWaitTime] = React.useState(false);

  const handleNumberChange = (e) => {
    storeNumber(e.target.value);
  };

  const handleWaitTimeChangeChange = (e) => {
    storeWaitTime(e.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const handleSubmit = () => {
    var phoneNumberToPassToBackend = validatePhoneNumber(number);
    var waitTimeToValidate = validateWaitTime();

    if (phoneNumberToPassToBackend && waitTimeToValidate) {
      stitchClient.callFunction("insertUserNumber", [
        number,
        props.storeId,
        waitTime,
      ]);
      handleClose();
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
    <div>
      <Button
        className={classes.modalButton}
        onClick={handleOpen}
        variant="contained"
      >
        Would you like text updates?
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
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
            <Typography variant="body2" className={classes.modalHeader}>
              <Box
                className={classes.modalText}
                fontWeight="fontWeightBold"
                m={1}
              >
                Send me text updates
              </Box>
            </Typography>
            <TextField
              className={classes.textFieldStyle}
              id="outlined-number"
              type="tel"
              placeholder="Phone number"
              fullWidth={true}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleNumberChange}
              value={number}
            />
            <br></br>
            <br></br>
            <TextField
              className={classes.textFieldStyle}
              id="outlined-number"
              type="tel"
              fullWidth={true}
              placeholder="Notify me when the waittime is"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleWaitTimeChangeChange}
              value={waitTime}
            />
            <br></br>
            <Button
              className={classes.modalSubmitButton}
              variant="contained"
              endIcon={<Send />}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
