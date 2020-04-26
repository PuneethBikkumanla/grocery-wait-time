import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Box,
} from "@material-ui/core";

const options = [
  "None",
  "5 minutes",
  "10 minutes",
  "15 minutes",
  "30 minutes",
  "45 minutes",
  "1 hour",
  "75 minutes",
  "90 minutes",
  "2 hours",
];

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

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
  };

  const handleOk = () => {
    let timeStamp = new Date();
    props.stitchClient.callFunction("addOrUpdateStore", [
      props.storeId,
      value,
      timeStamp,
      props.storeName,
    ]);
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
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
      <DialogTitle id="confirmation-dialog-title" variant="outlined">
        <Typography elevation={24} variant="h6">
          <Box fontWeight="fontWeightBold" m={1}>
            Report estimated wait time
          </Box>
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button
          elevation={6}
          autoFocus
          onClick={handleCancel}
          color="secondary"
        >
          Cancel
        </Button>
        <Button elevation={6} onClick={handleOk} color="primary">
          Ok
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
    <div className={classes.root}>
      <List component="div" role="list">
        <ListItem
          button
          divider
          aria-haspopup="true"
          onClick={handleClickListItem}
          role="listitem"
        >
          <ListItemText
            primary="Report estimated wait time"
            secondary={value}
          />
        </ListItem>

        <ConfirmationDialogRaw
          storeId={props.storeId}
          storeName={props.storeName}
          stitchClient={props.stitchClient}
          listOfStores={props.listOfStores}
          classes={{
            paper: classes.paper,
          }}
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
      </List>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "white",
  },
  paper: {
    width: "80%",
    maxHeight: 435,
  },
}));
