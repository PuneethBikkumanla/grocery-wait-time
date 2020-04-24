//react
import React, { Component } from "react";
import Timestamp from "react-timestamp";

//material
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";

//inproject
import PhoneModalComponent from "./phoneModal";
import StitchClient from "./stitchClient";

class listOfGroceryStores extends Component {
  constructor(props) {
    super(props);
    this.stitchClient = StitchClient.getStitchClient();
  }

  displayTimes(times) {
    if (!times) {
      return;
    }
    let reportString = "Reported ";
    return (
      <ul>
        {times.map(function (timeObj) {
          return (
            <li>
              {timeObj.wait_time} - {reportString}
              <Timestamp relative date={timeObj.t_stamp} />
            </li>
          );
        })}
      </ul>
    );
  }

  displayList = (stores) => {
    if (stores) {
      return (
        <ul>
          {stores.map((store) => (
            <Card key={store.id} style={rootStyle} variant="outlined">
              <CardContent style={titleStyle}>
                <Typography variant="h5">
                  <Box fontWeight="fontWeightBold" m={1}>
                    {store.name}
                  </Box>
                </Typography>
                <Typography variant="body2">
                  <Box fontWeight="fontWeightBold" m={1}>
                    Address: {store.vicinity}
                  </Box>
                </Typography>
                <Typography variant="body2">
                  <Box fontWeight="fontWeightRegular" m={1}>
                    Most recent estimated wait-times:
                  </Box>
                </Typography>
                {this.displayTimes(store.times)}
                <br></br>
                <FormControl
                  variant="outlined"
                  style={formControl}
                  fullWidth={true}
                >
                  <InputLabel id="simple-select-outlined-label">
                    Please report the estimated wait time
                  </InputLabel>
                  <Select
                    labelId="simple-select-outlined-label"
                    id="simple-select-outlined"
                    onChange={(e) => {
                      let timeStamp = new Date();
                      this.handleSelectedItem(
                        store.id,
                        e.target.value,
                        timeStamp,
                        store.name
                      );
                    }}
                    label="Please report the current estimated wait time"
                  >
                    <MenuItem value={0 + " minutes"}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={5 + " minutes"}>Five Minutes</MenuItem>
                    <MenuItem value={10 + " minutes"}>Ten Minutes</MenuItem>
                    <MenuItem value={15 + " minutes"}>Fifteen Minutes</MenuItem>
                    <MenuItem value={30 + " minutes"}>Thirty Minutes</MenuItem>
                    <MenuItem value={45 + " minutes"}>
                      Forty-five Minutes
                    </MenuItem>
                    <MenuItem value={1 + " hour"}>1 Hour</MenuItem>
                    <MenuItem value={75 + " minutes"}>
                      Seventy-five Minutes
                    </MenuItem>
                    <MenuItem value={90 + " minutes"}>Ninety Minutes</MenuItem>
                    <MenuItem value={2 + " hours"}>2 Hours</MenuItem>
                  </Select>
                </FormControl>
                <PhoneModalComponent></PhoneModalComponent>
              </CardContent>
            </Card>
          ))}
        </ul>
      );
    }
  };

  handleSelectedItem(storeId, waitTimeEntered, timeStamp, storeName) {
    this.stitchClient
      .callFunction("addOrUpdateStore", [
        storeId,
        waitTimeEntered,
        timeStamp,
        storeName,
      ])
      .catch((error) => console.error("Error", error));
  }

  render() {
    let cards = this.displayList(this.props.listOfStores);
    return <div>{cards}</div>;
  }
}

var rootStyle = {
  marginBottom: 10,
  borderColor: "black",
  marginRight: 30,
  borderRadius: 10,
  backgroundColor: "#fff3e6",
};

var titleStyle = {
  fontSize: 14,
};

var formControl = {
  minWidth: 120,
};

export default listOfGroceryStores;
