import React from "react";
import { Stitch, AnonymousCredential } from "mongodb-stitch-browser-sdk";

export class StitchClient extends React.Component {
  static client = null;

  static getStitchClient() {
    if (!this.client) {
      this.client = Stitch.initializeDefaultAppClient(
        process.env.REACT_APP_MONGO_DB_APP_ID
      );
      this.client.auth.loginWithCredential(new AnonymousCredential());
    }

    return this.client;
  }

  render() {
    return;
  }
}

export default StitchClient;
