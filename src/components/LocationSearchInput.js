/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
//google
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
//material
import { classnames } from "../helpers";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

//stitch
import { Stitch, AnonymousCredential } from "mongodb-stitch-browser-sdk";

//in-project
import ListOfGroceryStoresComponent from "./listOfGroceryStores";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stitchClient: null,
      address: "",
      listOfStores: "",
      placeName: "",
      checked: false,
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

  async getStitchRes(stores) {
    let arr = [];
    var i;
    for (i in stores) {
      arr.push(
        await this.state.stitchClient.callFunction("getStore", [stores[i].id])
      );
    }

    return arr;
  }

  renameAddressKey(store) {
    if (!store["vicinity"]) {
      store["vicinity"] = store["formatted_address"];
      delete store["formatted_address"];
    }

    return store;
  }

  combine(googleQuery, ind) {
    return { ...googleQuery, ...this.stitchQueries[ind] };
  }

  async standardizeAndCombine(queryResults) {
    let googleQueries = queryResults.map(this.renameAddressKey);
    let stitchQueries = await this.getStitchRes(queryResults);
    let res = googleQueries.map(this.combine, { stitchQueries });
    return res;
  }

  handleCloseClick = () => {
    this.setState({
      address: "",
      listOfStores: "",
      placeName: "",
    });
  };

  renderFuncWithAddress = ({
    getInputProps,
    suggestions,
    getSuggestionItemProps,
  }) => (
    <div className="_search-bar-container">
      <div className="_search-input-container">
        <input
          {...getInputProps({
            placeholder: "Enter address or zipcode...",
            className: "_search-input",
          })}
        />
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

  renderFuncWithStoreName = ({
    getInputProps,
    suggestions,
    getSuggestionItemProps,
  }) => (
    <div className="_search-bar-container">
      <div className="_search-input-container">
        <input
          {...getInputProps({
            placeholder: "Enter store name...",
            className: "_search-input",
          })}
        />
        {this.state.placeName.length > 0 && (
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

  componentDidMount() {
    let client = Stitch.initializeDefaultAppClient("grocery-wait-time-zhxvi");
    client.auth.loginWithCredential(new AnonymousCredential());
    this.setState({ stitchClient: client });
  }

  render() {
    let searchBar = null;
    if (this.state.checked) {
      searchBar = (
        <PlacesAutocomplete
          value={this.state.placeName}
          onChange={this.handleChangeFindPlace}
          onSelect={this.handleSelectByFindPlaceByQuery}
        >
          {this.renderFuncWithStoreName}
        </PlacesAutocomplete>
      );
    } else {
      searchBar = (
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChangeNearbySearch}
          onSelect={this.handleSelectByNearbySearch}
        >
          {this.renderFuncWithAddress}
        </PlacesAutocomplete>
      );
    }
    return (
      <div>
        {searchBar}
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                className="_toggleButton"
                checked={this.state.checked}
                onChange={this.handleToggleChange}
                name="checked"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            }
            label="Search with store name?"
            labelPlacement="bottom"
          />
        </FormGroup>
        {/* <div>
          This applicaiton lets one check and report the wait times of grocery
          stores nearby.
        </div> */}
        <ListOfGroceryStoresComponent {...this.state} />
      </div>
    );
  }
}

export default LocationSearchInput;
