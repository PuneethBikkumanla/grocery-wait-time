//react
import React, { Component } from "react";
import Timestamp from "react-timestamp";

//material
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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
                <WaitTimeSelectionComponent
                  storeId={store.id}
                  storeName={store.name}
                  stitchClient={this.props.stitchClient}
                ></WaitTimeSelectionComponent>
                <PhoneModalComponent storeId={store.id} stitchClient={this.props.stitchClient}></PhoneModalComponent>
              </CardContent>
            </Card>
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
  marginBottom: 10,
  borderColor: "black",
  marginRight: 30,
  borderRadius: 10,
  backgroundColor: "#fff3e6",
};

var titleStyle = {
  fontSize: 14,
};

export default listOfGroceryStores;
