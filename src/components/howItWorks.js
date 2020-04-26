import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Button,
  DialogTitle,
  DialogActions,
  Dialog,
  Typography,
  DialogContent,
  List,
  ListItemText,
  ListItemIcon,
  ListItem,
  Box,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import TimerIcon from "@material-ui/icons/Timer";
import NotificationsIcon from "@material-ui/icons/Notifications";

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const classes = useStyles();

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleOk = () => {
    onClose();
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
      elevation={24}
    >
      <DialogTitle id="confirmation-dialog-title">
        <Typography elevation={24} variant="h5">
          <Box fontWeight="fontWeightBold" m={1}>
            How it works!
          </Box>
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <List component="div" role="list">
          <ListItem>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText
              primary="Find a store"
              className={classes.howItWorksTitle}
            />
          </ListItem>

          <List component="div" disablePadding>
            <ListItem className={classes.nested}>
              <ListItemText
                className={classes.nested}
                primary="There are two ways to search for a store. You can either enter in a
            store name, or enter in your address to find a list of grocery
            stores near you."
              />
            </ListItem>
          </List>
          <ListItem>
            <ListItemIcon>
              <TimerIcon />
            </ListItemIcon>
            <ListItemText
              primary="Check and report wait times"
              className={classes.howItWorksTitle}
            />
          </ListItem>
          <List component="div" disablePadding>
            <ListItem className={classes.nested}>
              <ListItemText
                className={classes.nested}
                primary="Once you have found a store, you can either check or report a wait
              time. To report a wait time, click on the button labled 'Report
              estimated wait time'."
              />
            </ListItem>
          </List>
          <ListItem>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText
              primary="Notifications"
              className={classes.howItWorksTitle}
            />
          </ListItem>
          <List component="div" disablePadding>
            <ListItem className={classes.nested}>
              <ListItemText
                className={classes.nested}
                primary="You can optionally receive text message updates for a store. Simply
              click on the button labeled 'Would you like text updates' and enter
              in a phone number as well as a desired wait time. When a wait time
              is reported that is less than or equal to the time you entered, you
              will receive a text message that will list the name and the
              approximate wait time of the store."
              />
            </ListItem>
          </List>
        </List>
      </DialogContent>
      <DialogActions>
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
    <div>
      <div>
        <Button
          onClick={handleClickListItem}
          elevation={6}
          className={classes.howItWorks}
        >
          How it works
        </Button>
      </div>
      <div className={classes.root}>
        <ConfirmationDialogRaw
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
  howItWorks: {
    textDecoration: "underline",
    display: "flex",
    margin: "auto",
    textTransform: "none",
    color: "white",
  },
  howItWorksTitle: {
    textDecoration: "underline",
    marginLeft: -25,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    marginTop: -7,
  },
}));
