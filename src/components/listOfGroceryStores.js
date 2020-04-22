import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

class listOfGroceryStores extends Component {
  displayList = (stores) => {
    if (stores) {
      return (
        <ul>
          {stores.map((store) => (
            <Card key={store.id} style={rootStyle} variant="outlined">
              <CardContent style={titleStyle}>
                <Typography variant="h5" component="h2">
                  {store.name}
                </Typography>
                <Typography variant="body2" component="p">
                  Address: {store.vicinity}
                </Typography>
                <br></br>
                <Typography variant="body2" component="p">
                  Current estimated wait time:
                </Typography>
                <br></br>
                <TextField
                  fullWidth={true}
                  variant="outlined"
                  color="secondary"
                  label="Please report the estimated wait time"
                ></TextField>
              </CardContent>
            </Card>
          ))}
        </ul>
      );
    } else {
      console.log("fatal error");
    }
  };

  render() {
    let cards = this.displayList(this.props.listOfStores);
    console.log(this.props.listOfStores);
    return <div>{cards}</div>;
  }
}

var rootStyle = {
  minWidth: 150,
  marginBottom: 10,
  borderColor: "black",
  marginRight: 30,
};

var titleStyle = {
  fontSize: 14,
};

export default listOfGroceryStores;
