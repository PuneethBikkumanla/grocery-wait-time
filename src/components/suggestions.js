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
    display: "flex",
    margin: "auto",
    textTransform: "none",
    backgroundColor: "#01aae4",
    color: "white",
    borderRadius: 10,
    marginBottom: 50,
  },

  modalSubmitButton: {
    top: 20,
    textTransform: "none",
    backgroundColor: "#01aae4",
    color: "white",
    borderRadius: 10,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 100,
    paddingRight: 100,
    display: "flex",
    margin: "auto",
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
}));

export default function PhoneModal(props) {
  const stitchClient = StitchClient.getStitchClient();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [suggestedFeedback, setSuggestedFeedbackValue] = React.useState("");

  const handleWaitTimeChangeChange = (e) => {
    setSuggestedFeedbackValue(e.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    handleClose();
    stitchClient.callFunction("addSuggestion", [suggestedFeedback]);
    handleClose();
  };

  return (
    <div>
      <Button
        className={classes.modalButton}
        onClick={handleOpen}
        variant="contained"
      >
        App feedback!
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
            <Typography variant="body2" className={classes.modalHeader}>
              <Box
                className={classes.modalText}
                fontWeight="fontWeightBold"
                m={1}
              >
                Tell us how to improve out app!
              </Box>
            </Typography>
            <TextField
              className={classes.textFieldStyle}
              id="outlined-number"
              fullWidth={true}
              placeholder="Feedback"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleWaitTimeChangeChange}
              value={suggestedFeedback}
            />
            <Button
              className={classes.modalSubmitButton}
              variant="contained"
              endIcon={<Send />}
              onClick={handleClick}
            >
              Submit
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
