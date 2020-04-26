import React, { useState, useEffect } from "react";
import { Stitch, UserApiKeyCredential } from "mongodb-stitch-browser-sdk";
import "./App.css";
import Loader from "react-loader-spinner";

import LocationSearchInputComponent from "./components/LocationSearchInput";

function App() {
  const [client, setClient] = useState(null);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const stitchAppClient = Stitch.initializeDefaultAppClient(
      process.env.REACT_APP_MONGO_DB_APP_ID
    );
    const credential = new UserApiKeyCredential(
      process.env.REACT_APP_MONGO_DB_API_KEY
    );
    stitchAppClient.auth
      .loginWithCredential(credential)
      .then((authedId) => {
        setClient(stitchAppClient);
      })
      .catch((err) => console.error(`login failed with error: ${err}`));
  }, []);

  if (client) {
    return (
      <LocationSearchInputComponent stitchClient={client}>
        <listOfGroceryStoresComponent
          stitchClient={client}
        ></listOfGroceryStoresComponent>
      </LocationSearchInputComponent>
    );
  } else {
    return (
      <Loader
        className="_webpageLoading"
        type="ThreeDots"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    );
  }
}

export default App;
