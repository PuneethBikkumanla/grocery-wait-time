import React from "react";
import "./App.css";
import LocationSearchInputComponent from "./components/LocationSearchInput";

function App() {
  return (
    <LocationSearchInputComponent>
      <listOfGroceryStoresComponent></listOfGroceryStoresComponent>
    </LocationSearchInputComponent>
  );
}

export default App;
