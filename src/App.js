import React, { useState, useEffect } from "react";
import { Stitch, UserApiKeyCredential } from "mongodb-stitch-browser-sdk";
import "./App.css";
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
        console.log(`successfully logged in with id: ${authedId}`);
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
    return <div>loading</div>;
  }
}

export default App;
