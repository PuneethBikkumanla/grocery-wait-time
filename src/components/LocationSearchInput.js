import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import ListOfGroceryStoresComponent from "./listOfGroceryStores";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "", listOfStores: "" };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
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

  renderFunc = ({
    getInputProps,
    suggestions,
    getSuggestionItemProps,
    loading,
  }) => (
    <div>
      <input
        {...getInputProps({
          placeholder: "Search grocery stores...",
          className: "location-search-input",
        })}
      />
      <div className="autocomplete-dropdown-container">
        {loading && <div>Loading...</div>}
        {suggestions.map((suggestion) => {
          const className = suggestion.active
            ? "suggestion-item--active"
            : "suggestion-item";
          // inline style for demonstration purpose
          const style = suggestion.active
            ? { backgroundColor: "#fafafa", cursor: "pointer" }
            : { backgroundColor: "#ffffff", cursor: "pointer" };
          return (
            <div
              {...getSuggestionItemProps(suggestion, {
                className,
                style,
              })}
            >
              <span>{suggestion.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  render() {
    return (
      <div>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {this.renderFunc}
        </PlacesAutocomplete>
        <ListOfGroceryStoresComponent {...this.state} />
      </div>
    );
  }
}

export default LocationSearchInput;
