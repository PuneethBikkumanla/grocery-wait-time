import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Stitch, AnonymousCredential } from "mongodb-stitch-browser-sdk";

class listOfGroceryStores extends Component {
  constructor() {
    super();
    this.state = {
      stitchClient: null,
      userInput: null,
    };
  }

  displayList = (stores) => {
    if (stores) {
      return (
        <ul>
          {stores.map((store) => (
            <Card key={store.id} style={rootStyle} variant="outlined">
              <CardContent style={titleStyle}>
                <Typography variant="h5">{store.name}</Typography>
                <Typography variant="body2" component="p">
                  Address: {store.vicinity}
                </Typography>
                <br></br>
                <Typography variant="body2" component="p">
                  Current estimated wait time:
                </Typography>
                <br></br>
                <TextField
                  type="number"
                  fullWidth={true}
                  variant="outlined"
                  color="secondary"
                  label="Please report the estimated wait time"
                  onChange={this.handleTextFieldOnChange}
                ></TextField>
                <Button
                  variant="contained"
                  color="primary"
                  style={submitButtonStyle}
                  onClick={() =>
                    this.handleUserInput(store.id, this.state.userInput)
                  }
                >
                  Submit
                </Button>
              </CardContent>
            </Card>
          ))}
        </ul>
      );
    }
  };

  handleTextFieldOnChange = (e) => {
    this.setState({ userInput: e.target.value });
  };

  handleUserInput(storeId, waitTimeEntered) {
    this.stitchClient
      .callFunction("addOrUpdateStore", [storeId, waitTimeEntered])
      .catch((error) => console.error("Error", error));
  }

  componentDidMount() {
    this.stitchClient = Stitch.initializeDefaultAppClient(
      "grocery-wait-time-zhxvi"
    );
    this.stitchClient.auth.loginWithCredential(new AnonymousCredential());
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

var submitButtonStyle = {
  top: 5,
};

export default listOfGroceryStores;
