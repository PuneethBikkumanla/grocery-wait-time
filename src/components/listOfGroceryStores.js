import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";

class listOfGroceryStores extends Component {
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
                  Most recent estimated wait-times:
                </Typography>
                {store.times && (
                  <ListItemText variant="body2" component="p">
                    {store.times[0]}
                  </ListItemText>
                )}
                {stores.times && (
                  <ListItemText variant="body2" component="p">
                    {store.times[1]}
                  </ListItemText>
                )}
                {stores.times && (
                  <ListItemText variant="body2" component="p">
                    {store.times[2]}
                  </ListItemText>
                )}

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
                    value={this.waitTime}
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.handleSelectedItem(store.id, e.target.value);
                    }}
                    label="Please report the current estimated wait time"
                  >
                    <MenuItem value={0}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={15 + " minutes"}>Fifteen Minutes</MenuItem>
                    <MenuItem value={30 + " minutes"}>Thirty Minutes</MenuItem>
                    <MenuItem value={45 + " minutes"}>
                      Forty-five Minutes
                    </MenuItem>
                    <MenuItem value={1 + " hour"}>1 hour</MenuItem>
                    <MenuItem value={1.5 + " hours"}>1.5 hour</MenuItem>
                    <MenuItem value={2 + " hours"}>2 hours</MenuItem>
                    <MenuItem value={3 + " hours"}>3 hours</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          ))}
        </ul>
      );
    }
  };

  handleSelectedItem(storeId, waitTimeEntered) {
    this.props.stitchClient
      .callFunction("addOrUpdateStore", [storeId, waitTimeEntered])
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
