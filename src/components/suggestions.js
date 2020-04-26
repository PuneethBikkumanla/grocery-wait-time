import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Button,
  DialogTitle,
  DialogActions,
  Dialog,
  TextField,
  InputAdornment,
  Typography,
  Box,
} from "@material-ui/core";

import DescriptionIcon from "@material-ui/icons/Description";

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);
  const [suggestedFeedback, setSuggestedFeedbackValue] = React.useState("");
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

  const handleCancel = () => {
    onClose();
    setSuggestedFeedbackValue("");
  };

  const handleOk = () => {
    props.stitchClient.callFunction("addSuggestion", [suggestedFeedback]);
    onClose();
    setSuggestedFeedbackValue("");
  };

  const handleSuggestedFeedbackOnChange = (e) => {
    setSuggestedFeedbackValue(e.target.value);
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
      elevation={24}
    >
      <DialogTitle id="confirmation-dialog-title">
        <Typography elevation={24} variant="h5">
          <Box fontWeight="fontWeightBold" m={1}>
            App feedback
          </Box>
        </Typography>
      </DialogTitle>
      <TextField
        className={classes.textFieldStyle}
        id="outlined-number"
        placeholder="Please write your feedback here..."
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        onChange={handleSuggestedFeedbackOnChange}
        value={suggestedFeedback}
        multiline={true}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DescriptionIcon />
            </InputAdornment>
          ),
        }}
      />

      <DialogActions>
        <Button
          autoFocus
          elevation={6}
          onClick={handleCancel}
          color="secondary"
        >
          Cancel
        </Button>
        <Button elevation={6} onClick={handleOk} color="primary">
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
          className={classes.modalButton}
          onClick={handleClickListItem}
          variant="contained"
          elevation={6}
        >
          App feedback!
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
    marginTop: 10,
    marginRight: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
  modalButton: {
    marginTop: 250,
    display: "flex",
    margin: "auto",
    textTransform: "none",
    backgroundColor: "#2ebc8e",
    color: "white",
    borderRadius: 10,
    marginBottom: 50,
  },
}));
