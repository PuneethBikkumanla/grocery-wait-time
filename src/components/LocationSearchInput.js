/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import { classnames } from "../helpers";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import ListOfGroceryStoresComponent from "./listOfGroceryStores";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "", listOfStores: "", placeName: "" };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleChangeFindPlace = (placeName) => {
    this.setState({ placeName });
  };

  handleSelectByNearbySearch = (address) => {
    console.log(address);
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
          this.setState({ listOfStores: results });
        });
      })
      .catch((error) => console.error("Error", error));
  };

  handleSelectByFindPlaceByQuery = (placeName) => {
    // eslint-disable-next-line no-undef
    let request = null;
    console.log(placeName);
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
    service.textSearch(request, (results, status) => {
      this.setState({ listOfStores: results });
    });
  };

  handleCloseClick = () => {
    this.setState({
      address: "",
      listOfStores: "",
      placeName: "",
    });
  };

  renderFunc = ({ getInputProps, suggestions, getSuggestionItemProps }) => (
    <div className="_search-bar-container">
      <div className="_search-input-container">
        <input
          {...getInputProps({
            placeholder: "Enter address or zipcode...",
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

  render() {
    return (
      <div>
        {/* <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelectByNearbySearch}
        >
          {this.renderFunc}
        </PlacesAutocomplete> */}
        <PlacesAutocomplete
          value={this.state.placeName}
          onChange={this.handleChangeFindPlace}
          onSelect={this.handleSelectByFindPlaceByQuery}
        >
          {this.renderFunc}
        </PlacesAutocomplete>
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
