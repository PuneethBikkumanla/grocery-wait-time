//react
import React, { Component } from "react";
import Timestamp from "react-timestamp";

//material
import { Typography, Divider, Paper, Box } from "@material-ui/core";

//inproject
import PhoneModalComponent from "./phoneModal";
import WaitTimeSelectionComponent from "./waitTimeSelection";

class listOfGroceryStores extends Component {
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
            <Paper key={store.id} elevation={24} style={rootStyle}>
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
              <Divider />
              <Typography variant="body2">
                <Box fontWeight="fontWeightRegular" m={1}>
                  Most recent estimated wait-times:
                </Box>
              </Typography>
              {this.displayTimes(store.times)}
              <WaitTimeSelectionComponent
                storeId={store.id}
                storeName={store.name}
                stitchClient={this.props.stitchClient}
              ></WaitTimeSelectionComponent>
              <PhoneModalComponent
                storeId={store.id}
                stitchClient={this.props.stitchClient}
                listOfStores={this.props.listOfStores}
              ></PhoneModalComponent>
            </Paper>
          ))}
        </ul>
      );
    }
  };

  render() {
    let cards = this.displayList(this.props.listOfStores);
    return <div>{cards}</div>;
  }
}

var rootStyle = {
  marginBottom: 20,
  borderColor: "black",
  marginRight: 40,
  backgroundColor: "white",
  paddingRight: 20,
  paddingBottom: 30,
  paddingTop: 20,
  paddingLeft: 10,
};

export default listOfGroceryStores;
