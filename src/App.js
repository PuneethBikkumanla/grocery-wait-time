import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LocationSearchInputComponent from "./components/LocationSearchInput";
import listOfGroceryStoresComponent from "./components/listOfGroceryStores";

function App() {
  return (
    <LocationSearchInputComponent>
      <listOfGroceryStoresComponent></listOfGroceryStoresComponent>
    </LocationSearchInputComponent>
  );
}

export default App;
