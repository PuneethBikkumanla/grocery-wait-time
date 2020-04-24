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

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "lightcoral",
    padding: theme.spacing(2, 4, 3),
  },
  textFieldStyle: {
    backgroundColor: "#fff3e6",
    borderRadius: 10,
  },

  modalButton: {
    top: 10,
    textTransform: "none",
  },

  modalSubmitButton: {
    top: 10,
    textTransform: "none",
  },

  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function PhoneModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className={classes.modalButton}
        onClick={handleOpen}
        variant="contained"
        color="primary"
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
            <Typography variant="body2" className={classes.modalHeader}>
              <Box fontWeight="fontWeightBold" m={1}>
                Wait time text updates
              </Box>
            </Typography>
            <TextField
              className={classes.textFieldStyle}
              id="outlined-number"
              type="number"
              placeholder="Phone number"
              fullWidth={true}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <br></br>
            <br></br>
            <TextField
              className={classes.textFieldStyle}
              id="outlined-number"
              type="number"
              fullWidth={true}
              placeholder="Enter wait time (mins)"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <br></br>
            <Button
              className={classes.modalSubmitButton}
              variant="contained"
              color="primary"
              endIcon={<Send />}
            >
              Submit
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
