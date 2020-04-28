import React from "react";
//google
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
//material
import { classnames } from "../helpers";
import {
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
  Box,
} from "@material-ui/core";

//in-project
import ListOfGroceryStoresComponent from "./listOfGroceryStores";
import SuggestionsComponent from "./suggestions";
import HowItWorksComponent from "./howItWorks";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      listOfStores: "",
      placeName: "",
      checked: false,
      placeHolderAddress: "Enter your address...",
      placeHolderStore: "Enter store name...",
    };
  }

  handleToggleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
      address: "",
      listOfStores: "",
      placeName: "",
    });
  };
  handleChangeNearbySearch = (address) => {
    this.setState({ address });
  };

  handleChangeFindPlace = (placeName) => {
    this.setState({ placeName });
  };

  handleCloseClick = () => {
    this.setState({
      address: "",
      listOfStores: "",
      placeName: "",
    });
  };

  handleSelectByNearbySearch = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        var request = {
          location: latLng,
          radius: "10000",
          type: ["grocery_or_supermarket"],
        };

        // eslint-disable-next-line no-undef
        var service = new google.maps.places.PlacesService(
          document.createElement("div")
        );
        service.nearbySearch(request, (results, status, next_page_token) => {
          this.standardizeAndCombine(results).then((res) => {
            this.setState({ listOfStores: res });
          });
        });
      })
      .catch((error) => console.error("Error", error));
  };

  handleSelectByFindPlaceByQuery = (placeName) => {
    // eslint-disable-next-line no-undef
    let request = null;
    if (placeName) {
      request = {
        query: placeName,
        fields: ["formatted_address", "place_id", "name"],
      };
    }
    // eslint-disable-next-line no-undef
    var service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.textSearch(request, (results, status, next_page_token) => {
      this.standardizeAndCombine(results).then((res) => {
        this.setState({ listOfStores: res });
      });
    });
  };

  getStitchRes(stores) {
    var arr = stores.map((store) => {
      return store.id;
    });
    return this.props.stitchClient.callFunction("getStore", [arr]);
  }

  renameAddressKey(store) {
    if (!store["vicinity"]) {
      store["vicinity"] = store["formatted_address"];
      delete store["formatted_address"];
    }

    return store;
  }

  combine(stitchDocs, googleQueries) {
    let stitchMap = stitchDocs.reduce(function (result, doc) {
      if (!result[doc.store_id]) {
        result[doc.store_id] = doc;
      }
      return result;
    }, {});

    let combinedList = [],
      i;
    for (i in googleQueries) {
      let key = googleQueries[i].id;
      let toAdd = stitchMap[key]
        ? { ...stitchMap[key], ...googleQueries[i] }
        : googleQueries[i];
      combinedList.push(toAdd);
    }
    return combinedList;
  }

  async standardizeAndCombine(queryResults) {
    let googleQueries = queryResults.map(this.renameAddressKey);
    let stitchDocs = await this.getStitchRes(queryResults);
    let res = this.combine(stitchDocs, googleQueries);
    return res;
  }

  renderFunc = ({ getInputProps, suggestions, getSuggestionItemProps }) => (
    <div className="_search-bar-container">
      <div className="_search-input-container">
        {this.state.checked && (
          <input
            {...getInputProps({
              placeholder: this.state.placeHolderStore,
              className: "_search-input",
            })}
          />
        )}
        {!this.state.checked && (
          <input
            {...getInputProps({
              placeholder: this.state.placeHolderAddress,
              className: "_search-input",
            })}
          />
        )}
        {this.state.address.length > 0 && (
          <button className="_clear-button" onClick={this.handleCloseClick}>
            X
          </button>
        )}
      </div>
      {suggestions.length > 0 && (
        <div className="_autocomplete-container">
          {suggestions.map((suggestion) => {
            const className = classnames("_suggestion-item", {
              "_suggestion-item--active": suggestion.active,
            });
            return (
              <div
                {...getSuggestionItemProps(suggestion, {
                  className,
                })}
              >
                <strong>{suggestion.formattedSuggestion.mainText}</strong>{" "}
                <small>{suggestion.formattedSuggestion.secondaryText}</small>
              </div>
            );
          })}
          <div className="_dropdown-footer">
            <div>
              <img
                src={require("../images/powered_by_google_default.png")}
                className="_dropdown-footer-image"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  render() {
    let searchBar = null;
    if (this.state.checked) {
      searchBar = (
        <PlacesAutocomplete
          value={this.state.placeName}
          onChange={this.handleChangeFindPlace}
          onSelect={this.handleSelectByFindPlaceByQuery}
        >
          {this.renderFunc}
        </PlacesAutocomplete>
      );
    } else {
      searchBar = (
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChangeNearbySearch}
          onSelect={this.handleSelectByNearbySearch}
        >
          {this.renderFunc}
        </PlacesAutocomplete>
      );
    }
    return (
      <div>
        {!this.state.listOfStores && (
          <Typography variant="body2">
            <Box fontWeight="fontWeightBold" m={1} style={appDescriptionText}>
              Grocery Wait Times
            </Box>
            <Box m={1} style={description}>
              Check and report wait times during COVID-19.
            </Box>
            <HowItWorksComponent></HowItWorksComponent>
          </Typography>
        )}
        {searchBar}
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                className="_toggleButton"
                checked={this.state.checked}
                onChange={this.handleToggleChange}
                name="checked"
                inputProps={{ "aria-label": "primary checkbox" }}
                elevation={10}
              />
            }
            label="Search with store name"
            labelPlacement="bottom"
          />
        </FormGroup>
        {/* <div>
          This applicaiton lets one check and report the wait times of grocery
          stores nearby.
        </div> */}
        <ListOfGroceryStoresComponent
          {...this.state}
          stitchClient={this.props.stitchClient}
        ></ListOfGroceryStoresComponent>
        <SuggestionsComponent
          stitchClient={this.props.stitchClient}
        ></SuggestionsComponent>
      </div>
    );
  }
}

var appDescriptionText = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 50,
  textAlign: "center",
  color: "white",
  fontSize: 28,
};

var description = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "white",
};

export default LocationSearchInput;