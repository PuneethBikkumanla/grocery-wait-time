import React from "react";
import { Stitch, UserApiKeyCredential } from "mongodb-stitch-browser-sdk";

export class StitchClient {
  static client = null;


  // function that initializes client with code (async)


  // function that simply exposes the private client variable here (non async)

  // call the async code 
  static getStitchClient() {
    if (!this.client) {
<<<<<<< Updated upstream
      this.client = Stitch.initializeDefaultAppClient(
        process.env.REACT_APP_MONGO_DB_APP_ID
      );
      this.client.auth.loginWithCredential(new AnonymousCredential());
=======
        const stitchAppClient = Stitch.initializeDefaultAppClient(process.env.REACT_APP_MONGO_DB_APP_ID)
        const credential = new UserApiKeyCredential(process.env.REACT_APP_MONGO_DB_API_KEY)
        stitchAppClient.auth.loginWithCredential(credential)
        .then(authedId => {
            console.log(`successfully logged in with id: ${authedId}`);
            this.client = stitchAppClient;
        })
        .catch(err => console.error(`login failed with error: ${err}`));
>>>>>>> Stashed changes
    }

    return this.client;
  }
}

export default StitchClient;
